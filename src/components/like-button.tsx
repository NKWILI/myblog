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
	className?: string;
}

export function LikeButton({ slug, className }: LikeButtonProps) {
	const [liked, setLiked] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;
		setLiked(getStoredLikes().has(slug));
	}, [mounted, slug]);

	const toggle = useCallback(() => {
		const next = getStoredLikes();
		if (next.has(slug)) {
			next.delete(slug);
		} else {
			next.add(slug);
		}
		setStoredLikes(next);
		setLiked(next.has(slug));
	}, [slug]);

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onClick={toggle}
			className={className}
			aria-label={liked ? "Unlike this post" : "Like this post"}
			aria-pressed={liked}
		>
			<Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
		</Button>
	);
}
