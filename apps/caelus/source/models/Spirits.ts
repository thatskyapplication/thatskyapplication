import process from "node:process";
import { URL } from "node:url";
import { Collection } from "@discordjs/collection";
import {
	type FriendAction,
	type RealmName,
	SPIRIT_TYPE,
	type SeasonIds,
	type SpiritCall,
	type SpiritEmote,
	type SpiritName,
	type SpiritStance,
	type SpiritType,
	skyDate,
} from "@thatskyapplication/utility";
import type { DateTime } from "luxon";
import { Mixin } from "ts-mixer";
import { TRAVELLING_DATES } from "../data/travelling-spirits.js";
import pino from "../pino.js";
import {
	type Item,
	type ItemCost,
	type ItemRaw,
	addCosts,
	resolveAllCosmetics,
	resolveOffer,
	snakeCaseName,
	wikiURL,
} from "../utility/catalogue.js";
import { CDN_URL } from "../utility/constants.js";

export interface TravellingSpiritsPacket {
	visit: number;
	entity: SpiritName;
	start: Date;
	end: Date;
}

export interface TravellingSpiritsDates {
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
	.set(7, { start: skyDate(2_025, 1, 13), end: skyDate(2_025, 1, 27) });

interface BaseFriendshipTreeOfferData {
	hasInfographic?: boolean;
	current?: readonly ItemRaw[];
}

interface StandardFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	current: readonly ItemRaw[];
}

interface ElderFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	current: readonly ItemRaw[];
}

interface SeasonalFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	hasInfographicSeasonal?: boolean;
	seasonal: readonly ItemRaw[];
}

interface GuideFriendshipTreeOfferData extends BaseFriendshipTreeOfferData {
	inProgress?: boolean;
}

interface BaseFriendshipTreeData {
	name: SpiritName;
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
	stance?: SpiritStance;
	call?: Exclude<SpiritCall, SpiritCall.KizunaAI | SpiritCall.Journey | SpiritCall.Ninny>;
	action?: FriendAction;
}

interface BaseSpiritData {
	name: SpiritName;
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

export type SeasonalSpiritVisitTravellingData = Collection<number, TravellingSpiritsDates>;
export type SeasonalSpiritVisitTravellingErrorData = Collection<number, DateTime>;
export type SeasonalSpiritVisitReturningData = Collection<number, ReturningDatesData>;

interface SeasonalSpiritVisitData {
	travelling?: number[];
	travellingErrors?: number[];
	returning?: number[];
}

interface SeasonalSpiritVisit {
	travelling: SeasonalSpiritVisitTravellingData;
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

abstract class BaseFriendshipTree {
	public readonly current: readonly Item[];

	public readonly totalCost: Required<ItemCost> | null;

	public readonly allCosmetics: number[];

	public imageURL: string | null;

	public constructor({ name, offer }: BaseFriendshipTreeData) {
		this.current = offer?.current ? resolveOffer(offer.current) : [];

		this.totalCost = this.current
			? addCosts(
					this.current.map((item) => item.cost).filter((cost): cost is ItemCost => cost !== null),
				)
			: null;

		this.allCosmetics = offer?.current ? resolveAllCosmetics(this.current) : [];

		this.imageURL = (offer ? offer.hasInfographic ?? true : false)
			? this.resolveImageURL(name)
			: null;
	}

	protected resolveImageURL(name: SpiritName, seasonal = false) {
		return String(
			new URL(
				`spirits/${snakeCaseName(name)}/friendship_tree/${seasonal ? "seasonal" : "current"}.webp`,
				CDN_URL,
			),
		);
	}
}

abstract class StandardFriendshipTree extends BaseFriendshipTree {
	public declare readonly current: readonly Item[];

	public declare readonly totalCost: Required<ItemCost>;

	public declare readonly allCosmetics: number[];
}

abstract class ElderFriendshipTree extends BaseFriendshipTree {
	public declare readonly current: readonly Item[];

	public declare readonly totalCost: Required<ItemCost>;

	public declare readonly allCosmetics: number[];
}

abstract class SeasonalFriendshipTree extends BaseFriendshipTree {
	public override readonly allCosmetics: number[];

	public readonly seasonal: readonly Item[];

	public readonly items: readonly Item[];

	public readonly totalCostSeasonal: Required<ItemCost>;

	public imageURLSeasonal: string | null;

	public constructor(seasonalFriendshipTreeData: SeasonalFriendshipTreeData) {
		super(seasonalFriendshipTreeData);

		this.seasonal = resolveOffer(seasonalFriendshipTreeData.offer.seasonal, {
			seasonId: seasonalFriendshipTreeData.seasonId,
		});

		this.items = this.current.length > 0 ? this.current : this.seasonal;
		this.allCosmetics = resolveAllCosmetics(this.items);

		this.totalCostSeasonal = addCosts(
			this.seasonal.map((item) => item.cost).filter((cost): cost is ItemCost => cost !== null),
		);

		this.imageURLSeasonal =
			seasonalFriendshipTreeData.offer.hasInfographicSeasonal ?? true
				? this.resolveImageURL(seasonalFriendshipTreeData.name, true)
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

	public readonly stance: SpiritStance | null;

	public readonly call: Exclude<
		SpiritCall,
		SpiritCall.KizunaAI | SpiritCall.Journey | SpiritCall.Ninny
	> | null;

	public readonly action: FriendAction | null;

	public constructor({ emote, stance, call, action }: ExpressiveSpiritData) {
		this.emote = emote ?? null;
		this.stance = stance ?? null;
		this.call = call ?? null;
		this.action = action ?? null;
	}
}

abstract class BaseSpirit {
	public readonly name: BaseSpiritData["name"];

	public readonly snakeCaseName: string;

	public readonly type!: SpiritType;

	public readonly realm: RealmName | null;

	public readonly keywords: NonNullable<BaseSpiritData["keywords"]>;

	public readonly wikiURL: string;

	public constructor(spirit: BaseSpiritData) {
		this.name = spirit.name;
		const { name } = this;
		this.snakeCaseName = snakeCaseName(name);
		this.realm = spirit.realm ?? null;
		this.keywords = spirit.keywords ?? [];
		this.wikiURL = wikiURL(spirit.name);
	}

	public isStandardSpirit(): this is StandardSpirit {
		return this.type === SPIRIT_TYPE.Standard;
	}

	public isElderSpirit(): this is ElderSpirit {
		return this.type === SPIRIT_TYPE.Elder;
	}

	public isSeasonalSpirit(): this is SeasonalSpirit {
		return this.type === SPIRIT_TYPE.Seasonal;
	}

	public isGuideSpirit(): this is GuideSpirit {
		return this.type === SPIRIT_TYPE.Guide;
	}
}

export class StandardSpirit extends Mixin(BaseSpirit, StandardFriendshipTree, ExpressiveSpirit) {
	public override readonly type = SPIRIT_TYPE.Standard;

	public declare readonly realm: StandardSpiritRealm;

	public constructor(spirit: StandardSpiritData) {
		super(spirit);
		this.realm = spirit.realm;
	}
}

export class ElderSpirit extends Mixin(BaseSpirit, ElderFriendshipTree) {
	public override readonly type = SPIRIT_TYPE.Elder;

	public declare readonly realm: RealmName;

	public constructor(spirit: ElderSpiritData) {
		super(spirit);
		this.realm = spirit.realm;
	}
}

export class SeasonalSpirit extends Mixin(BaseSpirit, SeasonalFriendshipTree, ExpressiveSpirit) {
	public override readonly type = SPIRIT_TYPE.Seasonal;

	public readonly seasonId: SeasonIds;

	public readonly marketingVideoURL: string | null;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		this.seasonId = spirit.seasonId;

		this.marketingVideoURL = spirit.hasMarketingVideo
			? String(new URL(`spirits/${this.snakeCaseName}/marketing_video.mp4`, CDN_URL))
			: null;

		this.visits = {
			travelling:
				spirit.visits?.travelling?.reduce((collection, travelling) => {
					const period = TRAVELLING_DATES.get(travelling);

					if (!period) {
						pino.fatal(
							`${this.name} had a travelling index of ${travelling}, but there was no date for it.`,
						);

						process.exit(1);
					}

					return collection.set(travelling, period);
				}, new Collection<number, TravellingSpiritsDates>()) ??
				new Collection<number, TravellingSpiritsDates>(),
			travellingErrors:
				spirit.visits?.travellingErrors?.reduce((collection, travellingError) => {
					const period = TRAVELLING_ERROR_DATES.get(travellingError);

					if (!period) {
						pino.fatal(
							`${this.name} had an travelling error index of ${travellingError}, but there was no date for it.`,
						);

						process.exit(1);
					}

					return collection.set(travellingError, period);
				}, new Collection<number, DateTime>()) ?? new Collection<number, DateTime>(),
			returning:
				spirit.visits?.returning?.reduce((collection, returning) => {
					const period = RETURNING_DATES.get(returning);

					if (!period) {
						pino.fatal(
							`${this.name} had a returning index of ${returning}, but there was no date for it.`,
						);

						process.exit(1);
					}

					return collection.set(returning, period);
				}, new Collection<number, ReturningDatesData>()) ??
				new Collection<number, ReturningDatesData>(),
		};
	}

	public visit(date: DateTime) {
		const { travelling, returning } = this.visits;
		const firstTravelling = travelling.first();
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
	public override readonly type = SPIRIT_TYPE.Guide;

	public override readonly current;

	public readonly seasonId: SeasonIds;

	public constructor(spirit: GuideSpiritData) {
		super(spirit);

		this.current = spirit.offer?.current
			? resolveOffer(spirit.offer.current, { seasonId: spirit.seasonId })
			: [];

		this.seasonId = spirit.seasonId;
	}
}
