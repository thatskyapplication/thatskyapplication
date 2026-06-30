import {
	MAXIMUM_ASSET_INPUT_PIXELS,
	MAXIMUM_ASSET_PROCESSING_SECONDS,
} from "@thatskyapplication/utility";
import sharp from "sharp";

interface ProcessUploadedImageOptions {
	animated: boolean;
	gif: boolean;
	maximumDimension: number;
}

export async function processUploadedImage(
	input: ArrayBuffer,
	{ animated, gif, maximumDimension }: ProcessUploadedImageOptions,
) {
	const pipeline = sharp(input, { animated, limitInputPixels: MAXIMUM_ASSET_INPUT_PIXELS })
		.timeout({ seconds: MAXIMUM_ASSET_PROCESSING_SECONDS })
		.resize(maximumDimension, maximumDimension, { fit: "inside", withoutEnlargement: true });

	return gif ? pipeline.gif().toBuffer() : pipeline.webp().toBuffer();
}
