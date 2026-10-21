import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { Cosmetic } from "../cosmetics.js";
import { isActive, skyDate } from "../dates.js";
import { realmForArea } from "../kingdom/areas/index.js";
import type { AreaName, RealmName } from "../kingdom/geography.js";
import { CDN_URL } from "../routes.js";
import type { SeasonIds } from "../season.js";
import type { VisitPeriod } from "../types/index.js";
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
	type SpiritIds,
	SpiritType,
} from "../utility/spirits.js";

export enum SpiritKind {
	Spirit = 0,
	Entity = 1,
	Mannequin = 2,
}

const TRAVELLING_ERROR_DATES = new Collection<number, Temporal.ZonedDateTime>()
	.set(1, skyDate(2_020, 5, 28))
	.set(2, skyDate(2_021, 2, 4))
	.set(3, skyDate(2_022, 1, 6))
	.set(4, skyDate(2_023, 4, 13));

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

interface FriendshipTreeData {
	hasInfographic?: boolean;
	friendshipTree: FriendshipTreeRaw | LegacyFriendshipTreeRaw;
}

interface GuideSeasonalFriendshipTreeData extends FriendshipTreeData {
	inProgress?: boolean;
}

interface BaseSpiritData {
	id: SpiritIds;
	/**
	 * Season of Shattering introduced entities that are not accurately described as spirits.
	 * This defines the kind of spirit.
	 *
	 * @defaultValue {@link SpiritKind.Spirit}
	 **/
	kind?: SpiritKind;
	area?: AreaName;
	realm?: RealmName;
	keywords?: readonly string[];
	action?: FriendAction;
}

interface StandardSpiritData extends Omit<BaseSpiritData, "realm">, FriendshipTreeData {
	area: AreaName;
	friendshipTree: LegacyFriendshipTreeRaw;
}

interface ElderSpiritData extends BaseSpiritData, FriendshipTreeData {
	area: AreaName;
	realm: RealmName;
	friendshipTree: LegacyFriendshipTreeRaw;
}

export type SeasonalSpiritVisitTravellingErrorData = ReadonlyCollection<
	number,
	Temporal.ZonedDateTime
>;

interface SeasonalSpiritVisitData {
	readonly travelling?: readonly VisitPeriod[];
	readonly travellingErrors?: readonly number[];
	readonly returning?: readonly VisitPeriod[];
}

interface SeasonalSpiritVisit {
	readonly travelling: readonly VisitPeriod[];
	readonly travellingErrors: SeasonalSpiritVisitTravellingErrorData;
	readonly returning: readonly VisitPeriod[];
}

interface SeasonalSpiritData extends Omit<BaseSpiritData, "realm"> {
	area: AreaName;
	friendshipTrees: {
		seasonal: FriendshipTreeData;
		postSeason?: FriendshipTreeData;
	};
	seasonId: SeasonIds;
	visits?: SeasonalSpiritVisitData;
}

interface GuideSpiritData extends Omit<BaseSpiritData, "realm"> {
	friendshipTrees?: {
		seasonal: GuideSeasonalFriendshipTreeData;
		postSeason?: FriendshipTreeData;
	};
	seasonId: SeasonIds;
}

interface SpiritFriendshipTree {
	readonly friendshipTree: FriendshipTree | LegacyFriendshipTree;
	readonly imageURL: string | null;
	readonly totalCost: readonly CostEntry[];
}

interface GuideSeasonalFriendshipTree extends SpiritFriendshipTree {
	readonly inProgress: boolean;
}

function friendshipTreeCosts(
	friendshipTree: FriendshipTree | LegacyFriendshipTree,
): readonly ItemCost[] {
	const costs: ItemCost[] = [];

	for (const { cost } of friendshipTreeToItems(friendshipTree)) {
		if (cost !== null) {
			costs.push(cost);
		}
	}

	return costs;
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

	public readonly kind: SpiritKind;

	public readonly area: AreaName | null;

	public readonly realm: RealmName | null;

	public readonly keywords: NonNullable<BaseSpiritData["keywords"]>;

	public abstract readonly displayFriendshipTree: FriendshipTree | LegacyFriendshipTree;

	public abstract readonly allCosmetics: readonly Cosmetic[];

	public readonly action: FriendAction | null;

	public constructor(data: Data) {
		this.id = data.id;
		this.kind = data.kind ?? SpiritKind.Spirit;
		this.area = data.area ?? null;
		this.realm = data.realm ?? (this.area === null ? null : realmForArea(this.area));
		this.keywords = data.keywords ?? [];
		this.action = data.action ?? null;
	}

	protected resolveFriendshipTree(
		{ hasInfographic = true, friendshipTree }: FriendshipTreeData,
		infographic: "current" | "seasonal",
		options?: { seasonId: SeasonIds },
	): SpiritFriendshipTree {
		const resolvedFriendshipTree = resolveOffer(friendshipTree, options);

		return {
			friendshipTree: resolvedFriendshipTree,
			imageURL: hasInfographic
				? String(new URL(`spirits/${this.id}/friendship_tree/${infographic}.webp`, CDN_URL))
				: null,
			totalCost: sumCosts(friendshipTreeCosts(resolvedFriendshipTree)),
		};
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

abstract class RealmSpirit<
	Data extends StandardSpiritData | ElderSpiritData,
> extends BaseSpirit<Data> {
	declare public readonly area: AreaName;

	declare public readonly realm: RealmName;

	public readonly friendshipTree: FriendshipTree | LegacyFriendshipTree;

	public readonly imageURL: string | null;

	public readonly totalCost: readonly CostEntry[];

	public override readonly displayFriendshipTree: FriendshipTree | LegacyFriendshipTree;

	public override readonly allCosmetics: readonly Cosmetic[];

	public constructor(spirit: Data) {
		super(spirit);
		const { friendshipTree, imageURL, totalCost } = this.resolveFriendshipTree(spirit, "current");
		this.friendshipTree = friendshipTree;
		this.imageURL = imageURL;
		this.totalCost = totalCost;
		this.displayFriendshipTree = friendshipTree;
		this.allCosmetics = resolveAllCosmetics(friendshipTree);
	}
}

export class StandardSpirit extends RealmSpirit<StandardSpiritData> {
	public override readonly type = SpiritType.Standard;
}

export class ElderSpirit extends RealmSpirit<ElderSpiritData> {
	public override readonly type = SpiritType.Elder;
}

export class SeasonalSpirit extends BaseSpirit<SeasonalSpiritData> {
	public override readonly type = SpiritType.Seasonal;

	declare public readonly area: AreaName;

	public readonly friendshipTrees: {
		readonly seasonal: SpiritFriendshipTree;
		readonly postSeason: SpiritFriendshipTree | null;
	};

	public override readonly displayFriendshipTree: FriendshipTree | LegacyFriendshipTree;

	public override readonly allCosmetics: readonly Cosmetic[];

	public readonly seasonId: SeasonIds;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		const { seasonal, postSeason } = spirit.friendshipTrees;

		this.friendshipTrees = {
			seasonal: this.resolveFriendshipTree(seasonal, "seasonal", { seasonId: spirit.seasonId }),
			postSeason: postSeason ? this.resolveFriendshipTree(postSeason, "current") : null,
		};

		this.displayFriendshipTree = (
			this.friendshipTrees.postSeason ?? this.friendshipTrees.seasonal
		).friendshipTree;

		this.allCosmetics = resolveAllCosmetics(this.displayFriendshipTree);
		this.seasonId = spirit.seasonId;

		this.visits = {
			travelling: spirit.visits?.travelling ?? [],
			travellingErrors: resolveVisitPeriods(
				this.id,
				spirit.visits?.travellingErrors,
				TRAVELLING_ERROR_DATES,
				"travelling error",
			),
			returning: spirit.visits?.returning ?? [],
		};
	}

	public visit(date: Temporal.ZonedDateTime) {
		const { travelling, returning } = this.visits;
		const firstTravelling = travelling[0];
		const firstReturning = returning[0];

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

	public readonly friendshipTrees: {
		readonly seasonal: GuideSeasonalFriendshipTree;
		readonly postSeason: SpiritFriendshipTree | null;
	};

	public override readonly displayFriendshipTree: FriendshipTree | LegacyFriendshipTree;

	public override readonly allCosmetics: readonly Cosmetic[];

	public readonly seasonId: SeasonIds;

	public constructor(spirit: GuideSpiritData) {
		super(spirit);
		const seasonal = spirit.friendshipTrees?.seasonal;
		const postSeason = spirit.friendshipTrees?.postSeason;

		this.friendshipTrees = {
			seasonal: seasonal
				? {
						...this.resolveFriendshipTree(seasonal, "seasonal", { seasonId: spirit.seasonId }),
						inProgress: seasonal.inProgress ?? false,
					}
				: { friendshipTree: [], imageURL: null, totalCost: [], inProgress: false },
			postSeason: postSeason ? this.resolveFriendshipTree(postSeason, "current") : null,
		};

		this.displayFriendshipTree = (
			this.friendshipTrees.postSeason ?? this.friendshipTrees.seasonal
		).friendshipTree;

		this.allCosmetics = resolveAllCosmetics(this.displayFriendshipTree);
		this.seasonId = spirit.seasonId;
	}
}

export type Spirit = StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit;
