import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductEvolutionProject } from "@/data/product-evolution";

type ProductEvolutionTabBarProps = {
	projects: ProductEvolutionProject[];
};

export function ProductEvolutionTabBar({
	projects,
}: ProductEvolutionTabBarProps) {
	if (!projects.length) return null;

	return (
		<TabsList className="bg-transparent px-0 py-0 h-auto w-full justify-start border-b-0 overflow-x-visible flex-wrap gap-2 pe-border-b">
			{projects.map((project) => (
				<TabsTrigger
					key={project.id}
					value={project.id}
					className="relative rounded-none border-none bg-transparent px-0 py-2 text-sm font-medium pe-muted data-[state=active]:pe-text data-[state=active]:font-semibold focus-visible:ring-[3px] focus-visible:outline-1 after:absolute after:left-0 after:right-0 after:-bottom-px after:h-[2px] after:rounded-full after:bg-transparent data-[state=active]:after:bg-[var(--pe-gold)]"
					role="tab"
					aria-controls={`panel-${project.id}`}
				>
					<span className="whitespace-nowrap">{project.tabLabel}</span>
				</TabsTrigger>
			))}
		</TabsList>
	);
}
