import { BackToHome } from "@/components/back-to-home";
import BlogSearchAndFeed from "@/components/blog-search-and-feed";
import { getPostsFromCache } from "@/lib/notion";
import { siteConfig } from "@/lib/site-config";

export default function BlogPage() {
	const posts = getPostsFromCache();

	return (
		<div>
			<div className="max-w-2xl mx-auto mb-12">
				<div className="mb-6">
					<BackToHome />
				</div>
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
						Blog
					</h1>
					<p className="text-lg text-muted-foreground">
						Notes and longer pieces from {siteConfig.siteName}
					</p>
				</div>
			</div>

			<BlogSearchAndFeed posts={posts} />
		</div>
	);
}
