"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export type NavItem = {
	href: string;
	label: string;
	description: string;
};

interface MobileNavProps {
	navItems: readonly NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					aria-label="Open menu"
				>
					<HamburgerMenuIcon
						className="size-5"
						style={{ width: 20, height: 20 }}
					/>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-[min(100vw-2rem,20rem)] pl-8 pr-6"
			>
				<SheetHeader className="pl-0">
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-1 flex-col justify-center gap-6">
					{navItems.map(({ href, label, description }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								"block rounded-md p-2 -m-2 transition-[color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]",
								"hover:bg-accent hover:text-accent-foreground",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
							)}
							onClick={() => setOpen(false)}
						>
							<span className="font-medium text-foreground">{label}</span>
							<p className="text-sm text-muted-foreground mt-1">
								{description}
							</p>
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
