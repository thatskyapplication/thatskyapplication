import {
	CDN_URL,
	MAXIMUM_HAIR_TOUSLE_GIF,
	MAXIMUM_HIGH_FIVE_GIF,
	MAXIMUM_KRILL_GIF,
	MAXIMUM_PLAY_FIGHT_GIF,
	TIME_ZONE,
	getRandomElement,
} from "@thatskyapplication/utility";
import type { DateTime } from "luxon";
import { DEFAULT_LOCALE, HUGGING_GIFS } from "~/utility/constants";
import {
	type EVENT_DATES,
	NEXT_SEASON_END,
	NEXT_SEASON_START,
	SEASON_END,
	SEASON_START,
} from "~/utility/dates";

export function getBrowserTimeZone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

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

export function daysText(
	date: DateTime,
	{
		event = null,
		next = false,
	}: { event?: (typeof EVENT_DATES)[number] | null; next?: boolean } = {},
) {
	const start = event ? event.start : next ? NEXT_SEASON_START : SEASON_START;
	const end = event ? event.end : next ? NEXT_SEASON_END : SEASON_END;

	if (!(start && end)) {
		throw new Error("Invalid start or end date.");
	}

	const daysLeft = end.diff(date, "days").days;
	const daysUntilStart = start.diff(date, "days").days;

	if (daysLeft <= 0) {
		const text = event ? `${event.name}` : "The season";

		return daysLeft === 0
			? `${text} ended ${Math.abs(daysLeft)} day ago.`
			: `${text} ended ${Math.abs(daysLeft)} days ago.`;
	}

	if (daysUntilStart > 0) {
		const text = event ? `${event.name}` : "The new season";

		return daysUntilStart < 1
			? `${text} starts tomorrow.`
			: daysUntilStart >= 2
				? `${text} starts in ${Math.floor(daysUntilStart)} days.`
				: daysUntilStart <= 1
					? `${text} starts tomorrow.`
					: `${text} starts in 1 day.`;
	}

	const number = Math.ceil(daysLeft) - 1;

	if (number === 0) {
		return event ? `${event.name} ends today.` : "The season ends today.";
	}

	if (number === 1) {
		return event ? `1 day left in  ${event.name}.` : "1 day left in the season.";
	}

	if (number > 1) {
		return event ? `${number} days left in ${event.name}.` : `${number} days left in the season.`;
	}

	throw new Error("Invalid number of days left.");
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
