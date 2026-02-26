import { getPostsFromCache } from "@/lib/notion";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";

function formatPostDate(dateStr: string): string {
	if (!dateStr) return "";
	const d = new Date(dateStr);
	if (Number.isNaN(d.getTime())) return dateStr;
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export default function Home() {
	const allPosts = getPostsFromCache();
	const recentPosts = allPosts.slice(0, siteConfig.recentPostsCount);

	return (
		<div className="min-w-0 overflow-x-hidden">
			{/* Section 1 — Split hero; from md: full-width grid, portrait full-bleed right */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:grid md:grid-cols-[minmax(0,28rem)_1fr] md:gap-0 md:px-0 md:max-w-none">
				{/* Left column: mobile block + desktop title+posts; padded at md */}
				<div className="md:pl-6 lg:pl-8 md:pr-8 md:py-12">
					{/* Mobile only: intro (recent posts block is after portrait) */}
					<div className="block md:hidden pb-8">
						<div className="min-w-0">
							{(() => {
								const intro = siteConfig.heroIntroText;
								const match = intro.match(/^([^.!?]+[.!?])\s*([\s\S]*)/);
								const firstSentence = match?.[1]?.trim();
								const rest = match?.[2]?.trim() ?? "";
								return (
									<>
										{firstSentence && (
											<h1 className="text-xl font-semibold text-foreground tracking-tight mb-2">
												{firstSentence}
											</h1>
										)}
										{(rest || !firstSentence) && (
											<p className="text-base text-foreground/90 leading-relaxed break-words">
												{rest || intro}{" "}
												<Link
													href="#recent-posts"
													className="text-foreground/90 underline hover:text-link transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
												>
													View my recent posts
												</Link>
											</p>
										)}
									</>
								);
							})()}
						</div>
					</div>
					{/* Desktop: same salutation as mobile + My recent posts + list */}
					<div className="hidden md:block space-y-8">
						<div className="min-w-0">
							{(() => {
								const intro = siteConfig.heroIntroText;
								const match = intro.match(/^([^.!?]+[.!?])\s*([\s\S]*)/);
								const firstSentence = match?.[1]?.trim();
								const rest = match?.[2]?.trim() ?? "";
								return (
									<>
										{firstSentence && (
											<h1 className="text-xl font-semibold text-foreground tracking-tight mb-2">
												{firstSentence}
											</h1>
										)}
										{(rest || !firstSentence) && (
											<p className="text-base text-foreground/90 leading-relaxed break-words">
												{rest || intro}{" "}
												<Link
													href="#recent-posts"
													className="text-foreground/90 underline hover:text-link transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
												>
													View my recent posts
												</Link>
											</p>
										)}
									</>
								);
							})()}
						</div>
						<div id="recent-posts" className="min-w-0">
							<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
								My recent posts
							</h2>
							{recentPosts.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									No recent posts.
								</p>
							) : (
								<ul className="space-y-4">
									{recentPosts.map((post) => (
										<li key={post.id}>
											<Link
												href={`/posts/${post.slug}`}
												className="block group transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
											>
												<span className="font-medium text-foreground group-hover:text-link transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
													{post.title}
												</span>
												{post.date && (
													<p className="text-sm text-muted-foreground mt-0.5">
														{formatPostDate(post.date)}
													</p>
												)}
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
				{/* Right column: portrait full-bleed to screen edge at md+ */}
				<div className="relative aspect-[3/4] min-h-[280px] max-h-[480px] md:min-h-[40vh] md:max-h-[60vh] lg:max-h-[50vh] w-full overflow-hidden rounded-lg md:rounded-l-lg bg-background">
					<Image
						src={siteConfig.portraitPath}
						alt={siteConfig.portraitAlt}
						fill
						className="object-cover md:object-contain"
						sizes="(max-width: 768px) 100vw, 60vw"
						priority
					/>
				</div>
				{/* Mobile only: recent posts after portrait */}
				<div id="recent-posts" className="block md:hidden min-w-0 pb-8">
					<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
						My recent posts
					</h2>
					{recentPosts.length === 0 ? (
						<p className="text-sm text-muted-foreground">No recent posts.</p>
					) : (
						<ul className="space-y-4">
							{recentPosts.map((post) => (
								<li key={post.id} className="min-w-0">
									<Link
										href={`/posts/${post.slug}`}
										className="block group py-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
									>
										<span className="font-medium text-foreground group-hover:text-link transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] break-words">
											{post.title}
										</span>
										{post.date && (
											<p className="text-sm text-muted-foreground mt-0.5">
												{formatPostDate(post.date)}
											</p>
										)}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			</section>
		</div>
	);
}
