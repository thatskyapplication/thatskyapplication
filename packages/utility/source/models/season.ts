import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import type { Cosmetic } from "../cosmetics.js";
import type { RealmName } from "../kingdom.js";
import { CDN_URL } from "../routes.js";
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
import type { ItemRawWithoutChildren, ItemWithoutChildren, SpiritIds } from "../utility/spirits.js";
import type { GuideSpirit, SeasonalSpirit } from "./spirits.js";

type SeasonalCandlesRotation = Readonly<
	{ rotation: Exclude<RotationIdentifier, RotationIdentifier.Double>; realm: RealmName }[]
>;

/**
 * Data that describes a double seasonal light event.
 */
export interface DoubleSeasonalLightDate {
	/**
	 * The start date of double seasonal light event.
	 */
	start: DateTime;
	/**
	 * The end date of double seasonal light event.
	 *
	 * @remarks The end date is exclusive.
	 */
	end: DateTime;
}

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
	items?: readonly ItemRawWithoutChildren[];
	/**
	 * The seasonal candles rotation.
	 */
	seasonalCandlesRotation?:
		| SeasonalCandlesRotation
		| ((now: DateTime) => SeasonalCandlesRotation)
		| null;
	/**
	 * Double seasonal light dates.
	 */
	doubleSeasonalLight?: readonly DoubleSeasonalLightDate[];
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

	public readonly items: readonly ItemWithoutChildren[];

	public readonly allCosmetics: readonly Cosmetic[];

	private readonly seasonalCandlesRotation: ((now: DateTime) => SeasonalCandlesRotation) | null;

	public readonly doubleSeasonalLight: readonly DoubleSeasonalLightDate[] | null;

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

		this.doubleSeasonalLight = data.doubleSeasonalLight ?? null;
		this.patchNotesURL = data.patchNotesURL ?? null;
	}

	public remainingSeasonalCandles(date: DateTime) {
		const { start, end } = this;
		const duration = Math.ceil(end.diff(start, "days").days);

		const doubleSeasonalLightDuration =
			this.doubleSeasonalLight?.reduce(
				(total, { start, end }) => total + Math.ceil(end.diff(start, "days").days),
				0,
			) ?? 0;

		// Calculate the total amount of seasonal candles.
		const seasonalCandlesTotal = duration * SEASONAL_CANDLES_PER_DAY + doubleSeasonalLightDuration;

		const seasonalCandlesTotalWithSeasonPass =
			duration * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS +
			SEASON_PASS_SEASONAL_CANDLES_BONUS +
			doubleSeasonalLightDuration;

		// Calculate the amount of seasonal candles so far.
		const daysSoFar = date.diff(start, "days").days + 1;
		let seasonalCandlesSoFar = daysSoFar * SEASONAL_CANDLES_PER_DAY;

		let seasonalCandlesSoFarWithSeasonPass =
			daysSoFar * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

		for (const { start: doubleSeasonalLightStart, end: doubleSeasonalLightEnd } of this
			.doubleSeasonalLight ?? []) {
			if (date.diff(doubleSeasonalLightStart, "days").days < 0) {
				continue;
			}

			const difference = date.diff(doubleSeasonalLightStart, "days").days;

			const duration = Math.ceil(
				doubleSeasonalLightEnd.diff(doubleSeasonalLightStart, "days").days,
			);

			const extraSeasonalCandles =
				// The difference will be a negative number if the event is still ongoing.
				difference > 0 ? duration : duration + difference;

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

	public isDuringDoubleSeasonalLightEvent(date: DateTime) {
		return this.doubleSeasonalLight?.some(({ start, end }) => date >= start && date < end) ?? false;
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
