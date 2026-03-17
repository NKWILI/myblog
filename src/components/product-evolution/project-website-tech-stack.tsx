import type { ProductEvolutionProject } from "@/data/product-evolution";
import { TechBadge } from "./tech-badge";

type ProjectWebsiteTechStackProps = {
	project: ProductEvolutionProject;
};

export function ProjectWebsiteTechStack({
	project,
}: ProjectWebsiteTechStackProps) {
	if (!project.websiteTechStack?.length) return null;

	return (
		<section aria-label="Website tech stack" className="space-y-2">
			<h3 className="text-xs font-semibold uppercase tracking-wide pe-muted">
				Technology stack
			</h3>
			<div className="flex flex-wrap gap-1.5">
				{project.websiteTechStack.map((label) => (
					<TechBadge key={label} label={label} />
				))}
			</div>
		</section>
	);
}
