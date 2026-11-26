import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import {
	MAXIMUM_ASSET_BANNER_DIMENSION,
	MAXIMUM_ASSET_INPUT_PIXELS,
	MAXIMUM_ASSET_PROCESSING_SECONDS,
} from "@thatskyapplication/utility";
import { R2_BUCKET_CDN } from "~/config.server.js";
import S3Client from "~/s3-client.server.js";

export async function uploadTravellingRock(file: File) {
	const buffer = await sharp(Buffer.from(await file.arrayBuffer()), {
		animated: false,
		limitInputPixels: MAXIMUM_ASSET_INPUT_PIXELS,
	})
		.timeout({ seconds: MAXIMUM_ASSET_PROCESSING_SECONDS })
		.resize(MAXIMUM_ASSET_BANNER_DIMENSION, MAXIMUM_ASSET_BANNER_DIMENSION, {
			fit: "inside",
			withoutEnlargement: true,
		})
		.webp()
		.toBuffer();

	const hash = createHash("md5").update(buffer).digest("hex");

	await S3Client.send(
		new PutObjectCommand({
			Bucket: R2_BUCKET_CDN,
			Key: `daily_guides/travelling_rocks/${hash}.webp`,
			Body: buffer,
			ContentDisposition: "inline",
			ContentType: "image/webp",
		}),
	);

	return hash;
}
