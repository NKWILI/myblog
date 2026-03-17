import { cn } from "@/lib/utils";

type TechBadgeProps = {
	label: string;
	className?: string;
};

function TechIcon({ label }: { label: string }) {
	switch (label) {
		case "React":
		case "React Icons":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<circle cx="12" cy="12" r="2.2" fill="currentColor" />
					<ellipse
						cx="12"
						cy="12"
						rx="10"
						ry="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					/>
					<ellipse
						cx="12"
						cy="12"
						rx="10"
						ry="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						transform="rotate(60 12 12)"
					/>
					<ellipse
						cx="12"
						cy="12"
						rx="10"
						ry="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						transform="rotate(120 12 12)"
					/>
				</svg>
			);
		case "Next.js":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
					<path
						d="M9 8v8l6-8v8"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "Tailwind CSS":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<path
						d="M6.5 11.2C7.7 9 9.4 7.9 11.6 7.9c3.3 0 3.7 2.6 5.4 2.6 1 0 1.8-.5 2.5-1.6-.9 2.6-2.6 3.9-5.1 3.9-3.3 0-3.7-2.6-5.4-2.6-1 0-1.8.4-2.5 1.0z"
						fill="currentColor"
					/>
					<path
						d="M6.5 16.1c1.2-2.2 2.9-3.3 5.1-3.3 3.3 0 3.7 2.6 5.4 2.6 1 0 1.8-.5 2.5-1.6-.9 2.6-2.6 3.9-5.1 3.9-3.3 0-3.7-2.6-5.4-2.6-1 0-1.8.4-2.5 1.0z"
						fill="currentColor"
						opacity="0.85"
					/>
				</svg>
			);
		case "Google Sheets API":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<path
						d="M7 3h7l3 3v15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
					/>
					<path
						d="M14 3v3h3"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>
					<path
						d="M8 10h7M8 13h7M8 16h7"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "Resend":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<path
						d="M4.5 7.5h15v9h-15z"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>
					<path
						d="M4.5 8l7.5 6 7.5-6"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "GSAP":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<rect
						x="4"
						y="4"
						width="16"
						height="16"
						rx="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
					/>
					<path
						d="M9.2 14.8c.3 1 1.2 1.6 2.5 1.6 1.4 0 2.3-.6 2.3-1.6 0-.8-.5-1.2-1.7-1.5l-1-.2c-1.8-.4-2.6-1.2-2.6-2.5 0-1.6 1.4-2.7 3.3-2.7 1.7 0 3 .9 3.2 2.3"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "ScrollTrigger":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<path
						d="M12 4v16"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<path
						d="M8.5 8.5L12 5l3.5 3.5M8.5 15.5L12 19l3.5-3.5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<rect
						x="4"
						y="10"
						width="4"
						height="4"
						rx="1"
						fill="currentColor"
						opacity="0.9"
					/>
				</svg>
			);
		default:
			return null;
	}
}

export function TechBadge({ label, className }: TechBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full border border-[var(--pe-border)] bg-[var(--pe-bg)] px-2 py-0.5 text-[0.7rem] pe-muted",
				className,
			)}
		>
			<span className="text-current">{TechIcon({ label })}</span>
			<span>{label}</span>
		</span>
	);
}
