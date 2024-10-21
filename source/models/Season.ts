import { URL } from "node:url";
import { Locale } from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import type { GuideSpirit, SeasonalSpirit } from "../models/Spirits.js";
import {
	type Item,
	type ItemRaw,
	type RotationNumber,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
	type SeasonIds,
	resolveAllCosmetics,
	resolveOffer,
	snakeCaseName,
	wikiURL,
} from "../utility/catalogue.js";
import { CDN_URL, type RealmName } from "../utility/constants-2.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_DURATION,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
} from "../utility/dates.js";
import type { SeasonEmojis } from "../utility/emojis.js";

type SeasonalCandlesRotation = Readonly<
	{ rotation: Exclude<RotationNumber, 3>; realm: RealmName }[]
>;

/**
 * Data to create a season.
 */
interface SeasonData {
	/**
	 * The id of the season.
	 */
	id: SeasonIds;
	/**
	 * The start date of the season.
	 */
	start: DateTime;
	/**
	 * The end date of the season.
	 *
	 * @remarks The end date is exclusive.
	 */
	end: DateTime;
	/**
	 * The guide spirit of the season.
	 */
	guide: GuideSpirit;
	/**
	 * The spirits of the season.
	 */
	spirits: readonly SeasonalSpirit[];
	/**
	 * The items that came with the season.
	 *
	 * @remarks When cosmetics are not tied to any entity, they should be stored here.
	 */
	items?: readonly ItemRaw[];
	/**
	 * The seasonal candles rotation.
	 */
	seasonalCandlesRotation: SeasonalCandlesRotation | null;
	/**
	 * The URL of the patch notes that detail the season.
	 */
	patchNotesURL?: string;
}

export class Season {
	public readonly id: SeasonIds;

	private readonly snakeCaseName: string;

	public readonly wikiURL: string;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly guide: GuideSpirit;

	public readonly spirits: readonly SeasonalSpirit[];

	public readonly items: Item[];

	public readonly allCosmetics: number[];

	public readonly emoji: SeasonEmojis;

	public readonly candleEmoji: SeasonEmojis;

	private readonly seasonalCandlesRotation: SeasonalCandlesRotation | null;

	public readonly patchNotesURL: string | null;

	public constructor(data: SeasonData) {
		this.id = data.id;
		const seasonName = t(`seasons.${data.id}`, { lng: Locale.EnglishGB, ns: "general" });
		this.snakeCaseName = snakeCaseName(seasonName);
		this.wikiURL = wikiURL(seasonName);
		this.start = data.start;
		this.end = data.end;
		this.guide = data.guide;
		this.spirits = data.spirits;
		this.items = data.items ? resolveOffer(data.items) : [];
		this.allCosmetics = data.items ? resolveAllCosmetics(this.items) : [];
		this.emoji = SeasonIdToSeasonalEmoji[data.id];
		this.candleEmoji = SeasonIdToSeasonalCandleEmoji[data.id];
		this.seasonalCandlesRotation = data.seasonalCandlesRotation;
		this.patchNotesURL = data.patchNotesURL ?? null;
	}

	public daysText(date: DateTime, locale: Locale) {
		const { end, start } = this;
		const daysLeft = end.diff(date, "days").days;
		const daysUntilStart = start.diff(date, "days").days;

		if (daysLeft <= 0) {
			return daysLeft === 0
				? `The season ended ${Math.abs(daysLeft)} day ago.`
				: `The season ended ${Math.abs(daysLeft)} days ago.`;
		}

		if (daysUntilStart > 0) {
			return daysUntilStart < 1
				? "The new season starts today."
				: daysUntilStart >= 2
					? `The new season starts in ${Math.floor(daysUntilStart)} days.`
					: "The new season starts tomorrow.";
		}

		return t("days-left.season", { lng: locale, ns: "general", count: Math.ceil(daysLeft) - 1 });
	}

	public remainingSeasonalCandles(date: DateTime) {
		const { end, start } = this;
		const duration = Math.ceil(this.end.diff(this.start, "days").days);

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

	public resolveSeasonalCandlesRotation(date: DateTime) {
		return this.seasonalCandlesRotation?.[date.diff(this.start, "days").days % 10] ?? null;
	}

	public seasonalCandlesRotationURL(realm: RealmName, rotation: RotationNumber) {
		return String(
			new URL(
				`daily_guides/seasonal_candles/${this.snakeCaseName}/${snakeCaseName(realm)}/rotation_${rotation}.webp`,
				CDN_URL,
			),
		);
	}
}
