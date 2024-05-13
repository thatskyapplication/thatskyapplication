import { URL } from "node:url";
import type { Locale } from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { type RealmName, CDN_URL } from "../Utility/Constants.js";
import {
	type RotationNumber,
	type SeasonName,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
	SeasonNameToSeasonalCandleEmoji,
	SeasonNameToSeasonalEmoji,
} from "../Utility/catalogue.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_DURATION,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
} from "../Utility/dates.js";
import type { SeasonEmojis } from "../Utility/emojis.js";
import type { GuideSpirit, SeasonalSpirit } from "./Spirits.js";

type SeasonalCandlesRotation = Readonly<{ rotation: Exclude<RotationNumber, 3>; realm: RealmName }[]>;

interface SeasonData {
	name: SeasonName;
	start: DateTime;
	end: DateTime;
	guide: GuideSpirit;
	spirits: readonly SeasonalSpirit[];
	seasonalCandlesRotation: SeasonalCandlesRotation | null;
}

export class Season {
	public readonly name: SeasonName;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly duration: number;

	public readonly guide: GuideSpirit;

	public readonly spirits: readonly SeasonalSpirit[];

	public readonly emoji: SeasonEmojis;

	public readonly candleEmoji: SeasonEmojis;

	private readonly seasonalCandlesRotation: SeasonalCandlesRotation | null;

	public constructor(data: SeasonData) {
		this.name = data.name;
		this.start = data.start;
		this.end = data.end;
		this.duration = this.end.diff(this.start, "days").days + 1;
		this.guide = data.guide;
		this.spirits = data.spirits;
		this.emoji = SeasonNameToSeasonalEmoji[this.name];
		this.candleEmoji = SeasonNameToSeasonalCandleEmoji[this.name];
		this.seasonalCandlesRotation = data.seasonalCandlesRotation;
	}

	public daysLeft(date: DateTime, locale: Locale) {
		const daysLeftInSeason = this.end.diff(date, "days").days;
		return t("days-left.season", { lng: locale, ns: "general", count: daysLeftInSeason });
	}

	public remainingSeasonalCandles(date: DateTime) {
		const { end, duration, start } = this;

		const seasonalDoubleLightEvent =
			DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE >= start && DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE <= end;

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

		if (seasonalDoubleLightEvent && date.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days >= 0) {
			const difference = date.diff(DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE, "days").days;

			const extraSeasonalCandles =
				// The difference will be a negative number if the event is still ongoing.
				difference > 0 ? DOUBLE_SEASONAL_LIGHT_EVENT_DURATION : DOUBLE_SEASONAL_LIGHT_EVENT_DURATION + difference;

			seasonalCandlesSoFar += extraSeasonalCandles;
			seasonalCandlesSoFarWithSeasonPass += extraSeasonalCandles;
		}

		// Calculate the amount of seasonal candles left.
		return {
			seasonalCandlesLeft: seasonalCandlesTotal - seasonalCandlesSoFar,
			seasonalCandlesLeftWithSeasonPass: seasonalCandlesTotalWithSeasonPass - seasonalCandlesSoFarWithSeasonPass,
		};
	}

	public resolveSeasonalCandlesRotation(date: DateTime) {
		return this.seasonalCandlesRotation?.[date.diff(this.start, "days").days % 10] ?? null;
	}

	public seasonalCandlesRotationURL(realm: RealmName, rotation: RotationNumber) {
		return String(
			new URL(
				`daily_guides/seasonal_candles/${this.name.toLowerCase().replaceAll(/ |-/g, "_")}/${realm
					.toLowerCase()
					.replaceAll(" ", "_")}/rotation_${rotation}.webp`,
				CDN_URL,
			),
		);
	}
}
