import type { CaseStudySide } from "@/data/product-evolution";
import { useState } from "react";
import { ScreenshotPlaceholder } from "./screenshot-placeholder";

type CaseStudyColumnProps = {
	side: CaseStudySide;
};

function getVariant(side: CaseStudySide): "problem" | "solution" {
	return side.label.toLowerCase().includes("problem") ? "problem" : "solution";
}

export function CaseStudyColumn({ side }: CaseStudyColumnProps) {
	const [imageError, setImageError] = useState(false);
	const showImage = side.screenshotPath && !imageError;
	const showPlaceholder = !showImage;

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
			{showImage ? (
				<div className="overflow-hidden rounded-lg border pe-border-b bg-[var(--pe-card)]">
					<img
						src={side.screenshotPath}
						alt={side.caption}
						className="h-40 w-full object-cover"
						onError={() => setImageError(true)}
					/>
				</div>
			) : null}
			{showPlaceholder ? (
				<ScreenshotPlaceholder variant={getVariant(side)} />
			) : null}
			<p className="text-xs pe-muted">{side.caption}</p>
			{side.technologies?.length ? (
				<div className="mt-1 flex flex-wrap gap-1.5">
					{side.technologies.map((tech) => (
						<span
							key={tech}
							className="rounded-full border px-2 py-0.5 text-[0.7rem] pe-muted border-[color-mix(in_oklab,var(--pe-border)_80%,var(--pe-gold)_20%)]"
						>
							{tech}
						</span>
					))}
				</div>
			) : null}
		</div>
	);
}
