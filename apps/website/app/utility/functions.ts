import {
	CDN_URL,
	getRandomElement,
	MAXIMUM_HAIR_TOUSLE_GIF,
	MAXIMUM_HIGH_FIVE_GIF,
	MAXIMUM_KRILL_GIF,
	MAXIMUM_PLAY_FIGHT_GIF,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { DEFAULT_LOCALE, HUGGING_GIFS } from "~/utility/constants";

export function getLocaleFromRequest(request: Request) {
	return (
		request.headers
			.get("accept-language")
			?.split(",")
			.map((language) => language.split(";")[0]!.trim()) ?? DEFAULT_LOCALE
	);
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
	return String(
		new URL(`hair_tousles/${Math.floor(Math.random() * MAXIMUM_HAIR_TOUSLE_GIF + 1)}.gif`, CDN_URL),
	);
}

function highFiveGIF() {
	return String(
		new URL(`high_fives/${Math.floor(Math.random() * MAXIMUM_HIGH_FIVE_GIF + 1)}.gif`, CDN_URL),
	);
}

function huggingGIF() {
	return String(new URL(`hugs/${getRandomElement(HUGGING_GIFS)!}.gif`, CDN_URL));
}

function playFightGIF() {
	return String(
		new URL(`play_fights/${Math.floor(Math.random() * MAXIMUM_PLAY_FIGHT_GIF + 1)}.gif`, CDN_URL),
	);
}

function krillingGIF() {
	return String(
		new URL(`krills/${Math.floor(Math.random() * MAXIMUM_KRILL_GIF + 1)}.gif`, CDN_URL),
	);
}

export function friendshipActionGIFs() {
	return [hairTousleGIF(), highFiveGIF(), huggingGIF(), playFightGIF(), krillingGIF()].sort(
		() => Math.random() - 0.5,
	);
}
