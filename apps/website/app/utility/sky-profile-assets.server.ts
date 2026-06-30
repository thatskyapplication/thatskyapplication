import { Buffer } from "node:buffer";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	ANIMATED_HASH_PREFIX,
	CDN,
	isValidImageAsset,
	MAXIMUM_ASSET_BANNER_DIMENSION,
	MAXIMUM_ASSET_ICON_DIMENSION,
	MAXIMUM_ASSET_INPUT_PIXELS,
	MAXIMUM_ASSET_PROCESSING_SECONDS,
} from "@thatskyapplication/utility";
import { hash } from "hasha";
import sharp from "sharp";
import { CDN_BUCKET, CDN_URL } from "~/config.server.js";
import S3Client from "~/s3-client.server.js";

const cdn = new CDN(CDN_URL);

async function uploadSkyProfileAsset({
	file,
	maximumDimension,
	route,
}: {
	file: File;
	maximumDimension: number;
	route: (hash: string) => string;
}) {
	if (!isValidImageAsset(file)) {
		throw new Error("Invalid Sky profile image file.");
	}

	const gif = file.type === "image/gif";
	const assetBuffer = sharp(Buffer.from(await file.arrayBuffer()), {
		animated: true,
		limitInputPixels: MAXIMUM_ASSET_INPUT_PIXELS,
	})
		.timeout({ seconds: MAXIMUM_ASSET_PROCESSING_SECONDS })
		.resize(maximumDimension, maximumDimension, { fit: "inside", withoutEnlargement: true });

	const buffer = gif ? await assetBuffer.gif().toBuffer() : await assetBuffer.webp().toBuffer();
	let hashedBuffer = await hash(buffer, { algorithm: "md5" });

	if (gif) {
		hashedBuffer = `${ANIMATED_HASH_PREFIX}${hashedBuffer}`;
	}

	await S3Client.send(
		new PutObjectCommand({
			Bucket: CDN_BUCKET,
			Key: route(hashedBuffer),
			Body: buffer,
		}),
	);

	return hashedBuffer;
}

export async function uploadSkyProfileIcon({ file, userId }: { file: File; userId: string }) {
	return uploadSkyProfileAsset({
		file,
		maximumDimension: MAXIMUM_ASSET_ICON_DIMENSION,
		route: (hash) => cdn.skyProfileIconRoute(userId, hash),
	});
}

export async function uploadSkyProfileBanner({ file, userId }: { file: File; userId: string }) {
	return uploadSkyProfileAsset({
		file,
		maximumDimension: MAXIMUM_ASSET_BANNER_DIMENSION,
		route: (hash) => cdn.skyProfileBannerRoute(userId, hash),
	});
}

export async function deleteSkyProfileIcon({ icon, userId }: { icon: string; userId: string }) {
	await S3Client.send(
		new DeleteObjectCommand({
			Bucket: CDN_BUCKET,
			Key: cdn.skyProfileIconRoute(userId, icon),
		}),
	);
}

export async function deleteSkyProfileBanner({
	banner,
	userId,
}: {
	banner: string;
	userId: string;
}) {
	await S3Client.send(
		new DeleteObjectCommand({
			Bucket: CDN_BUCKET,
			Key: cdn.skyProfileBannerRoute(userId, banner),
		}),
	);
}
