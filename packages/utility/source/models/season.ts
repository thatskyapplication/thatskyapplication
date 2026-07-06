import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { Cosmetic } from "../cosmetics.js";
import { isActive } from "../dates.js";
import type { RealmName } from "../kingdom/geography.js";
import { CDN_URL } from "../routes.js";
import {
	RotationIdentifier,
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
	start: Temporal.ZonedDateTime;
	/**
	 * The end date of double seasonal light event.
	 *
	 * @remarks The end date is exclusive.
	 */
	end: Temporal.ZonedDateTime;
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
	start: Temporal.ZonedDateTime;
	/**
	 * The end date of the season.
	 *
	 * @remarks The end date is exclusive.
	 */
	end: Temporal.ZonedDateTime;
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
		| ((now: Temporal.ZonedDateTime) => SeasonalCandlesRotation)
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

	public readonly start: Temporal.ZonedDateTime;

	public readonly end: Temporal.ZonedDateTime;

	public readonly guide: GuideSpirit;

	public readonly spirits: ReadonlyCollection<SpiritIds, SeasonalSpirit>;

	public readonly spiritsWithGuide: ReadonlyCollection<SpiritIds, GuideSpirit | SeasonalSpirit>;

	public readonly items: readonly ItemWithoutChildren[];

	public readonly allCosmetics: readonly Cosmetic[];

	private readonly seasonalCandlesRotation:
		| ((now: Temporal.ZonedDateTime) => SeasonalCandlesRotation)
		| null;

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

		this.spiritsWithGuide = new Collection<SpiritIds, GuideSpirit | SeasonalSpirit>([
			[this.guide.id, this.guide],
		]).concat(this.spirits);

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

	public remainingSeasonalCandles(date: Temporal.ZonedDateTime) {
		const remainingDays = Math.ceil(this.end.since(date).total({ unit: "days", relativeTo: date }));

		const remainingDoubleSeasonalLightDays =
			this.doubleSeasonalLight?.reduce((total, { start, end }) => {
				if (Temporal.ZonedDateTime.compare(date, end) >= 0) {
					return total;
				}

				const remainingStart = Temporal.ZonedDateTime.compare(date, start) > 0 ? date : start;

				return (
					total +
					Math.ceil(end.since(remainingStart).total({ unit: "days", relativeTo: remainingStart }))
				);
			}, 0) ?? 0;

		return {
			seasonalCandlesLeft:
				remainingDays * SEASONAL_CANDLES_PER_DAY + remainingDoubleSeasonalLightDays,
			seasonalCandlesLeftWithSeasonPass:
				remainingDays * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS +
				remainingDoubleSeasonalLightDays,
		};
	}

	public isDuringDoubleSeasonalLightEvent(date: Temporal.ZonedDateTime) {
		return this.doubleSeasonalLight?.some(({ start, end }) => isActive(start, end, date)) ?? false;
	}

	public seasonalCandles(date: Temporal.ZonedDateTime) {
		if (this.seasonalCandlesRotation === null) {
			return null;
		}

		const { rotation, realm } =
			this.seasonalCandlesRotation(date)[
				date.since(this.start).total({ unit: "days", relativeTo: this.start }) % 10
			]!;

		if (this.isDuringDoubleSeasonalLightEvent(date)) {
			return this.seasonalCandlesRotationURL(realm, RotationIdentifier.Double);
		}

		return this.seasonalCandlesRotationURL(realm, rotation);
	}

	private seasonalCandlesRotationURL(realm: RealmName, identifier: RotationIdentifier) {
		return String(
			new URL(
				`daily_guides/seasonal_candles/${this.id}/${snakeCaseName(realm)}/${identifier}.webp`,
				CDN_URL,
			),
		);
	}
}
