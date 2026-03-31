export const ANIMATED_HASH_PREFIX = "a_" as const;
export const MAXIMUM_ASSET_SIZE = 5_000_000 as const;

export const ALLOWED_IMAGE_MEDIA_TYPES = [
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp",
] as const satisfies readonly `${string}/${string}`[];

export function isAnimatedHash(hash: string): hash is `${typeof ANIMATED_HASH_PREFIX}${string}` {
	return hash.startsWith(ANIMATED_HASH_PREFIX);
}
