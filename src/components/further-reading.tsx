import { format } from "date-fns";
import Link from "next/link";

export interface FurtherReadingPost {
	slug: string;
	title: string;
	date: string;
}

interface FurtherReadingProps {
	posts: FurtherReadingPost[];
	currentSlug?: string;
}

export default function FurtherReading({
	posts,
	currentSlug,
}: FurtherReadingProps) {
	if (posts.length === 0) return null;

	return (
		<aside
			className="md:sticky md:top-24 self-start min-w-0 max-w-full"
			aria-label="Further Reading"
		>
			<h2 className="text-lg font-semibold text-foreground mb-4">
				Further Reading
			</h2>
			<nav>
				<ul className="space-y-3 max-h-[70vh] overflow-y-auto overflow-x-hidden min-w-0">
					{posts.map((p) => {
						const isCurrent = currentSlug === p.slug;
						return (
							<li key={p.slug} className="min-w-0 break-words">
								<Link
									href={`/posts/${p.slug}`}
									className={`block text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-1 -mx-1 ${
										isCurrent
											? "text-link underline underline-offset-2 font-medium"
											: "text-muted-foreground hover:text-link"
									}`}
									aria-current={isCurrent ? "page" : undefined}
								>
									<span className="text-muted-foreground font-medium tabular-nums">
										{format(new Date(p.date), "MMMM d, yyyy")}
									</span>
									<br />
									<span>{p.title}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}
