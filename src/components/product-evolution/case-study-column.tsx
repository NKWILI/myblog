import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { CaseStudySide } from "@/data/product-evolution";
import Link from "next/link";
import { useState } from "react";
import { ScreenshotPlaceholder } from "./screenshot-placeholder";
import { TechBadge } from "./tech-badge";

type CaseStudyColumnProps = {
	side: CaseStudySide;
};

function getVariant(side: CaseStudySide): "problem" | "solution" {
	return side.label.toLowerCase().includes("problem") ? "problem" : "solution";
}

export function CaseStudyColumn({ side }: CaseStudyColumnProps) {
	const [imageError, setImageError] = useState(false);
	const showImage = side.screenshotPath && !imageError;
	const showPlaceholder = Boolean(side.screenshotPath) && imageError;

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-2">
				<span
					className="h-2 w-2 rounded-full"
					style={{
						backgroundColor: side.label.toLowerCase().includes("problem")
							? "var(--pe-problem)"
							: "var(--pe-solution)",
					}}
					aria-hidden="true"
				/>
				<h3 className="text-xs font-semibold uppercase tracking-wide pe-muted">
					{side.label}
				</h3>
			</div>
			<p className="text-sm pe-text">{side.body}</p>
			{side.bodyBullets?.length ? (
				<ul className="text-sm pe-text list-disc pl-5 space-y-1">
					{side.bodyBullets.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			) : null}
			{side.links?.length ? (
				<div className="flex flex-col gap-1">
					{side.links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-link underline underline-offset-2 decoration-link/50 hover:decoration-link transition-colors"
						>
							{l.label}
						</Link>
					))}
				</div>
			) : null}
			{showImage ? (
				<Dialog>
					<DialogTrigger asChild>
						<button
							type="button"
							aria-label="View screenshot"
							className="group relative overflow-hidden rounded-lg border pe-border-b bg-[var(--pe-card)] text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
						>
							<img
								src={side.screenshotPath}
								alt={side.caption}
								className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
								onError={() => setImageError(true)}
							/>
							<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
							<div className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-1 text-[0.7rem] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
								<span aria-hidden="true">⤢</span>
								<span>Click to enlarge</span>
							</div>
						</button>
					</DialogTrigger>
					<DialogContent className="max-w-[min(100vw-2rem,64rem)] p-0 overflow-hidden">
						<DialogTitle className="sr-only">Screenshot</DialogTitle>
						<DialogDescription className="sr-only">
							Full-size screenshot preview.
						</DialogDescription>
						<img
							src={side.screenshotPath}
							alt={side.caption}
							className="max-h-[85vh] w-full object-contain bg-black"
						/>
					</DialogContent>
				</Dialog>
			) : null}
			{showPlaceholder ? (
				<ScreenshotPlaceholder variant={getVariant(side)} />
			) : null}
			<p className="text-xs pe-muted">{side.caption}</p>
			{side.technologies?.length ? (
				<div className="mt-1 flex flex-wrap gap-1.5">
					{side.technologies.map((tech) => (
						<TechBadge
							key={tech}
							label={tech}
							className="border-[color-mix(in_oklab,var(--pe-border)_80%,var(--pe-gold)_20%)]"
						/>
					))}
				</div>
			) : null}
		</div>
	);
}
