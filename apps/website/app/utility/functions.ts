import type { APIUser } from "@discordjs/core/http-only";
import { CDN, calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { TIME_ZONE } from "@thatskyapplication/utility";

const cdn = new CDN();

export function timeString(locale: string | string[]) {
	const date = new Date();

	const lg = new Intl.DateTimeFormat(locale, {
		timeZone: TIME_ZONE,
		weekday: "long",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZoneName: "short",
	}).format(date);

	const sm = new Intl.DateTimeFormat(locale, {
		timeZone: TIME_ZONE,
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZoneName: "short",
	}).format(date);

	return { lg, sm };
}

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
