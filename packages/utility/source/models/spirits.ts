import { Collection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import { Mixin } from "ts-mixer";
import type { Cosmetic } from "../cosmetics.js";
import { skyDate } from "../dates.js";
import type { RealmName } from "../kingdom.js";
import { CDN_URL } from "../routes.js";
import type { SeasonId, SeasonIds } from "../season.js";
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
	.set(10, { start: skyDate(2_025, 8, 18), end: skyDate(2_025, 9, 1) });

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
	current?: SeasonIds extends typeof SeasonId.Migration
		? FriendshipTreeRaw
		: LegacyFriendshipTreeRaw;
}

interface StandardFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	current: LegacyFriendshipTreeRaw;
}

interface ElderFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	current: LegacyFriendshipTreeRaw;
}

interface SeasonalFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	hasInfographicSeasonal?: boolean;
	seasonal: SeasonIds extends typeof SeasonId.Migration
		? FriendshipTreeRaw
		: LegacyFriendshipTreeRaw;
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
	realm?: RealmName;
	keywords?: readonly string[];
}

export type StandardSpiritRealm = Exclude<RealmName, RealmName.EyeOfEden>;

interface StandardSpiritData
	extends BaseSpiritData,
		StandardFriendshipTreeData,
		ExpressiveSpiritData {
	realm: StandardSpiritRealm;
}

interface ElderSpiritData extends BaseSpiritData, ElderFriendshipTreeData {
	realm: RealmName;
}

export type SeasonalSpiritVisitTravellingErrorData = Collection<number, DateTime>;
export type SeasonalSpiritVisitReturningData = Collection<number, ReturningDatesData>;

interface SeasonalSpiritVisitData {
	travelling?: TravellingSpiritsDates[];
	travellingErrors?: number[];
	returning?: number[];
}

interface SeasonalSpiritVisit {
	travelling: TravellingSpiritsDates[];
	travellingErrors: SeasonalSpiritVisitTravellingErrorData;
	returning: SeasonalSpiritVisitReturningData;
}

interface SeasonalSpiritData
	extends BaseSpiritData,
		SeasonalFriendshipTreeData,
		ExpressiveSpiritData {
	hasMarketingVideo?: boolean;
	visits?: SeasonalSpiritVisitData;
}

interface GuideSpiritData extends BaseSpiritData, GuideFriendshipTreeData {
	seasonId: SeasonIds;
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

abstract class BaseFriendshipTree {
	public readonly current: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCost: Required<ItemCost>;

	public readonly allCosmetics: readonly Cosmetic[];

	public imageURL: string | null;

	public constructor({ id, offer }: BaseFriendshipTreeData) {
		this.current = offer?.current ? resolveOffer(offer.current) : [];
		this.totalCost = addCosts(friendshipTreeWithCosts(this.current));
		this.allCosmetics = offer?.current ? resolveAllCosmetics(this.current) : [];

		this.imageURL = (offer ? (offer.hasInfographic ?? true) : false)
			? this.resolveImageURL(id)
			: null;
	}

	protected resolveImageURL(spiritId: SpiritIds, seasonal = false) {
		return String(
			new URL(
				`spirits/${spiritId}/friendship_tree/${seasonal ? "seasonal" : "current"}.webp`,
				CDN_URL,
			),
		);
	}
}

abstract class StandardFriendshipTree extends BaseFriendshipTree {
	public declare readonly current: FriendshipTree | LegacyFriendshipTree;

	public declare readonly totalCost: Required<ItemCost>;

	public declare readonly allCosmetics: readonly Cosmetic[];
}

abstract class ElderFriendshipTree extends BaseFriendshipTree {
	public declare readonly current: FriendshipTree | LegacyFriendshipTree;

	public declare readonly totalCost: Required<ItemCost>;

	public declare readonly allCosmetics: readonly Cosmetic[];
}

abstract class SeasonalFriendshipTree extends BaseFriendshipTree {
	public override readonly allCosmetics: readonly Cosmetic[];

	public readonly seasonal: FriendshipTree | LegacyFriendshipTree;

	public readonly items: FriendshipTree | LegacyFriendshipTree;

	public readonly totalCostSeasonal: Required<ItemCost>;

	public imageURLSeasonal: string | null;

	public constructor(seasonalFriendshipTreeData: SeasonalFriendshipTreeData) {
		super(seasonalFriendshipTreeData);

		this.seasonal = resolveOffer(seasonalFriendshipTreeData.offer.seasonal, {
			seasonId: seasonalFriendshipTreeData.seasonId,
		});

		this.items = this.current.length > 0 ? this.current : this.seasonal;
		this.allCosmetics = resolveAllCosmetics(this.items);
		this.totalCostSeasonal = addCosts(friendshipTreeWithCosts(this.seasonal));

		this.imageURLSeasonal =
			(seasonalFriendshipTreeData.offer.hasInfographicSeasonal ?? true)
				? this.resolveImageURL(seasonalFriendshipTreeData.id, true)
				: null;
	}
}

abstract class GuideFriendshipTree extends BaseFriendshipTree {
	public readonly inProgress: boolean;

	public constructor(guideFriendshipTreeData: GuideFriendshipTreeData) {
		super(guideFriendshipTreeData);
		this.inProgress = guideFriendshipTreeData.offer?.inProgress ?? false;
	}
}

abstract class ExpressiveSpirit {
	public readonly emote: SpiritEmote | null;

	public readonly stance: Cosmetic | null;

	public readonly call: Cosmetic | null;

	public readonly action: FriendAction | null;

	public constructor({ emote, stance, call, action }: ExpressiveSpiritData) {
		this.emote = emote ?? null;
		this.stance = stance ?? null;
		this.call = call ?? null;
		this.action = action ?? null;
	}
}

abstract class BaseSpirit {
	public readonly id: BaseSpiritData["id"];

	public readonly type!: SpiritType;

	public readonly realm: RealmName | null;

	public readonly keywords: NonNullable<BaseSpiritData["keywords"]>;

	public constructor(spirit: BaseSpiritData) {
		this.id = spirit.id;
		this.realm = spirit.realm ?? null;
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

export class StandardSpirit extends Mixin(BaseSpirit, StandardFriendshipTree, ExpressiveSpirit) {
	public override readonly type = SpiritType.Standard;

	public declare readonly realm: StandardSpiritRealm;

	public constructor(spirit: StandardSpiritData) {
		super(spirit);
		this.realm = spirit.realm;
	}
}

export class ElderSpirit extends Mixin(BaseSpirit, ElderFriendshipTree) {
	public override readonly type = SpiritType.Elder;

	public declare readonly realm: RealmName;

	public constructor(spirit: ElderSpiritData) {
		super(spirit);
		this.realm = spirit.realm;
	}
}

export class SeasonalSpirit extends Mixin(BaseSpirit, SeasonalFriendshipTree, ExpressiveSpirit) {
	public override readonly type = SpiritType.Seasonal;

	public readonly seasonId: SeasonIds;

	public readonly marketingVideoURL: string | null;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		this.seasonId = spirit.seasonId;

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

export class GuideSpirit extends Mixin(BaseSpirit, GuideFriendshipTree) {
	public override readonly type = SpiritType.Guide;

	public override readonly current: FriendshipTree | LegacyFriendshipTree;

	public override readonly totalCost: Required<ItemCost>;

	public readonly seasonId: SeasonIds;

	public constructor(spirit: GuideSpiritData) {
		super(spirit);

		this.current = spirit.offer?.current
			? resolveOffer(spirit.offer.current, { seasonId: spirit.seasonId })
			: [];

		this.totalCost = addCosts(friendshipTreeWithCosts(this.current));
		this.seasonId = spirit.seasonId;
	}
}
