import Link from "next/link";

export function BackToHome() {
	return (
		<Link
			href="/"
			className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-link transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
		>
			<span aria-hidden>←</span>
			<span>Back to home</span>
		</Link>
	);
}
