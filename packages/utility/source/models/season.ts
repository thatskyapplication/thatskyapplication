import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import type { Cosmetic } from "../cosmetics.js";
import type { AreaName, RealmName } from "../kingdom/geography.js";
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
import type { Area } from "./area.js";
import type { Realm } from "./realm.js";
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

	public readonly allSpirits: ReadonlyCollection<SpiritIds, GuideSpirit | SeasonalSpirit>;

	public areas: ReadonlyCollection<AreaName, Area> = new Collection<AreaName, Area>();

	public realms: ReadonlyCollection<RealmName, Realm> = new Collection<RealmName, Realm>();

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
		this.allSpirits = data.spirits.reduce(
			(spirits, spirit) => spirits.set(spirit.id, spirit),
			new Collection<SpiritIds, GuideSpirit | SeasonalSpirit>().set(data.guide.id, data.guide),
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
		const remainingDays = Math.ceil(this.end.diff(date, "days").days);

		const remainingDoubleSeasonalLightDays =
			this.doubleSeasonalLight?.reduce((total, { start, end }) => {
				if (date >= end) {
					return total;
				}

				const remainingStart = date > start ? date : start;
				return total + Math.ceil(end.diff(remainingStart, "days").days);
			}, 0) ?? 0;

		return {
			seasonalCandlesLeft:
				remainingDays * SEASONAL_CANDLES_PER_DAY + remainingDoubleSeasonalLightDays,
			seasonalCandlesLeftWithSeasonPass:
				remainingDays * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS +
				remainingDoubleSeasonalLightDays,
		};
	}

	public isDuringDoubleSeasonalLightEvent(date: DateTime) {
		return this.doubleSeasonalLight?.some(({ start, end }) => date >= start && date < end) ?? false;
	}

	public seasonalCandles(date: DateTime) {
		if (this.seasonalCandlesRotation === null) {
			return null;
		}

		const { rotation, realm } =
			this.seasonalCandlesRotation(date)[date.diff(this.start, "days").days % 10]!;

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
