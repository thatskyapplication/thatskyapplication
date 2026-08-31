import type { APIUser, Snowflake } from "@discordjs/core/http-only";
import { CDN, calculateUserDefaultAvatarIndex, type ImageURLOptions } from "@discordjs/rest";

const cdn = new CDN();

export function avatarURL(
	user: Pick<APIUser, "id" | "avatar" | "discriminator">,
	options?: Readonly<ImageURLOptions>,
) {
	const index =
		user.discriminator === "0"
			? calculateUserDefaultAvatarIndex(user.id)
			: Number(user.discriminator) % 5;

	return user.avatar ? cdn.avatar(user.id, user.avatar, options) : cdn.defaultAvatar(index);
}

export function defaultAvatarURL(userId: Snowflake) {
	return cdn.defaultAvatar(calculateUserDefaultAvatarIndex(userId));
}

export function guildIconURL(guildId: string, icon: string) {
	return cdn.icon(guildId, icon, { size: 4096 });
}

export async function writeToClipboard(text: string) {
	if (!navigator.clipboard) {
		throw new Error("Clipboard API is unavailable.");
	}

	await navigator.clipboard.writeText(text);
}

export function parsePage(url: URL) {
	const page = Number(url.searchParams.get("page") ?? 1);
	return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
