import { Buffer } from "node:buffer";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { ANIMATED_HASH_PREFIX, CDN, isValidImageAsset } from "@thatskyapplication/utility";
import { hash } from "hasha";
import sharp from "sharp";
import { CDN_BUCKET, CDN_URL } from "~/config.server.js";
import S3Client from "~/s3-client.server.js";

const cdn = new CDN(CDN_URL);

async function uploadSkyProfileAsset({
	file,
	route,
}: {
	file: File;
	route: (hash: string) => string;
}) {
	if (!isValidImageAsset(file)) {
		throw new Error("Invalid Sky profile image file.");
	}

	const gif = file.type === "image/gif";
	const assetBuffer = sharp(Buffer.from(await file.arrayBuffer()), { animated: true });
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
		route: (hash) => cdn.skyProfileIconRoute(userId, hash),
	});
}

export async function uploadSkyProfileBanner({ file, userId }: { file: File; userId: string }) {
	return uploadSkyProfileAsset({
		file,
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
