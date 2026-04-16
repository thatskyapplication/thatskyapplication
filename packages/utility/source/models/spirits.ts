import { Collection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import type { Cosmetic } from "../cosmetics.js";
import { skyDate } from "../dates.js";
import type { AreaName } from "../kingdom/geography.js";
import { CDN_URL } from "../routes.js";
import type { SeasonIds } from "../season.js";
import { addCosts, resolveAllCosmetics, resolveOffer } from "../utility/functions.js";
import {
	type FriendAction,
	type FriendshipTree,
	type ItemCost,
	type ItemRawWithoutChildren,
	type ItemRawWithPossibleChildren,
	type LegacyFriendshipTree,
	type SpiritEmote,
	type SpiritIds,
	SpiritType,
} from "../utility/spirits.js";
import type { Area } from "./area.js";
import type { Realm } from "./realm.js";
import type { Season } from "./season.js";

interface TravellingSpiritsDates {
	start: DateTime;
	end: DateTime;
}

interface ReturningDatesData {
	start: DateTime;
	end: DateTime;
}

const TRAVELLING_ERROR_DATES = new Collection<number, DateTime>()
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
	.set(12, { start: skyDate(2026, 2, 27), end: skyDate(2026, 3, 13) });

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

interface BaseFriendshipTreeData {
	id: SpiritIds;
	offer?:
		| StandardFriendshipTreeOfferData
		| ElderFriendshipTreeOfferData
		| SeasonalFriendshipTreeOfferData
		| GuideFriendshipTreeOfferData;
}

interface StandardFriendshipTreeData extends BaseFriendshipTreeData {
	offer: StandardFriendshipTreeOfferData;
}

interface ElderFriendshipTreeData extends BaseFriendshipTreeData {
	offer?: ElderFriendshipTreeOfferData;
}

interface SeasonalFriendshipTreeData extends BaseFriendshipTreeData {
	offer: SeasonalFriendshipTreeOfferData;
	seasonId: SeasonIds;
}

interface GuideFriendshipTreeData extends BaseFriendshipTreeData {
	offer?: GuideFriendshipTreeOfferData;
}

interface ExpressiveSpiritData {
	emote?: SpiritEmote;
	stance?: Cosmetic;
	call?: Cosmetic;
	action?: FriendAction;
}

interface BaseSpiritData {
	id: SpiritIds;
	area?: AreaName;
	keywords?: readonly string[];
}

interface StandardSpiritData
	extends BaseSpiritData,
		StandardFriendshipTreeData,
		ExpressiveSpiritData {
	area: AreaName;
}

interface ElderSpiritData extends BaseSpiritData, ElderFriendshipTreeData {
	area: AreaName;
}

export type SeasonalSpiritVisitTravellingErrorData = Collection<number, DateTime>;
export type SeasonalSpiritVisitReturningData = Collection<number, ReturningDatesData>;

interface SeasonalSpiritVisitData {
	travelling?: TravellingSpiritsDates[];
	travellingErrors?: readonly number[];
	returning?: readonly number[];
}

interface SeasonalSpiritVisit {
	travelling: readonly TravellingSpiritsDates[];
	travellingErrors: SeasonalSpiritVisitTravellingErrorData;
	returning: SeasonalSpiritVisitReturningData;
}

interface SeasonalSpiritData
	extends BaseSpiritData,
		SeasonalFriendshipTreeData,
		ExpressiveSpiritData {
	area: AreaName;
	hasMarketingVideo?: boolean;
	visits?: SeasonalSpiritVisitData;
}

interface GuideSpiritData extends BaseSpiritData, GuideFriendshipTreeData {
	area?: AreaName;
	seasonId: SeasonIds;
}

interface FriendshipTreeState {
	current: FriendshipTree | LegacyFriendshipTree;
	totalCost: Required<ItemCost>;
	allCosmetics: readonly Cosmetic[];
	imageURL: string | null;
}

function friendshipTreeWithCosts(friendshipTree: FriendshipTree | LegacyFriendshipTree) {
	const costs = [];

	for (const items of friendshipTree) {
		for (const item of items) {
			if (item?.cost) {
				costs.push(item.cost);
			}
		}
	}

	return costs;
}

function resolveImageURL(spiritId: SpiritIds, seasonal = false) {
	return String(
		new URL(
			`spirits/${spiritId}/friendship_tree/${seasonal ? "seasonal" : "current"}.webp`,
			CDN_URL,
		),
	);
}

function createFriendshipTreeState(
	{ id, offer }: BaseFriendshipTreeData,
	options: { seasonId?: SeasonIds } = {},
): FriendshipTreeState {
	const current = offer?.current ? resolveOffer(offer.current, options) : [];

	return {
		current,
		totalCost: addCosts(friendshipTreeWithCosts(current)),
		allCosmetics: offer?.current ? resolveAllCosmetics(current) : [],
		imageURL: (offer ? (offer.hasInfographic ?? true) : false) ? resolveImageURL(id) : null,
	};
}

abstract class BaseSpirit {
	public abstract readonly type: SpiritType;

	public readonly id: BaseSpiritData["id"];

	public readonly areaName: AreaName | null;

	public readonly keywords: NonNullable<BaseSpiritData["keywords"]>;

	public constructor(spirit: BaseSpiritData) {
		this.id = spirit.id;
		this.areaName = spirit.area ?? null;
		this.keywords = spirit.keywords ?? [];
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

export class StandardSpirit extends BaseSpirit {
	public override readonly type = SpiritType.Standard;

	public override readonly areaName: AreaName;

	public area!: Area;

	public realm!: Realm;

	public readonly season = null;

	public readonly current: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCost: Required<ItemCost>;

	public readonly allCosmetics: readonly Cosmetic[];

	public readonly imageURL: string | null;

	public readonly emote: SpiritEmote | null;

	public readonly stance: Cosmetic | null;

	public readonly call: Cosmetic | null;

	public readonly action: FriendAction | null;

	public constructor(spirit: StandardSpiritData) {
		super(spirit);
		this.areaName = spirit.area;

		const friendshipTree = createFriendshipTreeState(spirit);

		this.current = friendshipTree.current;
		this.totalCost = friendshipTree.totalCost;
		this.allCosmetics = friendshipTree.allCosmetics;
		this.imageURL = friendshipTree.imageURL;
		this.emote = spirit.emote ?? null;
		this.stance = spirit.stance ?? null;
		this.call = spirit.call ?? null;
		this.action = spirit.action ?? null;
	}
}

export class ElderSpirit extends BaseSpirit {
	public override readonly type = SpiritType.Elder;

	public override readonly areaName: AreaName;

	public area!: Area;

	public realm!: Realm;

	public readonly season = null;

	public readonly current: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCost: Required<ItemCost>;

	public readonly allCosmetics: readonly Cosmetic[];

	public readonly imageURL: string | null;

	public constructor(spirit: ElderSpiritData) {
		super(spirit);
		this.areaName = spirit.area;

		const friendshipTree = createFriendshipTreeState(spirit);

		this.current = friendshipTree.current;
		this.totalCost = friendshipTree.totalCost;
		this.allCosmetics = friendshipTree.allCosmetics;
		this.imageURL = friendshipTree.imageURL;
	}
}

export class SeasonalSpirit extends BaseSpirit {
	public override readonly type = SpiritType.Seasonal;

	public override readonly areaName: AreaName;

	public area!: Area;

	public realm!: Realm | null;

	public season!: Season;

	public readonly seasonId: SeasonIds;

	public readonly current: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCost: Required<ItemCost>;

	public readonly allCosmetics: readonly Cosmetic[];

	public readonly imageURL: string | null;

	public readonly seasonal: FriendshipTree | LegacyFriendshipTree;

	public readonly items: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCostSeasonal: Required<ItemCost>;

	public readonly imageURLSeasonal: string | null;

	public readonly emote: SpiritEmote | null;

	public readonly stance: Cosmetic | null;

	public readonly call: Cosmetic | null;

	public readonly action: FriendAction | null;

	public readonly marketingVideoURL: string | null;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		this.areaName = spirit.area;

		const friendshipTree = createFriendshipTreeState(spirit);
		const seasonal = resolveOffer(spirit.offer.seasonal, { seasonId: spirit.seasonId });
		const items = friendshipTree.current.length > 0 ? friendshipTree.current : seasonal;

		this.seasonId = spirit.seasonId;
		this.current = friendshipTree.current;
		this.totalCost = friendshipTree.totalCost;
		this.allCosmetics = resolveAllCosmetics(items);
		this.imageURL = friendshipTree.imageURL;
		this.seasonal = seasonal;
		this.items = items;
		this.totalCostSeasonal = addCosts(friendshipTreeWithCosts(seasonal));
		this.imageURLSeasonal =
			(spirit.offer.hasInfographicSeasonal ?? true) ? resolveImageURL(spirit.id, true) : null;
		this.emote = spirit.emote ?? null;
		this.stance = spirit.stance ?? null;
		this.call = spirit.call ?? null;
		this.action = spirit.action ?? null;
		this.marketingVideoURL = spirit.hasMarketingVideo
			? String(new URL(`spirits/${this.id}/marketing_video.mp4`, CDN_URL))
			: null;
		this.visits = {
			travelling: spirit.visits?.travelling ?? [],
			travellingErrors:
				spirit.visits?.travellingErrors?.reduce((collection, travellingError) => {
					const period = TRAVELLING_ERROR_DATES.get(travellingError);

					if (!period) {
						throw new Error(
							`${this.id} had an travelling error index of ${travellingError}, but there was no date for it.`,
						);
					}

					return collection.set(travellingError, period);
				}, new Collection<number, DateTime>()) ?? new Collection<number, DateTime>(),
			returning:
				spirit.visits?.returning?.reduce((collection, returning) => {
					const period = RETURNING_DATES.get(returning);

					if (!period) {
						throw new Error(
							`${this.id} had a returning index of ${returning}, but there was no date for it.`,
						);
					}

					return collection.set(returning, period);
				}, new Collection<number, ReturningDatesData>()) ??
				new Collection<number, ReturningDatesData>(),
		};
	}

	public visit(date: DateTime) {
		const { travelling, returning } = this.visits;
		const firstTravelling = travelling[0];
		const firstReturning = returning.first();

		return {
			visited: Boolean(
				(firstTravelling && firstTravelling.start <= date) ||
					(firstReturning && firstReturning.start <= date),
			),
			current: {
				travelling: travelling.some(({ start, end }) => date >= start && date < end),
				returning: returning.some(({ start, end }) => date >= start && date < end),
			},
		};
	}
}

export class GuideSpirit extends BaseSpirit {
	public override readonly type = SpiritType.Guide;

	public area: Area | null = null;

	public realm: Realm | null = null;

	public season!: Season;

	public readonly current: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCost: Required<ItemCost>;

	public readonly allCosmetics: readonly Cosmetic[];

	public readonly imageURL: string | null;

	public readonly inProgress: boolean;

	public readonly seasonId: SeasonIds;

	public constructor(spirit: GuideSpiritData) {
		super(spirit);

		const friendshipTree = createFriendshipTreeState(spirit, { seasonId: spirit.seasonId });

		this.current = friendshipTree.current;
		this.totalCost = friendshipTree.totalCost;
		this.allCosmetics = friendshipTree.allCosmetics;
		this.imageURL = friendshipTree.imageURL;
		this.inProgress = spirit.offer?.inProgress ?? false;
		this.seasonId = spirit.seasonId;
	}
}

export type Spirit = StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit;
