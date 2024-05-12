import process from "node:process";
import { URL } from "node:url";
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Mixin } from "ts-mixer";
import { type Realm, CDN_URL, WIKI_URL } from "../../Utility/Constants.js";
import { skyDate } from "../../Utility/dates.js";
import { type Emoji, MISCELLANEOUS_EMOJIS, resolveCurrencyEmoji } from "../../Utility/emojis.js";
import {
	type FriendAction,
	type SpiritCall,
	type SpiritEmote,
	type SpiritStance,
	type SpiritType,
	SPIRIT_TYPE,
	SpiritName,
} from "../../Utility/spirits.js";
import pino from "../../pino.js";
import { SeasonName, SeasonNameToSeasonalCandleEmoji, SeasonNameToSeasonalHeartEmoji } from "../Season.js";

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

export interface SpiritCost {
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
	seasonalHearts?: number;
}

export interface ItemsData {
	item: string;
	cost: SpiritCost | null;
	emoji: Emoji;
}

interface BaseFriendshipTreeOffer {
	hasInfographic?: boolean;
	current?: Collection<number, ItemsData>;
}

interface StandardFriendshipTreeOffer extends BaseFriendshipTreeOffer {
	current: Collection<number, ItemsData>;
}

interface ElderFriendshipTreeOffer extends BaseFriendshipTreeOffer {
	current: Collection<number, ItemsData>;
}

interface SeasonalFriendshipTreeOffer extends BaseFriendshipTreeOffer {
	hasInfographicSeasonal?: boolean;
	seasonal: Collection<number, ItemsData>;
}

interface GuideFriendshipTreeOffer extends BaseFriendshipTreeOffer {
	inProgress?: boolean;
}

interface BaseFriendshipTreeData {
	name: SpiritName;
	offer?:
		| StandardFriendshipTreeOffer
		| ElderFriendshipTreeOffer
		| SeasonalFriendshipTreeOffer
		| GuideFriendshipTreeOffer;
}

interface StandardFriendshipTreeData extends BaseFriendshipTreeData {
	offer: StandardFriendshipTreeOffer;
}

interface ElderFriendshipTreeData extends BaseFriendshipTreeData {
	offer?: ElderFriendshipTreeOffer;
}

interface SeasonalFriendshipTreeData extends BaseFriendshipTreeData {
	offer: SeasonalFriendshipTreeOffer;
}

interface GuideFriendshipTreeData extends BaseFriendshipTreeData {
	offer?: GuideFriendshipTreeOffer;
}

interface ExpressiveSpiritData {
	emote?: SpiritEmote;
	stance?: SpiritStance;
	call?: Exclude<SpiritCall, SpiritCall.KizunaAI | SpiritCall.Journey>;
	action?: FriendAction;
}

interface BaseSpiritData {
	name: SpiritName;
	realm?: Realm;
	keywords?: readonly string[];
}

export type StandardSpiritRealm = Exclude<Realm, Realm.EyeOfEden>;

interface StandardSpiritData extends BaseSpiritData, StandardFriendshipTreeData, ExpressiveSpiritData {
	realm: StandardSpiritRealm;
}

interface ElderSpiritData extends BaseSpiritData, ElderFriendshipTreeData {
	realm: Realm;
}

export type SeasonalSpiritVisitTravellingData = Collection<SeasonalSpiritVisitCollectionKey, DateTime>;
export type SeasonalSpiritVisitReturningData = Collection<SeasonalSpiritVisitCollectionKey, ReturningDatesData>;

interface SeasonalSpiritVisitData {
	travelling?: SeasonalSpiritVisitTravellingData;
	returning?: SeasonalSpiritVisitCollectionKey[];
}

interface SeasonalSpiritVisit {
	travelling: SeasonalSpiritVisitTravellingData;
	returning: SeasonalSpiritVisitReturningData;
}

interface SeasonalSpiritData extends BaseSpiritData, SeasonalFriendshipTreeData, ExpressiveSpiritData {
	season: SeasonName;
	hasMarketingVideo?: boolean;
	visits?: SeasonalSpiritVisitData;
}

interface GuideSpiritData extends BaseSpiritData, GuideFriendshipTreeData {
	season: SeasonName;
}

export const NO_FRIENDSHIP_TREE_TEXT = "This spirit does not have a friendship tree." as const;
export const NO_FRIENDSHIP_TREE_YET_TEXT = "This spirit does not have a friendship tree. Maybe it should?" as const;
export const GUIDE_SPIRIT_IN_PROGRESS_TEXT = "This spirit's friendship tree has not been fully revealed." as const;

export function addCurrency(currency1: SpiritCost, currency2: SpiritCost): Required<SpiritCost> {
	return {
		candles: (currency1.candles ?? 0) + (currency2.candles ?? 0),
		hearts: (currency1.hearts ?? 0) + (currency2.hearts ?? 0),
		ascendedCandles: (currency1.ascendedCandles ?? 0) + (currency2.ascendedCandles ?? 0),
		seasonalCandles: (currency1.seasonalCandles ?? 0) + (currency2.seasonalCandles ?? 0),
		seasonalHearts: (currency1.seasonalHearts ?? 0) + (currency2.seasonalHearts ?? 0),
	};
}

export function resolveOfferToCurrency(cost: SpiritCost, seasonName?: SeasonName | null) {
	const totalCost = [];

	if (cost.candles) {
		totalCost.push(resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Candle, number: cost.candles }));
	}

	if (cost.hearts) {
		totalCost.push(resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: cost.hearts }));
	}

	if (cost.ascendedCandles) {
		totalCost.push(resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.AscendedCandle, number: cost.ascendedCandles }));
	}

	if (cost.seasonalCandles) {
		totalCost.push(
			resolveCurrencyEmoji({
				emoji: seasonName ? SeasonNameToSeasonalCandleEmoji[seasonName] : MISCELLANEOUS_EMOJIS.SeasonalCandle,
				number: cost.seasonalCandles,
			}),
		);
	}

	if (cost.seasonalHearts) {
		totalCost.push(
			resolveCurrencyEmoji({
				emoji:
					seasonName && seasonName !== SeasonName.Gratitude && seasonName !== SeasonName.Lightseekers
						? SeasonNameToSeasonalHeartEmoji[seasonName]
						: MISCELLANEOUS_EMOJIS.SeasonalHeart,
				number: cost.seasonalHearts,
			}),
		);
	}

	return totalCost;
}

function wikiName(name: SpiritName) {
	return (name.includes("(") ? name.slice(0, name.indexOf("(") - 1) : name).replaceAll(" ", "_");
}

function cdnName(name: SpiritName) {
	return wikiName(name).replaceAll("'", "_").replaceAll("-", "_").toLowerCase();
}

abstract class BaseFriendshipTree {
	public readonly offer: BaseFriendshipTreeOffer | null;

	public readonly totalCost: Required<SpiritCost> | null;

	public readonly maxItemsBit: number | null;

	public imageURL: string | null;

	public constructor({ name, offer }: BaseFriendshipTreeData) {
		this.offer = offer ?? null;
		this.totalCost = offer?.current ? this.resolveTotalCost(offer.current) : null;
		this.maxItemsBit = offer?.current ? this.resolveMaxItemsBit(offer?.current) : null;
		this.imageURL = (offer ? offer.hasInfographic ?? true : false) ? this.resolveImageURL(name) : null;
	}

	protected resolveTotalCost(offer: Collection<number, ItemsData>) {
		return offer.reduce<Required<SpiritCost>>(
			(offer, { cost }) => {
				if (!cost) return offer;
				const { candles, hearts, ascendedCandles, seasonalCandles, seasonalHearts } = cost;
				if (candles) offer.candles += candles;
				if (hearts) offer.hearts += hearts;
				if (ascendedCandles) offer.ascendedCandles += ascendedCandles;
				if (seasonalCandles) offer.seasonalCandles += seasonalCandles;
				if (seasonalHearts) offer.seasonalHearts += seasonalHearts;
				return offer;
			},
			{
				candles: 0,
				hearts: 0,
				ascendedCandles: 0,
				seasonalCandles: 0,
				seasonalHearts: 0,
			},
		);
	}

	protected resolveMaxItemsBit(offer: Collection<number, ItemsData>) {
		return offer.reduce((bits, _, bit) => bit | bits, 0);
	}

	protected resolveImageURL(name: SpiritName, seasonal = false) {
		let fileName = seasonal ? "seasonal" : "current";

		if ([SpiritName.AncientLight1, SpiritName.AncientDarkness1].includes(name)) {
			fileName += "1";
		} else if ([SpiritName.AncientLight2, SpiritName.AncientDarkness2].includes(name)) {
			fileName += "2";
		}

		return String(new URL(`spirits/${cdnName(name)}/friendship_tree/${fileName}.webp`, CDN_URL));
	}
}

abstract class StandardFriendshipTree extends BaseFriendshipTree {
	public declare readonly offer: StandardFriendshipTreeOffer;

	public declare readonly totalCost: Required<SpiritCost>;

	public declare readonly maxItemsBit: number;
}

abstract class ElderFriendshipTree extends BaseFriendshipTree {
	public declare readonly offer: ElderFriendshipTreeOffer;

	public declare readonly totalCost: Required<SpiritCost>;

	public declare readonly maxItemsBit: number;
}

abstract class SeasonalFriendshipTree extends BaseFriendshipTree {
	public override readonly offer: SeasonalFriendshipTreeOffer;

	public override readonly maxItemsBit: number;

	public readonly totalCostSeasonal: Required<SpiritCost>;

	public imageURLSeasonal: string | null;

	public constructor(seasonalFriendshipTreeData: SeasonalFriendshipTreeData) {
		super(seasonalFriendshipTreeData);
		this.offer = seasonalFriendshipTreeData.offer;
		this.maxItemsBit = this.resolveMaxItemsBit(this.offer.current ?? this.offer.seasonal);
		this.totalCostSeasonal = this.resolveTotalCost(this.offer.seasonal);

		this.imageURLSeasonal =
			this.offer.hasInfographicSeasonal ?? true ? this.resolveImageURL(seasonalFriendshipTreeData.name, true) : null;
	}
}

abstract class GuideFriendshipTree extends BaseFriendshipTree {
	public declare readonly offer: GuideFriendshipTreeOffer | null;
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

	public readonly wikiName: string;

	public readonly cdnName: string;

	public readonly type!: SpiritType;

	public readonly realm: Realm | null;

	public readonly keywords: NonNullable<BaseSpiritData["keywords"]>;

	public readonly wikiURL: string;

	public constructor(spirit: BaseSpiritData) {
		this.name = spirit.name;
		const { name } = this;
		this.wikiName = wikiName(name);
		this.cdnName = cdnName(name);
		this.realm = spirit.realm ?? null;
		this.keywords = spirit.keywords ?? [];
		this.wikiURL = new URL(this.wikiName, WIKI_URL).toString();
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

	public declare readonly realm: Realm;

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
			? String(new URL(`spirits/${this.cdnName}/marketing_video.mp4`, CDN_URL))
			: null;

		this.visits = {
			travelling: spirit.visits?.travelling ?? new Collection<SeasonalSpiritVisitCollectionKey, DateTime>(),
			returning:
				spirit.visits?.returning?.reduce((collection, returning) => {
					const period = RETURNING_DATES.get(returning);

					if (!period) {
						pino.fatal(`${this.name} had a returning index of ${returning}, but there was no date for it.`);
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
				(firstTravelling && firstTravelling <= date) || (firstReturning && firstReturning.start <= date),
			),
			current: {
				travelling: Boolean(
					lastTravelling && date >= lastTravelling && date <= lastTravelling.plus({ days: 3 }).endOf("day"),
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
