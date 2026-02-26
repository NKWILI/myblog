import { BackToHome } from "@/components/back-to-home";
import FurtherReading from "@/components/further-reading";
import { LikeButton } from "@/components/like-button";
import { components } from "@/components/mdx-component";
import { ShareButton } from "@/components/share-button";
import { Badge } from "@/components/ui/badge";
import { getPostsFromCache, getWordCount } from "@/lib/notion";
import { calculateReadingTime } from "@/lib/utils";
import { format } from "date-fns";
import type { Metadata } from "next";
import type { ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata(
	{ params }: PostPageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { slug } = await params;
	const posts = getPostsFromCache();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

	return {
		title: post.title,
		description: post.description,
		alternates: {
			canonical: `${siteUrl}/posts/${post.slug}`,
		},
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			url: `${siteUrl}/posts/${post.slug}`,
			publishedTime: new Date(post.date).toISOString(),
			authors: post.author ? [post.author] : [],
			tags: post.tags,
			images: [
				{
					url: post.coverImage || `${siteUrl}/opengraph-image.png`,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [
				{
					url: post.coverImage || `${siteUrl}/opengraph-image.png`,
					alt: post.title,
				},
			],
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;
	const posts = getPostsFromCache();
	const post = posts.find((p) => p.slug === slug);
	const wordCount = post?.content ? getWordCount(post.content) : 0;

	if (!post) {
		notFound();
	}

	const furtherPosts = posts
		.filter((p) => p.slug !== slug)
		.map((p) => ({ slug: p.slug, title: p.title, date: p.date }));

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		image: post.coverImage || `${siteUrl}/opengraph-image.png`,
		datePublished: new Date(post.date).toISOString(),
		author: {
			"@type": "Person",
			name: post.author || "Guest Author",
		},
		publisher: {
			"@type": "Organization",
			name: "Your Site Name",
			logo: {
				"@type": "ImageObject",
				url: `${siteUrl}/logo.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${siteUrl}/posts/${post.slug}`,
		},
	};

	return (
		<>
			{/* JSON-LD: safe — we control jsonLd, no user input */}
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own data, not user input
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,20rem)] gap-8 lg:gap-12">
				<article className="min-w-0 max-w-3xl prose dark:prose-invert">
					<div className="mb-6">
						<BackToHome />
					</div>
					{post.coverImage && (
						<div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
							<Image
								src={post.coverImage}
								alt={post.title}
								fill
								className="object-cover"
								priority
							/>
						</div>
					)}

					<header className="mb-8">
						<div className="flex items-center gap-4 text-muted-foreground mb-4 flex-wrap">
							<time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
							{post.author && <span>By {post.author}</span>}
							<span>{calculateReadingTime(wordCount)}</span>
							<span>{wordCount} words</span>
							<span className="flex items-center gap-0 ml-auto">
								<ShareButton
									url={`${siteUrl}/posts/${slug}`}
									title={post.title}
									description={post.description}
								/>
								<LikeButton slug={slug} />
							</span>
						</div>

						<h1 className="text-4xl font-bold mb-4 text-foreground">
							{post.title}
						</h1>

						<div className="flex gap-4 mb-4">
							{post.category && (
								<Badge variant="secondary">{post.category}</Badge>
							)}
							{post.tags?.map((tag) => (
								<Badge key={tag} variant="outline">
									{tag}
								</Badge>
							))}
						</div>
					</header>

					<div className="max-w-none">
						<ReactMarkdown
							components={components}
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw]}
						>
							{post.content}
						</ReactMarkdown>
					</div>
				</article>
				<FurtherReading posts={furtherPosts} currentSlug={slug} />
			</div>
		</>
	);
}
