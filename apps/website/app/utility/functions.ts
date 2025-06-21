import {
	getRandomElement,
	HAIR_TOUSLES,
	HIGH_FIVES,
	HUGS_SQUARE,
	KRILLS,
	PLAY_FIGHTS,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { DEFAULT_LOCALE } from "~/utility/constants";

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
	return [hairTousleGIF(), highFiveGIF(), huggingGIF(), playFightGIF(), krillingGIF()].sort(
		() => Math.random() - 0.5,
	);
}
