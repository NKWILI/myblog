type ScreenshotPlaceholderProps = {
	variant: "problem" | "solution";
	hint?: string;
};

const DEFAULT_HINT = "Screenshot coming soon";

export function ScreenshotPlaceholder({
	variant,
	hint = DEFAULT_HINT,
}: ScreenshotPlaceholderProps) {
	const isProblem = variant === "problem";
	const bgToken = isProblem
		? "var(--pe-placeholder-bg-problem)"
		: "var(--pe-placeholder-bg-solution)";
	return (
		<div
			data-testid="pe-screenshot-placeholder"
			className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed min-h-[10rem]"
			style={{
				borderColor: "var(--pe-placeholder-border)",
				backgroundColor: bgToken,
			}}
		>
			<p className="text-center text-xs pe-muted px-4">{hint}</p>
		</div>
	);
}
