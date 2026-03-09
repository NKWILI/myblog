import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getWordCount(content: string): number {
	const cleanText = content
		.replace(/[^\w\s]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	return cleanText.split(" ").length;
}

export function calculateReadingTime(wordCount: number): string {
	const WORDS_PER_MINUTE = 225; // Average adult reading speed
	const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
	return `${minutes} min read`;
}

/**
 * Removes a single leading "## Overview" line from markdown so it is not shown in the blog.
 * Only strips when the first line is exactly that heading (with optional whitespace).
 */
export function stripOverviewHeading(content: string): string {
	return content.replace(/^\s*##\s+Overview\s*\n?/, "");
}
