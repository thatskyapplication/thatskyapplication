import process from "node:process";
import { URL } from "node:url";
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Mixin } from "ts-mixer";
import { CDN_URL, type RealmName } from "../Utility/Constants.js";
import {
	type Item,
	type ItemCost,
	type ItemRaw,
	type SeasonName,
	addCosts,
	resolveOffer,
	snakeCaseName,
	wikiURL,
} from "../Utility/catalogue.js";
import { skyDate } from "../Utility/dates.js";
import {
	type FriendAction,
	SPIRIT_TYPE,
	type SpiritCall,
	type SpiritEmote,
	type SpiritName,
	type SpiritStance,
	type SpiritType,
} from "../Utility/spirits.js";
import pino from "../pino.js";

export type SeasonalSpiritVisitCollectionKey = number | "Error";

interface ReturningDatesData {
	start: DateTime;
	end: DateTime;
}

const RETURNING_DATES = new Collection<SeasonalSpiritVisitCollectionKey, ReturningDatesData>()
	.set(1, { start: skyDate(2_023, 3, 6), end: skyDate(2_023, 3, 19) })
	.set(2, { start: skyDate(2_023, 5, 15), end: skyDate(2_023, 5, 21) })
	.set(3, { start: skyDate(2_023, 7, 3), end: skyDate(2_023, 7, 16) })
	.set(4, { start: skyDate(2_023, 8, 7), end: skyDate(2_023, 8, 13) })
	.set(5, { start: skyDate(2_024, 3, 4), end: skyDate(2_024, 3, 17) });

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
	season: SeasonName;
}

interface GuideFriendshipTreeData extends BaseFriendshipTreeData {
	offer?: GuideFriendshipTreeOfferData;
}

interface ExpressiveSpiritData {
	emote?: SpiritEmote;
	stance?: SpiritStance;
	call?: Exclude<SpiritCall, SpiritCall.KizunaAI | SpiritCall.Journey>;
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

export type SeasonalSpiritVisitTravellingData = Collection<
	SeasonalSpiritVisitCollectionKey,
	DateTime
>;

export type SeasonalSpiritVisitReturningData = Collection<
	SeasonalSpiritVisitCollectionKey,
	ReturningDatesData
>;

interface SeasonalSpiritVisitData {
	travelling?: SeasonalSpiritVisitTravellingData;
	returning?: SeasonalSpiritVisitCollectionKey[];
}

interface SeasonalSpiritVisit {
	travelling: SeasonalSpiritVisitTravellingData;
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
	season: SeasonName;
}

abstract class BaseFriendshipTree {
	public readonly current: readonly Item[];

	public readonly totalCost: Required<ItemCost> | null;

	public readonly maximumItemsBit: number | null;

	public imageURL: string | null;

	public constructor({ name, offer }: BaseFriendshipTreeData) {
		this.current = offer?.current ? resolveOffer(offer.current) : [];

		this.totalCost = this.current
			? addCosts(
					this.current.map((item) => item.cost).filter((cost): cost is ItemCost => cost !== null),
				)
			: null;

		this.maximumItemsBit = offer?.current ? this.resolveMaxItemsBit(offer.current) : null;

		this.imageURL = (offer ? offer.hasInfographic ?? true : false)
			? this.resolveImageURL(name)
			: null;
	}

	protected resolveMaxItemsBit(offer: readonly ItemRaw[]) {
		return offer.reduce((bits, { bit }) => bit | bits, 0);
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

	public declare readonly maximumItemsBit: number;
}

abstract class ElderFriendshipTree extends BaseFriendshipTree {
	public declare readonly current: readonly Item[];

	public declare readonly totalCost: Required<ItemCost>;

	public declare readonly maximumItemsBit: number;
}

abstract class SeasonalFriendshipTree extends BaseFriendshipTree {
	public override readonly maximumItemsBit: number;

	public readonly seasonal: readonly Item[];

	public readonly items: readonly Item[];

	public readonly totalCostSeasonal: Required<ItemCost>;

	public imageURLSeasonal: string | null;

	public constructor(seasonalFriendshipTreeData: SeasonalFriendshipTreeData) {
		super(seasonalFriendshipTreeData);

		this.seasonal = resolveOffer(seasonalFriendshipTreeData.offer.seasonal, {
			seasonName: seasonalFriendshipTreeData.season,
		});

		this.items = this.current.length > 0 ? this.current : this.seasonal;

		this.maximumItemsBit = this.resolveMaxItemsBit(
			seasonalFriendshipTreeData.offer.current ?? seasonalFriendshipTreeData.offer.seasonal,
		);

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

	public readonly call: Exclude<SpiritCall, SpiritCall.KizunaAI | SpiritCall.Journey> | null;

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

	public readonly season: SeasonName;

	public readonly marketingVideoURL: string | null;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		this.season = spirit.season;

		this.marketingVideoURL = spirit.hasMarketingVideo
			? String(new URL(`spirits/${this.snakeCaseName}/marketing_video.mp4`, CDN_URL))
			: null;

		this.visits = {
			travelling:
				spirit.visits?.travelling ?? new Collection<SeasonalSpiritVisitCollectionKey, DateTime>(),
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
				}, new Collection<SeasonalSpiritVisitCollectionKey, ReturningDatesData>()) ??
				new Collection<SeasonalSpiritVisitCollectionKey, ReturningDatesData>(),
		};
	}

	public visit(date: DateTime) {
		const { travelling, returning } = this.visits;
		const firstTravelling = travelling.first();
		const lastTravelling = travelling.last();
		const firstReturning = returning.first();

		return {
			visited: Boolean(
				(firstTravelling && firstTravelling <= date) ||
					(firstReturning && firstReturning.start <= date),
			),
			current: {
				travelling: Boolean(
					lastTravelling &&
						date >= lastTravelling &&
						date <= lastTravelling.plus({ days: 3 }).endOf("day"),
				),
				returning: returning.some(({ start, end }) => date >= start && date <= end),
			},
		};
	}
}

export class GuideSpirit extends Mixin(BaseSpirit, GuideFriendshipTree) {
	public override readonly type = SPIRIT_TYPE.Guide;

	public readonly season: SeasonName;

	public constructor(spirit: GuideSpiritData) {
		super(spirit);
		this.season = spirit.season;
	}
}
