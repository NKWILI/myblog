---
name: Fix cache secrets and Vercel build
overview: Stop exposing Notion signed S3 URLs (AWS temp credentials) in the repo and in the cache file, and make the Vercel build succeed by either requiring Notion env vars or allowing the cache step to fail gracefully.
todos: []
isProject: false
---

# Fix cache secrets and Vercel build

You have two issues:

1. **GitHub/Vercel secret alert:** "Amazon AWS Temporary Access Key ID" in [posts-cache.json](posts-cache.json) (commit ea8566e). The file contains Notion-generated signed S3 URLs in `description` and `content` fields.
2. **Vercel build failure:** `cache:posts` runs before `next build` and throws because `NOTION_DATABASE_ID` is not set in Vercel's environment.

---

## 1. Stop committing the cache and remove it from history (immediate)

- **Add to [.gitignore](.gitignore):** `posts-cache.json` so it is never committed again. Place it under the existing `# cache` section (e.g. `posts-cache.json`).
- **Remove from Git tracking:** Run `git rm --cached posts-cache.json` and commit. The file will remain on your machine but no longer be tracked; future cache runs will not be committed.
- **GitHub alert:** After the next push, the file will no longer be in the repo, so new commits won't contain the secret. For the **already exposed** secret, follow GitHub's "Review secret" flow: the detected value is a **temporary** AWS key embedded in a signed URL (typically expired after 1 hour). You can mark the alert as "Revoked" or "False positive" and optionally rotate your Notion integration token if you want to be cautious.

---

## 2. Sanitize cache output so no secrets are ever written

Notion's API returns image URLs that include signed query parameters (`X-Amz-Algorithm`, `X-Amz-Credential`, `X-Amz-Security-Token`, `X-Amz-Signature`). Those must never be written to disk.

- **Where:** In [scripts/cache-posts.ts](scripts/cache-posts.ts), **before** `fs.writeFileSync`, sanitize each post in `allPosts` so that any string field that can contain URLs (at least `content` and `description`) has signed S3 query strings removed.
- **How:** Add a small helper that replaces URLs whose query string contains `X-Amz-` with the same URL but **query string stripped** (so the stored value is e.g. `https://prod-files-secure.s3.us-west-2.amazonaws.com/.../file.webp` with no `?X-Amz-...`). That removes credentials from the cached file. Image links in the cached markdown will be **broken** at load time (S3 requires the signature to serve the file). So either:
  - **Option A (minimal):** Strip query string only. No secrets in cache. Inline images in posts will not load until you add a proper fix (e.g. Notion image proxy or re-fetch image URLs at runtime). Recommended for stopping the alert quickly.
  - **Option B (better UX, more work):** Replace the entire signed URL with a placeholder (e.g. `[NOTION_IMAGE]`) and later add a render-time step (e.g. API route or server component) that resolves images from Notion when displaying a post. No secrets; images can work via a proxy.

Plan assumes **Option A** unless you prefer Option B.

- **Implementation detail:** For each post, run a sanitizer on `post.content` and `post.description`. Use a regex or URL parser to find `https://...?X-Amz-...` and replace with the same URL up to (and excluding) `?`. Apply to all posts before `writeFileSync`.

---

## 3. Vercel build success

Two approaches (choose one):

- **Option 1 (recommended):** Set **NOTION_DATABASE_ID** and **NOTION_TOKEN** in the Vercel project (Settings → Environment Variables). Then `cache:posts` will run at build time, produce a sanitized cache, and `next build` will succeed. The cache is generated during build and is not committed (because of step 1).
- **Option 2:** If you want the build to succeed even when Notion is not configured (e.g. forks or first deploy), change the build script in [package.json](package.json) from:
  - `"build": "npm run cache:posts && next build"`
  - to:
  - `"build": "npm run cache:posts -- --allow-fail && next build"`
  Then when `NOTION_DATABASE_ID` is missing, `cache:posts` exits 0 and the app builds with no (or an existing) cache. For production you still want env vars set so the cache is populated.

---

## 4. Summary of file changes


| File                                             | Change                                                                                                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [.gitignore](.gitignore)                         | Add `posts-cache.json` under the cache section.                                                                                                        |
| [scripts/cache-posts.ts](scripts/cache-posts.ts) | Before writing, sanitize each post's `content` and `description`: remove query string from any URL containing `X-Amz-` (strip from `?` to end of URL). |
| [package.json](package.json)                     | Optional: use `cache:posts -- --allow-fail` in the `build` script so build succeeds when Notion env is missing.                                        |


**Manual step (you do once):** Run `git rm --cached posts-cache.json` and commit so the file is untracked. Set NOTION_DATABASE_ID and NOTION_TOKEN in Vercel if you want posts to be cached on deploy.

---

## 5. Aftermath: inline images in posts

With Option A sanitization, image markdown in cached content will look like `![alt](https://...s3.../file.webp)` with no query string; S3 will reject requests without the signature, so those images will not load. To fix that later you can: (1) add an API route that fetches the image from Notion (using the block ID or a fresh signed URL) and proxies it, or (2) use a Notion-specific image URL resolver at render time. That can be a follow-up task.