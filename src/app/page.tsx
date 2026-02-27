import { FadeInSection } from "@/components/fade-in-section";
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

function HeroContent() {
	return (
		<div className="min-w-0">
			{/* Name — dominant */}
			<h1 className="text-2xl font-bold text-foreground tracking-tight md:text-4xl">
				{siteConfig.heroHeadline}
			</h1>
			{/* Positioning — secondary */}
			<div className="mt-3 flex flex-col gap-1 text-base font-medium text-foreground/90 leading-tight md:text-lg">
				{siteConfig.heroSubheadlineLines.map((line) => (
					<span key={line}>{line}</span>
				))}
			</div>
			{/* Explanation — softer */}
			<p className="mt-4 text-sm text-muted-foreground leading-[1.7] break-words md:text-base">
				{siteConfig.heroSubtext}
			</p>
			{/* Action — clearly separated */}
			<div className="mt-8 flex flex-wrap gap-3">
				<Link
					href="#featured-essays"
					className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-foreground/90 active:scale-[0.98]"
				>
					Read the essays
				</Link>
				<Link
					href="/projects"
					className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
				>
					View projects
				</Link>
			</div>
		</div>
	);
}

function FeaturedEssaysList({
	posts,
	id,
	className = "",
}: {
	posts: { id: string; title: string; slug: string; date?: string }[];
	id: string;
	className?: string;
}) {
	return (
		<div id={id} className={`min-w-0 ${className}`}>
			<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
				Featured Essays
			</h2>
			{posts.length === 0 ? (
				<p className="text-sm text-muted-foreground">No essays yet.</p>
			) : (
				<ul className="space-y-4">
					{posts.map((post) => (
						<li key={post.id}>
							<Link
								href={`/posts/${post.slug}`}
								className="block group cursor-pointer rounded transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								<span className="font-medium text-foreground group-hover:text-link underline underline-offset-2 decoration-link/50 group-hover:decoration-link transition-colors duration-200 ease-out">
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
	);
}

export default function Home() {
	const allPosts = getPostsFromCache();
	const featuredPosts = allPosts.slice(0, siteConfig.recentPostsCount);

	return (
		<div className="min-w-0">
			{/* Hero: split layout, portrait right */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-0 md:px-0 md:max-w-none">
				<div className="md:pl-6 lg:pl-8 md:pr-8 md:py-12">
					<div className="block md:hidden pb-8">
						<HeroContent />
					</div>
					<div className="hidden md:block">
						<HeroContent />
					</div>
				</div>
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
			</section>

			<FadeInSection>
				{/* Mission paragraph — room to breathe */}
				<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-28">
					<p className="text-foreground/90 leading-[1.7]">
						{siteConfig.missionStatement}
					</p>
				</section>
			</FadeInSection>

			<FadeInSection>
				{/* Currently Building — ambition without bragging */}
				<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
					<p className="text-foreground/90 leading-[1.7]">
						{siteConfig.buildingStatement}
					</p>
					<Link
						href="/projects"
						className="mt-3 inline-block text-sm text-link/90 transition-colors duration-200 hover:text-link"
					>
						Explore projects →
					</Link>
				</section>
			</FadeInSection>

			<FadeInSection>
				{/* Featured Essays (single block for #featured-essays anchor) */}
				<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
					<FeaturedEssaysList posts={featuredPosts} id="featured-essays" />
				</section>
			</FadeInSection>
		</div>
	);
}
