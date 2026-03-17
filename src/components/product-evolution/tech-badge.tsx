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
		case "App Router":
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
						d="M12 3a9 9 0 1 0 9 9"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<path
						d="M21 12h-6l2.2-2.2"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "TypeScript":
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
						rx="3"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
					/>
					<path
						d="M8 10h6M11 10v8"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<path
						d="M14.5 18c1.6 0 2.5-.8 2.5-2 0-1.1-.7-1.7-2-2.1l-1-.3"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
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
		case "Zod":
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
						d="M7 7h10l-10 10h10"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "Vitest":
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
						d="M7 7l5 12 5-12"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M6 7h12"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.2"
						opacity="0.7"
					/>
				</svg>
			);
		case "Playwright":
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
						d="M7 17c2.5-6.5 7.5-6.5 10 0"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<circle cx="10" cy="12" r="1" fill="currentColor" />
					<circle cx="14" cy="12" r="1" fill="currentColor" />
				</svg>
			);
		case "GitHub Actions":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<path d="M10 7l8 5-8 5V7z" fill="currentColor" opacity="0.9" />
					<path
						d="M6 6h4M6 12h3M6 18h4"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
					/>
				</svg>
			);
		case "Vercel Analytics":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<path d="M12 5l9 16H3l9-16z" fill="currentColor" opacity="0.9" />
					<path
						d="M8 16h2M12 14h2M16 12h2"
						fill="none"
						stroke="white"
						strokeWidth="1.2"
						strokeLinecap="round"
						opacity="0.9"
					/>
				</svg>
			);
		case "Google Sheets (Apps Script)":
			return TechIcon({ label: "Google Sheets API" });
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
		case "Lucide":
		case "Lucide React":
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
						d="M12 3l2.2 5.1L20 10l-5.1 2.2L12 18l-2.2-5.8L4 10l5.8-1.9L12 3z"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "Vercel":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<path d="M12 5l9 16H3l9-16z" fill="currentColor" />
				</svg>
			);
		case "Supabase":
		case "Supabase Auth":
		case "Supabase DB":
		case "Supabase SSR":
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
						d="M9 20l2.6-8H6.8L15 4l-2.6 8h4.8L9 20z"
						fill="currentColor"
						opacity="0.9"
					/>
				</svg>
			);
		case "Neon":
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
						d="M7 18c6-1 10-5 10-12"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<path
						d="M7 6c6 1 10 5 10 12"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						opacity="0.7"
					/>
				</svg>
			);
		case "Upstash Redis":
		case "Redis":
			return (
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
					role="img"
				>
					<title>{label}</title>
					<ellipse
						cx="12"
						cy="7"
						rx="7"
						ry="3"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
					/>
					<path
						d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
					/>
					<path
						d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						opacity="0.7"
					/>
				</svg>
			);
		case "Drizzle ORM":
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
						d="M8 7c0-1.2 1-2.2 2.2-2.2S12.4 5.8 12.4 7c0 1.2-1 2.2-2.2 2.2S8 8.2 8 7z"
						fill="currentColor"
					/>
					<path
						d="M11.8 9.4L7 19h4.2l5-9.6c.3-.6 0-1.3-.6-1.6-.6-.3-1.3 0-1.6.6z"
						fill="currentColor"
						opacity="0.85"
					/>
				</svg>
			);
		case "PayPal":
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
						d="M9 19l1.2-11h5.2c2 0 3.2 1.1 3 3-.2 2.4-1.8 3.8-4.4 3.8H12l-.4 4.2H9z"
						fill="currentColor"
						opacity="0.9"
					/>
					<path
						d="M7.5 19L8.7 7h4.9c2.3 0 3.6 1.3 3.4 3.3"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.2"
						strokeLinecap="round"
						opacity="0.7"
					/>
				</svg>
			);
		case "Sentry":
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
						d="M7 15c2 2 4 3 6 3 3 0 5-2 5-5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<path
						d="M17 9c-2-2-4-3-6-3-3 0-5 2-5 5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						opacity="0.85"
					/>
				</svg>
			);
		case "CSS Variables":
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
						d="M6 7h12M6 12h12M6 17h7"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<circle cx="18" cy="17" r="2" fill="currentColor" opacity="0.9" />
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
