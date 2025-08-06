import type { APIUser } from "@discordjs/core/http-only";
import { CDN, calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import {
	getRandomElement,
	HAIR_TOUSLES,
	HIGH_FIVES,
	HUGS_SQUARE,
	KRILLS,
	PLAY_FIGHTS,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { DEFAULT_LOCALE, LOCALES } from "~/utility/constants";

const cdn = new CDN();

export function getLocaleFromRequest(request: Request): string {
	const acceptLanguage = request.headers.get("accept-language");

	if (!acceptLanguage) {
		return DEFAULT_LOCALE;
	}

	const languages = acceptLanguage.split(",");

	for (const language of languages) {
		const [locale] = language.split(";");
		const preferred = locale?.trim().toLowerCase();

		if (!preferred) {
			continue;
		}

		const exactMatch = LOCALES.find((supported) => supported.toLowerCase() === preferred);

		if (exactMatch) {
			return exactMatch;
		}

		const [preferredLanguage] = preferred.split("-");

		if (!preferredLanguage) {
			continue;
		}

		const languageMatch = LOCALES.find((supported) =>
			supported.toLowerCase().startsWith(`${preferredLanguage}-`),
		);

		if (languageMatch) {
			return languageMatch;
		}
	}

	return DEFAULT_LOCALE;
}

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

function hairTousleGIF() {
	return getRandomElement(HAIR_TOUSLES)!.url;
}

function highFiveGIF() {
	return getRandomElement(HIGH_FIVES)!.url;
}

function huggingGIF() {
	return getRandomElement(HUGS_SQUARE)!.url;
}

function playFightGIF() {
	return getRandomElement(PLAY_FIGHTS)!.url;
}

function krillingGIF() {
	return getRandomElement(KRILLS)!.url;
}

export function friendshipActionGIFs() {
	return [
		hairTousleGIF(),
		highFiveGIF(),
		huggingGIF(),
		huggingGIF(),
		playFightGIF(),
		krillingGIF(),
	].sort(() => Math.random() - 0.5);
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
