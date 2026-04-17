import crypto from "node:crypto";
import path from "node:path";

/** One image reference extracted from markdown (before download; no extension yet). */
export type ImageManifestItem = {
	originalUrl: string;
	alt: string;
	/** Basename without extension, e.g. "my-post-a1b2c3" */
	localBasename: string;
};

const MARKDOWN_IMAGE_RE =
	/!\[([^\]]*)\]\((https:\/\/[^\s)]+)(?:\s+"[^"]*")?\)/g;
const HTML_IMG_SRC_RE = /<img[^>]+src="(https:\/\/[^"]+)"/g;

/** Normalize URL for hashing: strip query string so same image with different signed params gets same hash. */
export function urlWithoutQuery(u: string): string {
	try {
		const idx = u.indexOf("?");
		return idx === -1 ? u : u.slice(0, idx);
	} catch {
		return u;
	}
}

/** Whether the URL should be included (remote https only; skip data: and already-local). */
export function isDownloadableImageUrl(url: string): boolean {
	const t = url.trim();
	if (!t.startsWith("https://")) return false;
	if (t.startsWith("data:")) return false;
	if (t.startsWith("/") || t.startsWith("./")) return false;
	// Already localized
	if (t.includes("/images/posts/")) return false;
	return true;
}

/**
 * Produce a stable basename (no extension) for an image: postSlug + short hash of (urlWithoutQuery + alt + ordinal).
 */
export function stableImageBasename(
	postSlug: string,
	originalUrl: string,
	alt: string,
	ordinal: number,
): string {
	const normalized = urlWithoutQuery(originalUrl);
	const payload = `${normalized}|${alt}|${ordinal}`;
	const hash = crypto
		.createHash("sha256")
		.update(payload)
		.digest("hex")
		.slice(0, 12);
	const safeSlug =
		postSlug
			.replace(/[^a-z0-9-]/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "") || "post";
	return `${safeSlug}-${hash}`;
}

/**
 * Extract all markdown and raw HTML image URLs from content that are downloadable (https, not data or local).
 * Returns manifest with originalUrl, alt, and localBasename (no extension).
 */
export function extractImageManifest(
	markdown: string,
	postSlug: string,
): ImageManifestItem[] {
	const manifest: ImageManifestItem[] = [];
	let ordinal = 0;

	// Markdown images: ![alt](url "title")
	for (const m of markdown.matchAll(MARKDOWN_IMAGE_RE)) {
		const [, alt = "", url = ""] = m;
		if (!isDownloadableImageUrl(url)) continue;
		manifest.push({
			originalUrl: url,
			alt,
			localBasename: stableImageBasename(postSlug, url, alt, ordinal++),
		});
	}

	// Raw HTML <img src="url">
	for (const m of markdown.matchAll(HTML_IMG_SRC_RE)) {
		const url = m[1];
		if (!url || !isDownloadableImageUrl(url)) continue;
		manifest.push({
			originalUrl: url,
			alt: "",
			localBasename: stableImageBasename(postSlug, url, "", ordinal++),
		});
	}

	return manifest;
}

/**
 * Rewrite markdown: replace each originalUrl with the corresponding local path (e.g. /images/posts/foo.png).
 * urlToLocal maps originalUrl -> local path (with leading slash).
 */
export function rewriteMarkdownWithLocalImages(
	markdown: string,
	urlToLocal: Map<string, string>,
): string {
	let out = markdown;

	// Replace markdown images
	out = out.replace(MARKDOWN_IMAGE_RE, (_, alt: string, url: string) => {
		const local = urlToLocal.get(url);
		if (!local) return `![${alt}](${url})`;
		return `![${alt}](${local})`;
	});

	// Replace raw HTML img src
	out = out.replace(HTML_IMG_SRC_RE, (match: string, url: string) => {
		const local = urlToLocal.get(url);
		if (!local) return match;
		return match.replace(url, local);
	});

	return out;
}

/**
 * Infer file extension from Content-Type or URL path.
 */
export function extensionFromContentTypeOrUrl(
	contentType: string | null,
	url: string,
): string {
	const fromType = contentType?.split(";")[0]?.trim().toLowerCase();
	const map: Record<string, string> = {
		"image/png": ".png",
		"image/jpeg": ".jpg",
		"image/jpg": ".jpg",
		"image/webp": ".webp",
		"image/gif": ".gif",
		"image/svg+xml": ".svg",
	};
	if (fromType && map[fromType]) return map[fromType];
	// From URL path
	const pathname = urlWithoutQuery(url);
	const ext = path
		.extname(new URL(pathname, "https://x").pathname)
		.toLowerCase();
	if ([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext))
		return ext;
	return ".bin";
}

const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const FETCH_TIMEOUT_MS = 30_000;

export type DownloadImageOptions = {
	fetchFn?: typeof fetch;
	timeoutMs?: number;
	maxBytes?: number;
};

/**
 * Download image from url and write to directory. Returns the filename written (basename + extension).
 * Uses atomic write (temp file then rename). Throws on 4xx/5xx or timeout or size exceeded.
 */
export async function downloadImage(
	url: string,
	outputDir: string,
	basenameWithoutExt: string,
	options: DownloadImageOptions = {},
): Promise<string> {
	const fetchFn = options.fetchFn ?? fetch;
	const timeoutMs = options.timeoutMs ?? FETCH_TIMEOUT_MS;
	const maxBytes = options.maxBytes ?? MAX_IMAGE_SIZE_BYTES;

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	let res: Response;
	try {
		res = await fetchFn(url, { signal: controller.signal });
	} finally {
		clearTimeout(timeout);
	}

	if (!res.ok) {
		throw new Error(
			`Image download failed: ${res.status} ${res.statusText} for ${url}`,
		);
	}

	const contentType = res.headers.get("content-type");
	const ext = extensionFromContentTypeOrUrl(contentType, url);
	const filename = `${basenameWithoutExt}${ext}`;
	const filepath = path.join(outputDir, filename);

	const fs = await import("node:fs");
	fs.mkdirSync(outputDir, { recursive: true });

	const buf = await res.arrayBuffer();
	if (buf.byteLength > maxBytes) {
		throw new Error(
			`Image too large: ${buf.byteLength} bytes (max ${maxBytes}) for ${url}`,
		);
	}

	const tmpPath = path.join(
		outputDir,
		`.notion-img-${basenameWithoutExt}-${process.pid}-${Date.now()}${ext}`,
	);
	fs.writeFileSync(tmpPath, Buffer.from(buf));
	fs.renameSync(tmpPath, filepath);
	return filename;
}

/**
 * Localize post content: extract images, download to publicDir/images/posts, rewrite markdown to local paths.
 * Returns rewritten content (no signed URLs). Call stripSignedUrlParams on result as safety net if desired.
 */
export async function localizePostContent(
	content: string,
	postSlug: string,
	publicDir: string,
	options: { fetchFn?: typeof fetch } = {},
): Promise<string> {
	const imagesDir = path.join(publicDir, "images", "posts");
	const manifest = extractImageManifest(content, postSlug);
	const urlToLocal = new Map<string, string>();

	const fs = await import("node:fs");
	for (const item of manifest) {
		// Skip re-download if a file with this basename already exists
		let filename: string;
		if (fs.existsSync(imagesDir)) {
			const existing = fs
				.readdirSync(imagesDir)
				.find((n) => n.startsWith(`${item.localBasename}.`));
			if (existing) {
				filename = existing;
			} else {
				filename = await downloadImage(
					item.originalUrl,
					imagesDir,
					item.localBasename,
					{ fetchFn: options.fetchFn },
				);
			}
		} else {
			filename = await downloadImage(
				item.originalUrl,
				imagesDir,
				item.localBasename,
				{ fetchFn: options.fetchFn },
			);
		}
		urlToLocal.set(item.originalUrl, `/images/posts/${filename}`);
	}

	return rewriteMarkdownWithLocalImages(content, urlToLocal);
}
