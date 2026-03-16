import type { ProductEvolutionProject } from "@/data/product-evolution";
import { MetricCard } from "./metric-card";

type ProjectMetricsProps = {
	project: ProductEvolutionProject;
};

export function ProjectMetrics({ project }: ProjectMetricsProps) {
	if (!project.metrics?.length) return null;

	return (
		<section
			aria-label="Project metrics"
			className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
		>
			{project.metrics.map((metric) => (
				<MetricCard key={metric.label} metric={metric} />
			))}
		</section>
	);
}
