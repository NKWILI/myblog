"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "blog-likes";

function getStoredLikes(): Set<string> {
	if (typeof window === "undefined") return new Set();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return new Set();
		const parsed = JSON.parse(raw) as string[];
		return new Set(Array.isArray(parsed) ? parsed : []);
	} catch {
		return new Set();
	}
}

function setStoredLikes(slugs: Set<string>) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
	} catch {
		// ignore
	}
}

interface LikeButtonProps {
	slug: string;
	initialCount?: number;
	className?: string;
}

export function LikeButton({ slug, initialCount, className }: LikeButtonProps) {
	const [liked, setLiked] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [count, setCount] = useState(initialCount ?? 0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;
		setLiked(getStoredLikes().has(slug));

		// If initialCount was not provided by the server, fetch it
		if (initialCount === undefined) {
			fetch(`/api/likes/${slug}`)
				.then((r) => r.json())
				.then((data: { count: number }) => setCount(data.count))
				.catch(() => {
					// ignore
				});
		}
	}, [mounted, slug, initialCount]);

	const toggle = useCallback(async () => {
		if (isLoading) return;

		const next = getStoredLikes();
		const action = next.has(slug) ? "unlike" : "like";

		// Optimistic update
		const optimisticCount =
			action === "like" ? count + 1 : Math.max(0, count - 1);
		setCount(optimisticCount);
		if (action === "like") {
			next.add(slug);
		} else {
			next.delete(slug);
		}
		setStoredLikes(next);
		setLiked(next.has(slug));

		setIsLoading(true);
		try {
			const res = await fetch(`/api/likes/${slug}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action }),
			});
			if (res.ok) {
				const data = (await res.json()) as { count: number };
				setCount(data.count);
			}
		} finally {
			setIsLoading(false);
		}
	}, [slug, count, isLoading]);

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onClick={toggle}
			className={className}
			disabled={isLoading}
			aria-label={liked ? "Unlike this post" : "Like this post"}
			aria-pressed={liked}
		>
			<Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
			{mounted && count > 0 && (
				<span className="text-xs tabular-nums">{count}</span>
			)}
		</Button>
	);
}
