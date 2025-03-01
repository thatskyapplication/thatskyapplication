import { URL } from "node:url";
import type { Locale } from "@discordjs/core";
import {
	type Emoji,
	type Item,
	type ItemRaw,
	type RealmName,
	type SeasonIds,
	resolveAllCosmetics,
	resolveOffer,
	snakeCaseName,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import type { GuideSpirit, SeasonalSpirit } from "../models/Spirits.js";
import {
	type RotationNumber,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "../utility/catalogue.js";
import { CDN_URL } from "../utility/constants.js";

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
	seasonalCandlesRotation:
		| SeasonalCandlesRotation
		| ((now: DateTime) => SeasonalCandlesRotation)
		| null;
	/**
	 * The start date of double seasonal light event.
	 */
	doubleSeasonalLightEventStartDate?: DateTime;
	/**
	 * The end date of double seasonal light event.
	 *
	 * @remarks The end date is exclusive.
	 */
	doubleSeasonalLightEventEndDate?: DateTime;
	/**
	 * The URL of the patch notes that detail the season.
	 */
	patchNotesURL?: string;
}

export class Season {
	public readonly id: SeasonIds;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly guide: GuideSpirit;

	public readonly spirits: readonly SeasonalSpirit[];

	public readonly items: Item[];

	public readonly allCosmetics: number[];

	public readonly emoji: Emoji;

	public readonly candleEmoji: Emoji;

	private readonly seasonalCandlesRotation: ((now: DateTime) => SeasonalCandlesRotation) | null;

	public readonly doubleSeasonalLightEventStartDate: DateTime | null;

	public readonly doubleSeasonalLightEventEndDate: DateTime | null;

	public readonly doubleSeasonalLightEventDaysDuration: number | null;

	public readonly patchNotesURL: string | null;

	public constructor(data: SeasonData) {
		this.id = data.id;
		this.start = data.start;
		this.end = data.end;
		this.guide = data.guide;
		this.spirits = data.spirits;
		this.items = data.items ? resolveOffer(data.items) : [];
		this.allCosmetics = data.items ? resolveAllCosmetics(this.items) : [];
		this.emoji = SeasonIdToSeasonalEmoji[data.id];
		this.candleEmoji = SeasonIdToSeasonalCandleEmoji[data.id];

		this.seasonalCandlesRotation =
			typeof data.seasonalCandlesRotation === "function"
				? data.seasonalCandlesRotation
				: data.seasonalCandlesRotation
					? () => data.seasonalCandlesRotation as SeasonalCandlesRotation
					: null;

		this.doubleSeasonalLightEventStartDate = data.doubleSeasonalLightEventStartDate ?? null;
		this.doubleSeasonalLightEventEndDate = data.doubleSeasonalLightEventEndDate ?? null;

		this.doubleSeasonalLightEventDaysDuration =
			this.doubleSeasonalLightEventStartDate && this.doubleSeasonalLightEventEndDate
				? this.doubleSeasonalLightEventEndDate.diff(this.doubleSeasonalLightEventStartDate, "days")
						.days + 1
				: null;

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
				? "The new season starts tomorrow."
				: daysUntilStart >= 2
					? `The new season starts in ${Math.floor(daysUntilStart)} days.`
					: daysUntilStart <= 1
						? "The new season starts tomorrow."
						: "The new season starts in 1 day.";
		}

		return t("days-left.season", { lng: locale, ns: "general", count: Math.ceil(daysLeft) - 1 });
	}

	public remainingSeasonalCandles(date: DateTime) {
		const { start, end } = this;
		const duration = Math.ceil(end.diff(this.start, "days").days);
		const isDuringDoubleSeasonalLightEvent = this.isDuringDoubleSeasonalLightEvent(date);

		// Calculate the total amount of seasonal candles.
		let seasonalCandlesTotal = duration * SEASONAL_CANDLES_PER_DAY;

		let seasonalCandlesTotalWithSeasonPass =
			duration * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

		if (isDuringDoubleSeasonalLightEvent) {
			seasonalCandlesTotal += this.doubleSeasonalLightEventDaysDuration;
			seasonalCandlesTotalWithSeasonPass += this.doubleSeasonalLightEventDaysDuration;
		}

		// Calculate the amount of seasonal candles so far.
		const daysSoFar = date.diff(start, "days").days + 1;
		let seasonalCandlesSoFar = daysSoFar * SEASONAL_CANDLES_PER_DAY;

		let seasonalCandlesSoFarWithSeasonPass =
			daysSoFar * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

		if (
			isDuringDoubleSeasonalLightEvent &&
			date.diff(this.doubleSeasonalLightEventStartDate, "days").days >= 0
		) {
			const difference = date.diff(this.doubleSeasonalLightEventEndDate, "days").days;

			const extraSeasonalCandles =
				// The difference will be a negative number if the event is still ongoing.
				difference > 0
					? this.doubleSeasonalLightEventDaysDuration
					: this.doubleSeasonalLightEventDaysDuration + difference;

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

	public isDuringDoubleSeasonalLightEvent(date: DateTime): this is Season & {
		doubleSeasonalLightEventStartDate: NonNullable<Season["doubleSeasonalLightEventStartDate"]>;
		doubleSeasonalLightEventEndDate: NonNullable<Season["doubleSeasonalLightEventEndDate"]>;
		doubleSeasonalLightEventDaysDuration: NonNullable<
			Season["doubleSeasonalLightEventDaysDuration"]
		>;
	} {
		const { doubleSeasonalLightEventStartDate, doubleSeasonalLightEventEndDate } = this;

		return Boolean(
			doubleSeasonalLightEventStartDate &&
				doubleSeasonalLightEventEndDate &&
				date >= doubleSeasonalLightEventStartDate &&
				date < doubleSeasonalLightEventEndDate,
		);
	}

	public resolveSeasonalCandlesRotation(date: DateTime) {
		return this.seasonalCandlesRotation?.(date)[date.diff(this.start, "days").days % 10] ?? null;
	}

	public seasonalCandlesRotationURL(realm: RealmName, rotation: RotationNumber) {
		return String(
			new URL(
				`daily_guides/seasonal_candles/${this.id}/${snakeCaseName(realm)}/rotation_${rotation}.webp`,
				CDN_URL,
			),
		);
	}
}
