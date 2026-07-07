import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { Cosmetic } from "../cosmetics.js";
import { isActive, skyDate } from "../dates.js";
import { realmForArea } from "../kingdom/areas/index.js";
import type { AreaName, RealmName } from "../kingdom/geography.js";
import { CDN_URL } from "../routes.js";
import type { SeasonIds } from "../season.js";
import {
	type CostEntry,
	resolveAllCosmetics,
	resolveOffer,
	sumCosts,
} from "../utility/functions.js";
import {
	type FriendAction,
	type FriendshipTree,
	friendshipTreeToItems,
	type ItemCost,
	type ItemRawWithoutChildren,
	type ItemRawWithPossibleChildren,
	type LegacyFriendshipTree,
	type SpiritEmote,
	type SpiritIds,
	SpiritType,
} from "../utility/spirits.js";

interface TravellingSpiritsDates {
	readonly start: Temporal.ZonedDateTime;
	readonly end: Temporal.ZonedDateTime;
}

interface ReturningDatesData {
	readonly start: Temporal.ZonedDateTime;
	readonly end: Temporal.ZonedDateTime;
}

const TRAVELLING_ERROR_DATES = new Collection<number, Temporal.ZonedDateTime>()
	.set(1, skyDate(2_020, 5, 28))
	.set(2, skyDate(2_021, 2, 4))
	.set(3, skyDate(2_022, 1, 6))
	.set(4, skyDate(2_023, 4, 13));

const RETURNING_DATES = new Collection<number, ReturningDatesData>()
	.set(1, { start: skyDate(2_023, 3, 6), end: skyDate(2_023, 3, 20) })
	.set(2, { start: skyDate(2_023, 5, 15), end: skyDate(2_023, 5, 22) })
	.set(3, { start: skyDate(2_023, 7, 3), end: skyDate(2_023, 7, 17) })
	.set(4, { start: skyDate(2_023, 8, 7), end: skyDate(2_023, 8, 14) })
	.set(5, { start: skyDate(2_024, 3, 4), end: skyDate(2_024, 3, 18) })
	.set(6, { start: skyDate(2_024, 9, 16), end: skyDate(2_024, 9, 30) })
	.set(7, { start: skyDate(2_025, 1, 13), end: skyDate(2_025, 1, 27) })
	.set(8, { start: skyDate(2_025, 4, 7), end: skyDate(2_025, 4, 21) })
	.set(9, { start: skyDate(2_025, 6, 9), end: skyDate(2_025, 6, 23) })
	.set(10, { start: skyDate(2_025, 8, 18), end: skyDate(2_025, 9, 1) })
	.set(11, { start: skyDate(2_025, 11, 17), end: skyDate(2_025, 12, 1) })
	.set(12, { start: skyDate(2026, 2, 27), end: skyDate(2026, 3, 13) })
	.set(13, { start: skyDate(2026, 6, 19), end: skyDate(2026, 7, 3) });

export type LegacyFriendshipTreeRaw = readonly (
	| readonly [ItemRawWithoutChildren]
	| readonly [ItemRawWithoutChildren, ItemRawWithPossibleChildren]
	| readonly [
			ItemRawWithoutChildren,
			ItemRawWithPossibleChildren | null,
			ItemRawWithPossibleChildren,
	  ]
)[];

export type FriendshipTreeRaw = readonly (readonly [
	ItemRawWithoutChildren | null,
	(ItemRawWithoutChildren | null)?,
	(ItemRawWithoutChildren | null)?,
])[];

interface BaseFriendshipTreeOfferData {
	hasInfographic?: boolean;
	current?: FriendshipTreeRaw | LegacyFriendshipTreeRaw;
}

interface StandardFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	current: LegacyFriendshipTreeRaw;
}

interface ElderFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	current: LegacyFriendshipTreeRaw;
}

interface SeasonalFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	hasInfographicSeasonal?: boolean;
	seasonal: FriendshipTreeRaw | LegacyFriendshipTreeRaw;
}

interface GuideFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	inProgress?: boolean;
}

interface BaseSpiritData {
	id: SpiritIds;
	area?: AreaName;
	realm?: RealmName;
	keywords?: readonly string[];
	offer?:
		| StandardFriendshipTreeOfferData
		| ElderFriendshipTreeOfferData
		| SeasonalFriendshipTreeOfferData
		| GuideFriendshipTreeOfferData;
	emote?: SpiritEmote;
	stance?: Cosmetic;
	call?: Cosmetic;
	action?: FriendAction;
}

interface StandardSpiritData extends Omit<BaseSpiritData, "realm"> {
	area: AreaName;
	offer: StandardFriendshipTreeOfferData;
}

interface ElderSpiritData extends BaseSpiritData {
	area: AreaName;
	realm: RealmName;
	offer?: ElderFriendshipTreeOfferData;
}

export type SeasonalSpiritVisitTravellingErrorData = ReadonlyCollection<
	number,
	Temporal.ZonedDateTime
>;
export type SeasonalSpiritVisitReturningData = ReadonlyCollection<number, ReturningDatesData>;

interface SeasonalSpiritVisitData {
	travelling?: readonly TravellingSpiritsDates[];
	travellingErrors?: readonly number[];
	returning?: readonly number[];
}

interface SeasonalSpiritVisit {
	travelling: readonly TravellingSpiritsDates[];
	travellingErrors: SeasonalSpiritVisitTravellingErrorData;
	returning: SeasonalSpiritVisitReturningData;
}

interface SeasonalSpiritData extends Omit<BaseSpiritData, "realm"> {
	area: AreaName;
	offer: SeasonalFriendshipTreeOfferData;
	seasonId: SeasonIds;
	hasMarketingVideo?: boolean;
	visits?: SeasonalSpiritVisitData;
}

interface GuideSpiritData extends Omit<BaseSpiritData, "realm"> {
	offer?: GuideFriendshipTreeOfferData;
	seasonId: SeasonIds;
}

function friendshipTreeCosts(
	friendshipTree: FriendshipTree | LegacyFriendshipTree,
): readonly ItemCost[] {
	return friendshipTreeToItems(friendshipTree).flatMap((item) => (item.cost ? [item.cost] : []));
}

function resolveVisitPeriods<T>(
	spiritId: SpiritIds,
	indices: readonly number[] | undefined,
	periods: ReadonlyCollection<number, T>,
	label: string,
): ReadonlyCollection<number, T> {
	const resolved = new Collection<number, T>();

	for (const index of indices ?? []) {
		const period = periods.get(index);

		if (!period) {
			throw new Error(
				`${spiritId} had a ${label} index of ${index}, but there was no date for it.`,
			);
		}

		resolved.set(index, period);
	}

	return resolved;
}

abstract class BaseSpirit<Data extends BaseSpiritData> {
	public readonly id: SpiritIds;

	public abstract readonly type: SpiritType;

	public readonly area: AreaName | null;

	public readonly realm: RealmName | null;

	public readonly keywords: NonNullable<BaseSpiritData["keywords"]>;

	public readonly current: FriendshipTree | LegacyFriendshipTree;

	public readonly displayFriendshipTree: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCost: readonly CostEntry[];

	public readonly allCosmetics: readonly Cosmetic[];

	public readonly imageURL: string | null;

	public readonly emote: SpiritEmote | null;

	public readonly stance: Cosmetic | null;

	public readonly call: Cosmetic | null;

	public readonly action: FriendAction | null;

	public constructor(data: Data) {
		this.id = data.id;
		this.area = data.area ?? null;
		this.realm = data.realm ?? (this.area === null ? null : realmForArea(this.area));
		this.keywords = data.keywords ?? [];
		this.current = data.offer?.current ? resolveOffer(data.offer.current) : [];
		this.displayFriendshipTree = this.current;
		this.totalCost = sumCosts(friendshipTreeCosts(this.current));
		this.allCosmetics = data.offer?.current ? resolveAllCosmetics(this.current) : [];

		this.imageURL = (data.offer ? (data.offer.hasInfographic ?? true) : false)
			? this.resolveImageURL()
			: null;

		this.emote = data.emote ?? null;
		this.stance = data.stance ?? null;
		this.call = data.call ?? null;
		this.action = data.action ?? null;
	}

	protected resolveImageURL(seasonal = false) {
		return String(
			new URL(
				`spirits/${this.id}/friendship_tree/${seasonal ? "seasonal" : "current"}.webp`,
				CDN_URL,
			),
		);
	}

	public isStandardSpirit(): this is StandardSpirit {
		return this.type === SpiritType.Standard;
	}

	public isElderSpirit(): this is ElderSpirit {
		return this.type === SpiritType.Elder;
	}

	public isSeasonalSpirit(): this is SeasonalSpirit {
		return this.type === SpiritType.Seasonal;
	}

	public isGuideSpirit(): this is GuideSpirit {
		return this.type === SpiritType.Guide;
	}
}

export class StandardSpirit extends BaseSpirit<StandardSpiritData> {
	public override readonly type = SpiritType.Standard;

	public declare readonly area: AreaName;

	public declare readonly realm: RealmName;
}

export class ElderSpirit extends BaseSpirit<ElderSpiritData> {
	public override readonly type = SpiritType.Elder;

	public declare readonly area: AreaName;

	public declare readonly realm: RealmName;
}

export class SeasonalSpirit extends BaseSpirit<SeasonalSpiritData> {
	public override readonly type = SpiritType.Seasonal;

	public declare readonly area: AreaName;

	public override readonly allCosmetics: readonly Cosmetic[];

	public readonly seasonal: FriendshipTree | LegacyFriendshipTree;

	public override readonly displayFriendshipTree: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCostSeasonal: readonly CostEntry[];

	public readonly imageURLSeasonal: string | null;

	public readonly seasonId: SeasonIds;

	public readonly marketingVideoURL: string | null;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);

		this.seasonal = resolveOffer(spirit.offer.seasonal, { seasonId: spirit.seasonId });
		this.displayFriendshipTree = this.current.length > 0 ? this.current : this.seasonal;
		this.allCosmetics = resolveAllCosmetics(this.displayFriendshipTree);
		this.totalCostSeasonal = sumCosts(friendshipTreeCosts(this.seasonal));

		this.imageURLSeasonal =
			(spirit.offer.hasInfographicSeasonal ?? true) ? this.resolveImageURL(true) : null;

		this.seasonId = spirit.seasonId;

		this.marketingVideoURL = spirit.hasMarketingVideo
			? String(new URL(`spirits/${this.id}/marketing_video.mp4`, CDN_URL))
			: null;

		this.visits = {
			travelling: spirit.visits?.travelling ?? [],
			travellingErrors: resolveVisitPeriods(
				this.id,
				spirit.visits?.travellingErrors,
				TRAVELLING_ERROR_DATES,
				"travelling error",
			),
			returning: resolveVisitPeriods(
				this.id,
				spirit.visits?.returning,
				RETURNING_DATES,
				"returning",
			),
		};
	}

	public visit(date: Temporal.ZonedDateTime) {
		const { travelling, returning } = this.visits;
		const firstTravelling = travelling[0];
		const firstReturning = returning.first();

		return {
			visited: Boolean(
				(firstTravelling && Temporal.ZonedDateTime.compare(firstTravelling.start, date) <= 0) ||
					(firstReturning && Temporal.ZonedDateTime.compare(firstReturning.start, date) <= 0),
			),
			current: {
				travelling: travelling.some(({ start, end }) => isActive(start, end, date)),
				returning: returning.some(({ start, end }) => isActive(start, end, date)),
			},
		};
	}
}

export class GuideSpirit extends BaseSpirit<GuideSpiritData> {
	public override readonly type = SpiritType.Guide;

	public override readonly current: FriendshipTree | LegacyFriendshipTree;

	public override readonly displayFriendshipTree: FriendshipTree | LegacyFriendshipTree;

	public override readonly totalCost: readonly CostEntry[];

	public readonly inProgress: boolean;

	public readonly seasonId: SeasonIds;

	public constructor(spirit: GuideSpiritData) {
		super(spirit);

		this.current = spirit.offer?.current
			? resolveOffer(spirit.offer.current, { seasonId: spirit.seasonId })
			: [];

		this.displayFriendshipTree = this.current;
		this.totalCost = sumCosts(friendshipTreeCosts(this.current));
		this.inProgress = spirit.offer?.inProgress ?? false;
		this.seasonId = spirit.seasonId;
	}
}

export type Spirit = StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit;
