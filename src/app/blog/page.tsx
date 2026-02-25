import PostRowHeadline from "@/components/post-row-headline";
import { getPostsFromCache } from "@/lib/notion";
import { siteConfig } from "@/lib/site-config";

export default function BlogPage() {
	const posts = getPostsFromCache();

	return (
		<div>
			<div className="max-w-2xl mx-auto text-center mb-12">
				<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
					Blog
				</h1>
				<p className="text-lg text-muted-foreground">
					Notes and longer pieces from {siteConfig.siteName}
				</p>
			</div>

			<div className="max-w-5xl mx-auto">
				{posts.length === 0 ? (
					<p className="text-muted-foreground text-center py-12">
						No posts yet.
					</p>
				) : (
					posts.map((post, index) => (
						<PostRowHeadline
							key={post.id}
							post={post}
							isLast={index === posts.length - 1}
						/>
					))
				)}
			</div>
		</div>
	);
}
