/**
 * Strip signed S3 query strings (X-Amz-*) from URLs in a string to avoid writing credentials to disk.
 * Leaves base URL only; image may not load without signature.
 */
export function stripSignedUrlParams(str: string): string {
	// Match base URL + query that contains X-Amz-; do not consume trailing . so "url?X-Amz-Sig=x." stays "url."
	return str.replace(
		/(https?:\/\/[^\s?]+)\?[^\s"').)\]]*X-Amz-[^\s"').)\]]*/g,
		"$1",
	);
}
