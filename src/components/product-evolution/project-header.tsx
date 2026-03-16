import type { ProductEvolutionProject } from "@/data/product-evolution";

type ProjectHeaderProps = {
	project: ProductEvolutionProject;
};

function getStatusLabel(status: ProductEvolutionProject["status"]): string {
	switch (status) {
		case "active":
			return "Active";
		case "in_progress":
			return "In progress";
		case "shipped":
			return "Shipped";
		default:
			return status;
	}
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
	const statusLabel = getStatusLabel(project.status);

	return (
		<header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
			<div className="space-y-2 max-w-2xl">
				<h2 className="pe-serif-heading text-2xl sm:text-3xl font-semibold pe-text">
					{project.tabLabel}
				</h2>
				<p className="text-sm sm:text-base pe-muted">{project.description}</p>
			</div>
			<div className="flex items-start">
				<span
					className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium pe-text border-[var(--color-border)] bg-[color-mix(in_oklab,var(--pe-card)_80%,var(--pe-gold)_20%)]"
					aria-label={`Project status: ${statusLabel}`}
				>
					<span
						className="mr-2 h-1.5 w-1.5 rounded-full"
						style={{
							backgroundColor:
								project.status === "active"
									? "var(--color-success)"
									: project.status === "in_progress"
										? "var(--color-warning)"
										: "var(--pe-muted)",
						}}
					/>
					{statusLabel}
				</span>
			</div>
		</header>
	);
}
