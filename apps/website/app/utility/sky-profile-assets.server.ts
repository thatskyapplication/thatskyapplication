import { Buffer } from "node:buffer";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	ALLOWED_IMAGE_MEDIA_TYPES,
	ANIMATED_HASH_PREFIX,
	MAXIMUM_ASSET_SIZE,
	type SkyProfilePacket,
	skyProfileIconRoute,
} from "@thatskyapplication/utility";
import { hash } from "hasha";
import sharp from "sharp";
import { CDN_BUCKET } from "~/config.server.js";
import S3Client from "~/s3-client.server.js";

export function isValidSkyProfileImageFile(file: File) {
	return (
		file.size <= MAXIMUM_ASSET_SIZE &&
		ALLOWED_IMAGE_MEDIA_TYPES.some((mediaType) => mediaType === file.type)
	);
}

export async function uploadSkyProfileIcon({ file, userId }: { file: File; userId: string }) {
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
			Key: skyProfileIconRoute(userId, hashedBuffer),
			Body: buffer,
		}),
	);

	return hashedBuffer;
}

export async function deleteSkyProfileIcon({
	icon,
	userId,
}: {
	icon: SkyProfilePacket["icon"];
	userId: string;
}) {
	if (!icon) {
		return;
	}

	await S3Client.send(
		new DeleteObjectCommand({
			Bucket: CDN_BUCKET,
			Key: skyProfileIconRoute(userId, icon),
		}),
	);
}
