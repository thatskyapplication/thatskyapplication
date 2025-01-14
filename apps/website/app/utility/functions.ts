import { DAILY_QUEST_VALUES, type DailyQuests, type RealmName } from "@thatskyapplication/utility";
import type { DateTime } from "luxon";
import {
	CDN_URL,
	DEFAULT_LOCALE,
	HUGGING_GIFS,
	MAXIMUM_KRILL_NO,
	REALM_NAME_TO_REALM_CDN_NAME,
	type RotationNumber,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SEASONAL_CANDLES_ROTATION,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
} from "~/utility/constants";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_DURATION,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	type EVENT_DATES,
	NEXT_SEASON_END,
	NEXT_SEASON_START,
	SEASON_END,
	SEASON_START,
	TIME_ZONE,
} from "~/utility/dates";

export function getBrowserTimeZone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getRandomElement<const T>(array: readonly T[]) {
	return array[Math.floor(Math.random() * array.length)];
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

export function isDailyQuest(dailyQuest: number): dailyQuest is DailyQuests {
	return DAILY_QUEST_VALUES.includes(dailyQuest as DailyQuests);
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
			? `${text} starts today.`
			: daysUntilStart >= 2
				? `${text} starts in ${Math.floor(daysUntilStart)} days.`
				: `${text} starts tomorrow.`;
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

export function remainingSeasonalCandles(date: DateTime) {
	const start = SEASON_START;
	const end = SEASON_END;
	const duration = Math.ceil(end.diff(start, "days").days);

	const seasonalDoubleLightEvent =
		DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE >= start && DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE < end;

	// Calculate the total amount of seasonal candles.
	let seasonalCandlesTotal = duration * SEASONAL_CANDLES_PER_DAY;

	let seasonalCandlesTotalWithSeasonPass =
		duration * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

	if (seasonalDoubleLightEvent) {
		seasonalCandlesTotal += DOUBLE_SEASONAL_LIGHT_EVENT_DURATION;
		seasonalCandlesTotalWithSeasonPass += DOUBLE_SEASONAL_LIGHT_EVENT_DURATION;
	}

	// Calculate the amount of seasonal candles so far.
	const daysSoFar = date.diff(start, "days").days + 1;
	let seasonalCandlesSoFar = daysSoFar * SEASONAL_CANDLES_PER_DAY;

	let seasonalCandlesSoFarWithSeasonPass =
		daysSoFar * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

	if (
		seasonalDoubleLightEvent &&
		date.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days >= 0
	) {
		const difference = date.diff(DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE, "days").days;

		const extraSeasonalCandles =
			// The difference will be a negative number if the event is still ongoing.
			difference > 0
				? DOUBLE_SEASONAL_LIGHT_EVENT_DURATION
				: DOUBLE_SEASONAL_LIGHT_EVENT_DURATION + difference;

		seasonalCandlesSoFar += extraSeasonalCandles;
		seasonalCandlesSoFarWithSeasonPass += extraSeasonalCandles;
	}

	// Calculate the amount of seasonal candles left.
	return {
		seasonalCandlesLeft: seasonalCandlesTotal - seasonalCandlesSoFar,
		seasonalCandlesLeftWithSeasonPass:
			seasonalCandlesTotalWithSeasonPass - seasonalCandlesSoFarWithSeasonPass,
	};
}

export function resolveSeasonalCandlesRotation(date: DateTime) {
	return SEASONAL_CANDLES_ROTATION[date.diff(SEASON_START, "days").days % 10] ?? null;
}

export function seasonalCandlesRotationURL(
	realm: Exclude<RealmName, RealmName.IslesOfDawn | RealmName.EyeOfEden>,
	rotation: RotationNumber,
) {
	return String(
		new URL(
			`daily_guides/seasonal_candles/season_of_moomin/${REALM_NAME_TO_REALM_CDN_NAME[realm]}/rotation_${rotation}.webp`,
			CDN_URL,
		),
	);
}

function formatHuggingGIF(index: number) {
	return String(new URL(`hugs/${index}.gif`, CDN_URL));
}

export function huggingGIF() {
	return formatHuggingGIF(getRandomElement(HUGGING_GIFS)!);
}

export function huggingGIFs3Unique() {
	const huggingGIFs = new Set<string>();

	while (huggingGIFs.size < 3) {
		huggingGIFs.add(formatHuggingGIF(getRandomElement(HUGGING_GIFS)!));
	}

	return [...huggingGIFs];
}

export function krillingGIF() {
	return String(new URL(`krills/${Math.floor(Math.random() * MAXIMUM_KRILL_NO + 1)}.gif`, CDN_URL));
}

export function krillingGIFs3Unique() {
	const krillingGIFs = new Set<string>();

	while (krillingGIFs.size < 3) {
		krillingGIFs.add(krillingGIF());
	}

	return [...krillingGIFs];
}
