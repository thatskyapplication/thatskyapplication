import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import { CDN_URL } from "../cdn.js";
import type { Cosmetic } from "../cosmetics.js";
import type { RealmName } from "../kingdom.js";
import {
	type RotationIdentifier,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	type SeasonIds,
} from "../season.js";
import {
	resolveAllCosmeticsFromItems,
	resolveOfferFromItems,
	snakeCaseName,
} from "../utility/functions.js";
import type { Item, ItemRaw, SpiritIds } from "../utility/spirits.js";
import type { GuideSpirit, SeasonalSpirit } from "./spirits.js";

type SeasonalCandlesRotation = Readonly<
	{ rotation: Exclude<RotationIdentifier, RotationIdentifier.Double>; realm: RealmName }[]
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
	seasonalCandlesRotation?:
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

	public readonly spirits: ReadonlyCollection<SpiritIds, SeasonalSpirit>;

	public readonly items: readonly Item[];

	public readonly allCosmetics: readonly Cosmetic[];

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

		this.spirits = data.spirits.reduce(
			(spirits, spirit) => spirits.set(spirit.id, spirit),
			new Collection<SpiritIds, SeasonalSpirit>(),
		);

		this.items = data.items ? resolveOfferFromItems(data.items, { seasonId: data.id }) : [];
		this.allCosmetics = resolveAllCosmeticsFromItems(this.items);

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

	public remainingSeasonalCandles(date: DateTime) {
		const {
			start,
			end,
			doubleSeasonalLightEventStartDate,
			doubleSeasonalLightEventEndDate,
			doubleSeasonalLightEventDaysDuration,
		} = this;
		const duration = Math.ceil(end.diff(this.start, "days").days);

		const seasonalDoubleLightEvent =
			doubleSeasonalLightEventStartDate &&
			doubleSeasonalLightEventEndDate &&
			doubleSeasonalLightEventDaysDuration;

		// Calculate the total amount of seasonal candles.
		let seasonalCandlesTotal = duration * SEASONAL_CANDLES_PER_DAY;

		let seasonalCandlesTotalWithSeasonPass =
			duration * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

		if (seasonalDoubleLightEvent) {
			seasonalCandlesTotal += doubleSeasonalLightEventDaysDuration;
			seasonalCandlesTotalWithSeasonPass += doubleSeasonalLightEventDaysDuration;
		}

		// Calculate the amount of seasonal candles so far.
		const daysSoFar = date.diff(start, "days").days + 1;
		let seasonalCandlesSoFar = daysSoFar * SEASONAL_CANDLES_PER_DAY;

		let seasonalCandlesSoFarWithSeasonPass =
			daysSoFar * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

		if (
			seasonalDoubleLightEvent &&
			date.diff(doubleSeasonalLightEventStartDate, "days").days >= 0
		) {
			const difference = date.diff(doubleSeasonalLightEventEndDate, "days").days;

			const extraSeasonalCandles =
				// The difference will be a negative number if the event is still ongoing.
				difference > 0
					? doubleSeasonalLightEventDaysDuration
					: doubleSeasonalLightEventDaysDuration + difference;

			seasonalCandlesSoFar += extraSeasonalCandles!;
			seasonalCandlesSoFarWithSeasonPass += extraSeasonalCandles!;
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

	public seasonalCandlesRotationURL(realm: RealmName, identifier: RotationIdentifier) {
		return String(
			new URL(
				`daily_guides/seasonal_candles/${this.id}/${snakeCaseName(realm)}/${identifier}.webp`,
				CDN_URL,
			),
		);
	}
}
