"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface FadeInSectionProps {
	children: ReactNode;
	/** Optional class for the wrapper */
	className?: string;
}

/**
 * Very light fade-in when the section enters the viewport.
 * Calm, minimal — no overdesign.
 */
export function FadeInSection({
	children,
	className = "",
}: FadeInSectionProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		// If already in view on mount (e.g. above the fold), show immediately
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight * 0.9) setVisible(true);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setVisible(true);
			},
			{ threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`transition-[opacity,transform] duration-500 ease-out ${
				visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
			} ${className}`}
		>
			{children}
		</div>
	);
}
