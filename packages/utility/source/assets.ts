export const ANIMATED_HASH_PREFIX = "a_" as const;
export const MAXIMUM_ASSET_SIZE = 5_000_000 as const;
export const MAXIMUM_ASSET_INPUT_PIXELS = 50_000_000 as const;
export const MAXIMUM_ASSET_PROCESSING_SECONDS = 10 as const;
export const MAXIMUM_ASSET_ICON_DIMENSION = 512 as const;
export const MAXIMUM_ASSET_BANNER_DIMENSION = 1_280 as const;

export const ALLOWED_IMAGE_MEDIA_TYPES = [
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp",
] as const satisfies readonly `${string}/${string}`[];

export function isValidImageAsset(asset: { size: number; type: string }) {
	return (
		asset.size <= MAXIMUM_ASSET_SIZE &&
		ALLOWED_IMAGE_MEDIA_TYPES.some((mediaType) => mediaType === asset.type)
	);
}

export function isAnimatedHash(hash: string): hash is `${typeof ANIMATED_HASH_PREFIX}${string}` {
	return hash.startsWith(ANIMATED_HASH_PREFIX);
}
