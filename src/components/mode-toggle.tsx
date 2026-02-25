"use client";

import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
	className?: string;
}

export function ModeToggle({ className }: ThemeToggleProps) {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const isDark = resolvedTheme === "dark";

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleToggle = () => setTheme(isDark ? "light" : "dark");
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleToggle();
		}
	};

	if (!mounted) {
		return (
			<button
				type="button"
				className={cn(
					"flex w-16 h-8 p-1 rounded-full cursor-pointer transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]",
					"bg-white border border-zinc-200",
					className,
				)}
				aria-label="Theme toggle"
			>
				<div className="flex justify-between items-center w-full">
					<div className="flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 transform translate-x-8 bg-gray-200">
						<SunIcon
							className="w-4 h-4 text-gray-700"
							style={{ width: 16, height: 16 }}
						/>
					</div>
					<div className="flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 transform -translate-x-8">
						<MoonIcon
							className="w-4 h-4 text-black"
							style={{ width: 16, height: 16 }}
						/>
					</div>
				</div>
			</button>
		);
	}

	return (
		<button
			type="button"
			className={cn(
				"flex w-16 h-8 p-1 rounded-full cursor-pointer transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]",
				isDark
					? "bg-zinc-950 border border-zinc-800"
					: "bg-white border border-zinc-200",
				className,
			)}
			onClick={handleToggle}
			onKeyDown={handleKeyDown}
			aria-label="Theme toggle"
		>
			<div className="flex justify-between items-center w-full">
				<div
					className={cn(
						"flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
						isDark
							? "transform translate-x-0 bg-zinc-800"
							: "transform translate-x-8 bg-gray-200",
					)}
				>
					{isDark ? (
						<MoonIcon
							className="w-4 h-4 text-white"
							style={{ width: 16, height: 16 }}
						/>
					) : (
						<SunIcon
							className="w-4 h-4 text-gray-700"
							style={{ width: 16, height: 16 }}
						/>
					)}
				</div>
				<div
					className={cn(
						"flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
						isDark ? "bg-transparent" : "transform -translate-x-8",
					)}
				>
					{isDark ? (
						<SunIcon
							className="w-4 h-4 text-gray-500"
							style={{ width: 16, height: 16 }}
						/>
					) : (
						<MoonIcon
							className="w-4 h-4 text-black"
							style={{ width: 16, height: 16 }}
						/>
					)}
				</div>
			</div>
		</button>
	);
}
