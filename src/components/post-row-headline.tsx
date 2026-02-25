import { Badge } from "@/components/ui/badge";
import { type Post, getWordCount } from "@/lib/notion";
import { calculateReadingTime } from "@/lib/utils";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";

interface PostRowHeadlineProps {
	post: Post;
	isLast?: boolean;
}

export default function PostRowHeadline({
	post,
	isLast = false,
}: PostRowHeadlineProps) {
	const wordCount = post.content ? getWordCount(post.content) : 0;
	const readingTime = calculateReadingTime(wordCount);

	return (
		<article
			className={`py-8 transition-colors duration-200 ${!isLast ? "border-b border-border" : ""}`}
		>
			<Link
				href={`/posts/${post.slug}`}
				className="block group rounded-md -m-2 p-2 transition-colors duration-200 hover:bg-muted/30"
				aria-label={post.title}
			>
				<h2 className="font-editorial font-bold text-foreground group-hover:text-link transition-colors duration-200 text-2xl sm:text-2xl md:text-5xl leading-tight">
					{post.title}
				</h2>

				<div
					className="flex flex-wrap items-center 
				gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2"
				>
					<span className="flex items-center gap-1.5">
						<CalendarIcon
							className="shrink-0"
							style={{ width: 14, height: 14 }}
						/>
						{format(new Date(post.date), "MMM d, yyyy")}
					</span>
					<span className="flex items-center gap-1.5">
						<ClockIcon className="shrink-0" style={{ width: 14, height: 14 }} />
						{readingTime}
					</span>
					{post.category && (
						<Badge
							variant="secondary"
							className="text-xs font-medium text-muted-foreground"
						>
							{post.category}
						</Badge>
					)}
				</div>

				<div className="border-b border-dashed border-border mt-2 mb-4" />

				<p className="text-lg text-foreground/90 leading-relaxed">
					{post.description}
				</p>
			</Link>
		</article>
	);
}
