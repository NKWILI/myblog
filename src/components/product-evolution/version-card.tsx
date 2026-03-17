import type { ProductVersion } from "@/data/product-evolution";
import { CaseStudyColumn } from "./case-study-column";
import { TechBadge } from "./tech-badge";

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
					{version.impact?.length ? (
						<section aria-label="Impact" className="space-y-2">
							<h4 className="text-xs font-semibold uppercase tracking-wide pe-muted">
								Impact
							</h4>
							<div className="grid gap-2 sm:grid-cols-3">
								{version.impact.slice(0, 3).map((metric) => (
									<div
										key={`${metric.label}-${metric.value}`}
										className="rounded-lg border border-[var(--pe-border)] bg-[var(--pe-bg)] px-3 py-2"
									>
										<div className="text-[0.7rem] uppercase tracking-wide pe-muted">
											{metric.label}
										</div>
										<div className="mt-0.5 text-sm font-semibold pe-text">
											{metric.value}
										</div>
										{metric.trend ? (
											<div className="mt-0.5 text-xs pe-muted">
												{metric.trend}
											</div>
										) : null}
									</div>
								))}
							</div>
						</section>
					) : null}

					<div className="grid gap-4 md:grid-cols-2">
						<CaseStudyColumn side={version.problem} />
						<CaseStudyColumn side={version.solution} />
					</div>

					{version.userStories?.length ? (
						<section
							aria-label="User stories"
							className="space-y-2 border-t border-[var(--pe-border)] pt-3"
						>
							<h4 className="text-xs font-semibold uppercase tracking-wide pe-muted">
								User stories
							</h4>
							<ol className="space-y-3">
								{version.userStories.map((story, idx) => (
									<li
										key={`${story.persona}-${story.goal}`}
										className="rounded-lg border border-[var(--pe-border)] bg-[var(--pe-bg)] px-3 py-3"
									>
										<div className="flex flex-wrap items-center gap-2">
											<span className="inline-flex items-center rounded-full border border-[var(--pe-border)] bg-[var(--pe-bg)] px-2 py-0.5 text-[0.7rem] font-medium pe-muted">
												Story {idx + 1}
											</span>
											<span className="text-xs pe-muted">
												As a{" "}
												<span className="font-medium pe-text">
													{story.persona}
												</span>
											</span>
										</div>
										<p className="mt-2 text-sm pe-text">
											I want to{" "}
											<span className="font-medium">{story.goal}</span> so that{" "}
											<span className="font-medium">{story.benefit}</span>.
										</p>
										{story.acceptanceCriteria?.length ? (
											<ul className="mt-2 list-disc pl-5 text-xs pe-muted space-y-1">
												{story.acceptanceCriteria.map((item) => (
													<li key={item}>{item}</li>
												))}
											</ul>
										) : null}
									</li>
								))}
							</ol>
						</section>
					) : null}

					{version.techTags?.length ? (
						<div className="flex flex-wrap gap-1.5 border-t border-[var(--pe-border)] pt-3">
							{version.techTags.map((tag) => (
								<TechBadge key={tag} label={tag} />
							))}
						</div>
					) : null}
				</div>
			) : null}
		</article>
	);
}
