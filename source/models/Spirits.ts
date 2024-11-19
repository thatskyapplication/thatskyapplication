import process from "node:process";
import { URL } from "node:url";
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Mixin } from "ts-mixer";
import pino from "../pino.js";
import {
	type Item,
	type ItemCost,
	type ItemRaw,
	type SeasonIds,
	addCosts,
	resolveAllCosmetics,
	resolveOffer,
	snakeCaseName,
	wikiURL,
} from "../utility/catalogue.js";
import { CDN_URL, type RealmName } from "../utility/constants.js";
import { skyDate } from "../utility/dates.js";
import {
	type FriendAction,
	SPIRIT_TYPE,
	type SpiritCall,
	type SpiritEmote,
	type SpiritName,
	type SpiritStance,
	type SpiritType,
} from "../utility/spirits.js";

interface ReturningDatesData {
	start: DateTime;
	end: DateTime;
}

const TRAVELLING_DATES = new Collection<number, DateTime>()
	.set(1, skyDate(2_020, 1, 31))
	.set(2, skyDate(2_020, 2, 14))
	.set(3, skyDate(2_020, 2, 27))
	.set(4, skyDate(2_020, 3, 12))
	.set(5, skyDate(2_020, 3, 26))
	.set(6, skyDate(2_020, 4, 9))
	.set(7, skyDate(2_020, 4, 16))
	.set(8, skyDate(2_020, 4, 30))
	.set(9, skyDate(2_020, 5, 14))
	.set(10, skyDate(2_020, 5, 28))
	.set(11, skyDate(2_020, 6, 11))
	.set(12, skyDate(2_020, 6, 25))
	.set(13, skyDate(2_020, 7, 9))
	.set(14, skyDate(2_020, 7, 23))
	.set(15, skyDate(2_020, 8, 6))
	.set(16, skyDate(2_020, 8, 20))
	.set(17, skyDate(2_020, 9, 3))
	.set(18, skyDate(2_020, 9, 17))
	.set(19, skyDate(2_020, 10, 1))
	.set(20, skyDate(2_020, 10, 15))
	.set(21, skyDate(2_020, 10, 29))
	.set(22, skyDate(2_020, 11, 12))
	.set(23, skyDate(2_020, 11, 26))
	.set(24, skyDate(2_020, 12, 10))
	.set(25, skyDate(2_020, 12, 24))
	.set(26, skyDate(2_021, 1, 7))
	.set(27, skyDate(2_021, 1, 21))
	.set(28, skyDate(2_021, 2, 4))
	.set(29, skyDate(2_021, 2, 18))
	.set(30, skyDate(2_021, 3, 4))
	.set(31, skyDate(2_021, 3, 18))
	.set(32, skyDate(2_021, 4, 1))
	.set(33, skyDate(2_021, 4, 15))
	.set(34, skyDate(2_021, 4, 29))
	.set(35, skyDate(2_021, 5, 13))
	.set(36, skyDate(2_021, 5, 27))
	.set(37, skyDate(2_021, 6, 10))
	.set(38, skyDate(2_021, 6, 24))
	.set(39, skyDate(2_021, 7, 8))
	.set(40, skyDate(2_021, 7, 22))
	.set(41, skyDate(2_021, 8, 5))
	.set(42, skyDate(2_021, 8, 19))
	.set(43, skyDate(2_021, 9, 1))
	.set(44, skyDate(2_021, 9, 16))
	.set(45, skyDate(2_021, 9, 30))
	.set(46, skyDate(2_021, 10, 14))
	.set(47, skyDate(2_021, 10, 28))
	.set(48, skyDate(2_021, 11, 11))
	.set(49, skyDate(2_021, 11, 25))
	.set(50, skyDate(2_021, 12, 9))
	.set(51, skyDate(2_021, 12, 23))
	.set(52, skyDate(2_022, 1, 6))
	.set(53, skyDate(2_022, 1, 20))
	.set(54, skyDate(2_022, 2, 3))
	.set(55, skyDate(2_022, 2, 17))
	.set(56, skyDate(2_022, 3, 3))
	.set(57, skyDate(2_022, 3, 17))
	.set(58, skyDate(2_022, 3, 31))
	.set(59, skyDate(2_022, 4, 14))
	.set(60, skyDate(2_022, 4, 28))
	.set(61, skyDate(2_022, 5, 12))
	.set(62, skyDate(2_022, 5, 26))
	.set(63, skyDate(2_022, 6, 9))
	.set(64, skyDate(2_022, 6, 23))
	.set(65, skyDate(2_022, 7, 7))
	.set(66, skyDate(2_022, 7, 21))
	.set(67, skyDate(2_022, 8, 4))
	.set(68, skyDate(2_022, 8, 18))
	.set(69, skyDate(2_022, 9, 1))
	.set(70, skyDate(2_022, 9, 15))
	.set(71, skyDate(2_022, 9, 29))
	.set(72, skyDate(2_022, 10, 13))
	.set(73, skyDate(2_022, 10, 27))
	.set(74, skyDate(2_022, 11, 10))
	.set(75, skyDate(2_022, 11, 24))
	.set(76, skyDate(2_022, 12, 8))
	.set(77, skyDate(2_022, 12, 22))
	.set(78, skyDate(2_023, 1, 5))
	.set(79, skyDate(2_023, 1, 19))
	.set(80, skyDate(2_023, 2, 2))
	.set(81, skyDate(2_023, 2, 16))
	.set(82, skyDate(2_023, 3, 2))
	.set(83, skyDate(2_023, 3, 16))
	.set(84, skyDate(2_023, 3, 30))
	.set(85, skyDate(2_023, 4, 13))
	.set(86, skyDate(2_023, 4, 27))
	.set(87, skyDate(2_023, 5, 11))
	.set(88, skyDate(2_023, 5, 25))
	.set(89, skyDate(2_023, 6, 8))
	.set(90, skyDate(2_023, 6, 22))
	.set(91, skyDate(2_023, 7, 6))
	.set(92, skyDate(2_023, 7, 20))
	.set(93, skyDate(2_023, 8, 3))
	.set(94, skyDate(2_023, 8, 17))
	.set(95, skyDate(2_023, 8, 31))
	.set(96, skyDate(2_023, 9, 14))
	.set(97, skyDate(2_023, 9, 28))
	.set(98, skyDate(2_023, 10, 12))
	.set(99, skyDate(2_023, 10, 26))
	.set(100, skyDate(2_023, 11, 9))
	.set(101, skyDate(2_023, 11, 23))
	.set(102, skyDate(2_023, 12, 7))
	.set(103, skyDate(2_023, 12, 21))
	.set(104, skyDate(2_024, 1, 4))
	.set(105, skyDate(2_024, 1, 18))
	.set(106, skyDate(2_024, 2, 1))
	.set(107, skyDate(2_024, 2, 15))
	.set(108, skyDate(2_024, 2, 29))
	.set(109, skyDate(2_024, 3, 14))
	.set(110, skyDate(2_024, 3, 28))
	.set(111, skyDate(2_024, 4, 11))
	.set(112, skyDate(2_024, 4, 25))
	.set(113, skyDate(2_024, 5, 9))
	.set(114, skyDate(2_024, 5, 23))
	.set(115, skyDate(2_024, 6, 6))
	.set(116, skyDate(2_024, 6, 20))
	.set(117, skyDate(2_024, 7, 4))
	.set(118, skyDate(2_024, 7, 18))
	.set(119, skyDate(2_024, 8, 1))
	.set(120, skyDate(2_024, 8, 15))
	.set(121, skyDate(2_024, 8, 29))
	.set(122, skyDate(2_024, 9, 12))
	.set(123, skyDate(2_024, 9, 26))
	.set(124, skyDate(2_024, 10, 10))
	.set(125, skyDate(2_024, 10, 24))
	.set(126, skyDate(2024, 11, 7))
	.set(127, skyDate(2024, 11, 21));

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
	.set(6, { start: skyDate(2_024, 9, 16), end: skyDate(2_024, 9, 30) });

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

export type SeasonalSpiritVisitTravellingData = Collection<number, DateTime>;

export type SeasonalSpiritVisitReturningData = Collection<number, ReturningDatesData>;

interface SeasonalSpiritVisitData {
	travelling?: number[];
	travellingErrors?: number[];
	returning?: number[];
}

interface SeasonalSpiritVisit {
	travelling: SeasonalSpiritVisitTravellingData;
	travellingErrors: SeasonalSpiritVisitTravellingData;
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
				}, new Collection<number, DateTime>()) ?? new Collection<number, DateTime>(),
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
		const lastTravelling = travelling.last();
		const firstReturning = returning.first();

		return {
			visited: Boolean(
				(firstTravelling && firstTravelling <= date) ||
					(firstReturning && firstReturning.start <= date),
			),
			current: {
				travelling: Boolean(
					lastTravelling && date >= lastTravelling && date < lastTravelling.plus({ days: 4 }),
				),
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
