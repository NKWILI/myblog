import type { ProductVersion } from "@/data/product-evolution";
import { CaseStudyColumn } from "./case-study-column";

type VersionCardProps = {
	version: ProductVersion;
	isOpen: boolean;
	onToggle: () => void;
};

export function VersionCard({ version, isOpen, onToggle }: VersionCardProps) {
	return (
		<article className="pe-card rounded-lg border pe-border-b px-4 py-3">
			<button
				type="button"
				onClick={onToggle}
				className="flex w-full items-center justify-between gap-3 text-left"
				aria-expanded={isOpen}
			>
				<div className="flex items-center gap-3">
					<span className="inline-flex items-center rounded-full border border-[var(--pe-border)] bg-[var(--pe-bg)] px-2 py-0.5 text-xs font-medium pe-text">
						{version.versionLabel}
					</span>
					<div className="flex flex-col">
						<span className="text-sm font-semibold pe-text">
							{version.versionName}
						</span>
						{version.isCurrent ? (
							<span className="text-[0.7rem] font-medium uppercase tracking-wide text-[var(--pe-gold)]">
								Current
							</span>
						) : null}
					</div>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-xs pe-muted">{version.date}</span>
					<span
						aria-hidden="true"
						className={`transition-transform ${
							isOpen ? "rotate-90" : "rotate-0"
						}`}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							role="img"
						>
							<title>Expand</title>
							<path
								d="M6 3L11 8L6 13"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</div>
			</button>

			{isOpen ? (
				<div className="mt-4 space-y-4 border-t border-[color-mix(in_oklab,var(--pe-border)_80%,var(--pe-gold)_20%)] pt-4">
					<div className="grid gap-4 md:grid-cols-2">
						<CaseStudyColumn side={version.problem} />
						<CaseStudyColumn side={version.solution} />
					</div>
					{version.techTags?.length ? (
						<div className="flex flex-wrap gap-1.5 border-t border-[var(--pe-border)] pt-3">
							{version.techTags.map((tag) => (
								<span
									key={tag}
									className="rounded-full border border-[var(--pe-border)] bg-[var(--pe-bg)] px-2 py-0.5 text-[0.7rem] pe-muted"
								>
									{tag}
								</span>
							))}
						</div>
					) : null}
				</div>
			) : null}
		</article>
	);
}
