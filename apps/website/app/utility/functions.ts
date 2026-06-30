import type { APIUser } from "@discordjs/core/http-only";
import { CDN, calculateUserDefaultAvatarIndex } from "@discordjs/rest";

const cdn = new CDN();

export function avatarURL(user: Pick<APIUser, "id" | "avatar" | "discriminator">) {
	const index =
		user.discriminator === "0"
			? calculateUserDefaultAvatarIndex(user.id)
			: Number(user.discriminator) % 5;

	return user.avatar ? cdn.avatar(user.id, user.avatar) : cdn.defaultAvatar(index);
}

export function guildIconURL(guildId: string, icon: string) {
	return cdn.icon(guildId, icon, { size: 4096 });
}

export function parsePage(url: URL) {
	const page = Number(url.searchParams.get("page") ?? 1);
	return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
