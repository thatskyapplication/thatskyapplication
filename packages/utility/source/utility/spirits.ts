import type { Cosmetic, CosmeticCommon } from "../cosmetics.js";
import type { SeasonIds } from "../season.js";
import type { EventIds } from "./event.js";

export const SpiritId = {
	// Isle of Dawn.
	PointingCandlemaker: 0,
	UsheringStargazer: 1,
	RejectingVoyager: 2,
	ElderOfTheIsle: 3,

	// Daylight Prairie.
	ButterflyCharmer: 4,
	ApplaudingBellmaker: 5,
	WavingBellmaker: 6,
	SlumberingShipwright: 7,
	LaughingLightCatcher: 8,
	BirdWhisperer: 9,
	ExhaustedDockWorker: 10,
	CeremonialWorshiper: 11,
	ElderOfThePrairie: 12,

	// Hidden Forest.
	ShiveringTrailblazer: 13,
	BlushingProspector: 14,
	HideNSeekPioneer: 15,
	PoutyPorter: 16,
	DismayedHunter: 17,
	ApologeticLumberjack: 18,
	TearfulLightMiner: 19,
	WhaleWhisperer: 20,
	ElderOfTheForest: 21,

	// Valley of Triumph.
	ConfidentSightseer: 22,
	HandstandingThrillseeker: 23,
	MantaWhisperer: 24,
	BackflippingChampion: 25,
	CheerfulSpectator: 26,
	BowingMedalist: 27,
	ProudVictor: 28,
	ElderOfTheValley: 29,

	// Golden Wasteland.
	FrightenedRefugee: 30,
	FaintingWarrior: 31,
	CourageousSoldier: 32,
	StealthySurvivor: 33,
	SalutingCaptain: 34,
	LookoutScout: 35,
	ElderOfTheWasteland: 36,

	// Vault of Knowledge.
	PrayingAcolyte: 37,
	LevitatingAdept: 38,
	PoliteScholar: 39,
	MemoryWhisperer: 40,
	MeditatingMonastic: 41,
	ElderOfTheVault: 42,

	// Season of Gratitude.
	GratitudeGuide: 43,
	SassyDrifter: 44,
	StretchingGuru: 45,
	ProvokingPerformer: 46,
	LeapingDancer: 47,
	SalutingProtector: 48,
	GreetingShaman: 49,

	// Season of Lightseekers.
	LightseekerGuide: 50,
	PiggybackLightseeker: 51,
	DoublefiveLightCatcher: 52,
	LaidbackPioneer: 53,
	TwirlingChampion: 54,
	CrabWhisperer: 55,
	ShushingLightScholar: 56,

	// Season of Belonging.
	BelongingGuide: 57,
	BoogieKid: 58,
	ConfettiCousin: 59,
	HairtousleTeen: 60,
	SparklerParent: 61,
	PleafulParent: 62,
	WiseGrandparent: 63,

	// Season of Rhythm.
	RhythmGuide: 64,
	TroupeGreeter: 65,
	FestivalSpinDancer: 66,
	AdmiringActor: 67,
	TroupeJuggler: 68,
	RespectfulPianist: 69,
	ThoughtfulDirector: 70,

	// Season of Enchantment.
	EnchantmentGuide: 71,
	NoddingMuralist: 72,
	IndifferentAlchemist: 73,
	CrabWalker: 74,
	ScarecrowFarmer: 75,
	SnoozingCarpenter: 76,
	PlayfightingHerbalist: 77,

	// Season of Sanctuary.
	SanctuaryGuide: 78,
	JellyWhisperer: 79,
	TimidBookworm: 80,
	RallyingThrillseeker: 81,
	HikingGrouch: 82,
	GratefulShellCollector: 83,
	ChillSunbather: 84,

	// Season of Prophecy.
	ProphecyGuide: 85,
	ProphetOfWater: 86,
	ProphetOfEarth: 87,
	ProphetOfAir: 88,
	ProphetOfFire: 89,

	// Season of Dreams.
	DreamsGuide: 90,
	SpinningMentor: 91,
	DancingPerformer: 92,
	PeekingPostman: 93,
	BearhugHermit: 94,

	// Season of Assembly.
	AssemblyGuide: 95,
	BaffledBotanist: 96,
	ScoldingStudent: 97,
	ScaredyCadet: 98,
	MarchingAdventurer: 99,
	ChucklingScout: 100,
	DaydreamForester: 101,

	// Season of Little Prince.
	TheRose: 102,
	BeckoningRuler: 103,
	GloatingNarcissist: 104,
	StretchingLamplighter: 105,
	SlouchingSoldier: 106,
	SneezingGeographer: 107,
	StarCollector: 108,

	// Season of Flight.
	FlightGuide: 109,
	LivelyNavigator: 110,
	LightWhisperer: 111,
	TinkeringChimesmith: 112,
	TalentedBuilder: 113,

	// Season of Abyss.
	AbyssGuide: 114,
	AnxiousAngler: 115,
	CeasingCommodore: 116,
	BumblingBoatswain: 117,
	CacklingCannoneer: 118,

	// Season of Performance.
	PerformanceGuide: 119,
	FranticStagehand: 120,
	ForgetfulStoryteller: 121,
	MellowMusician: 122,
	ModestDancer: 123,

	// Season of Shattering.
	TheVoidOfShattering: 124,
	AncientLight1: 125,
	AncientLight2: 126,
	AncientDarkness1: 127,
	AncientDarkness2: 128,

	// Season of AURORA.
	AURORA: 129,
	RunningWayfarer: 130,
	MindfulMiner: 131,
	WarriorOfLove: 132,
	SeedOfHope: 133,

	// Season of Remembrance.
	RemembranceGuide: 134,
	BereftVeteran: 135,
	PleadingChild: 136,
	TiptoeingTeaBrewer: 137,
	WoundedWarrior: 138,

	// Season of Passage.
	PassageGuide: 139,
	OddballOutcast: 140,
	TumblingTroublemaker: 141,
	MelancholyMope: 142,
	OveractiveOverachiever: 143,

	// Season of Moments.
	MomentsGuide: 144,
	ReassuringRanger: 145,
	NightbirdWhisperer: 146,
	JollyGeologist: 147,
	AsceticMonk: 148,

	// Season of Revival.
	HopefulSteward: 149,
	VestigeOfADesertedOasis: 150,
	MemoryOfALostVillage: 151,
	EchoOfAnAbandonedRefuge: 152,
	RemnantOfAForgottenHaven: 153,

	// Season of the Nine-Coloured Deer.
	SpiritOfMural: 154,
	HerbGatherer: 155,
	Hunter: 156,
	FeudalLord: 157,
	Princess: 158,

	// Season of Nesting.
	NestingGuide: 159,
	NestingSolarium: 160,
	NestingLoft: 161,
	NestingAtrium: 162,
	NestingNook: 163,

	// Season of Duets.
	DuetsGuide: 164,
	TheCellistsBeginnings: 165,
	ThePianistsBeginnings: 166,
	TheMusiciansLegacy: 167,
	TheCellistsFlourishing: 168,
	ThePianistsFlourishing: 169,
	CompassionateCellist: 170,

	// Season of Moomin.
	TheMoominStorybook: 171,
	ComfortOfKindness: 172,
	SenseOfSelf: 173,
	SpiritOfAdventure: 174,
	InspirationOfInclusion: 175,

	// Season of Radiance.
	RadianceGuide: 176,
	RadianceLeapingDancer: 177,
	RadianceProvokingPerformer: 178,
	RadianceGreetingShaman: 179,

	// Season of the Blue Bird.
	BlueBirdGuide: 180,
	CostumedConfettiCousin: 181,
	DiviningWiseGrandparent: 182,
	WoodcuttingPleafulParent: 183,
	NostalgicSparklerParent: 184,
	RoyalHairtousleTeen: 185,

	// Season of The Two Embers - Part 1.
	VaultEldersLantern: 186,
	TenderToymaker: 187,
	ScarredSentry: 188,
	SternShepherd: 189,
	ResourcefulRecluse: 190,
	CaringCompanion: 191,

	// Season of Migration.
	MigrationGuide: 192,
	MigratingBellmaker: 193,
	MigratingBirdWhisperer: 194,
	MigratingButterflyCharmer: 195,
	MigratingJellyWhisperer: 196,
	MigratingMantaWhisperer: 197,
} as const satisfies Readonly<Record<string, number>>;

const SPIRIT_ID_VALUES = Object.values(SpiritId);
export type SpiritIds = (typeof SPIRIT_ID_VALUES)[number];

export function isSpiritId(spiritId: number): spiritId is SpiritIds {
	return SPIRIT_ID_VALUES.includes(spiritId as SpiritIds);
}

export enum SpiritEmote {
	Sit = "Sit",
	Point = "Point",
	Come = "Come",
	NoThanks = "No thanks",
	Welcome = "Welcome",
	Nod = "Nod",
	Scold = "Scold",
	Butterfly = "Butterfly",
	Clap = "Clap",
	Wave = "Wave",
	Laugh = "Laugh",
	Yawn = "Yawn",
	WipeBrow = "Wipe brow",
	Teamwork = "Teamwork",
	BlowKiss = "Blow kiss",
	Grateful = "Grateful",
	BellyScratch = "Belly scratch",
	Chuckle = "Chuckle",
	Shiver = "Shiver",
	HideAndSeek = "Hide and seek",
	Angry = "Angry",
	Shy = "Shy",
	Shocked = "Shocked",
	Apologise = "Apologise",
	Crying = "Crying",
	Kabuki = "Kabuki",
	Shrug = "Shrug",
	Grumpy = "Grumpy",
	Peek = "Peek",
	Eww = "Eww",
	Facepalm = "Facepalm",
	Handstand = "Handstand",
	Backflip = "Backflip",
	Bow = "Bow",
	Cheer = "Cheer",
	Leap = "Leap",
	TripleAxel = "Triple axel",
	Confetti = "Confetti",
	BoogieDance = "Boogie dance",
	SpinDance = "Spin dance",
	Juggle = "Juggle",
	CrabWalk = "Crab walk",
	RallyCheer = "Rally cheer",
	SpinTrick = "Spin trick",
	ShowDance = "Show dance",
	Duck = "Duck",
	Faint = "Faint",
	Respect = "Respect",
	LookAround = "Look around",
	Salute = "Salute",
	Acknowledge = "Acknowledge",
	KungFu = "Kung Fu",
	DontGo = "Don't go!",
	Boo = "Boo",
	DustOff = "Dust off",
	ChestPound = "Chest pound",
	Marching = "Marching",
	Telekinesis = "Telekinesis",
	Float = "Float",
	Pray = "Pray",
	Yoga = "Yoga",
	Shush = "Shush",
	Sparkler = "Sparkler",
	Thinking = "Thinking",
	Doze = "Doze",
	Balance = "Balance",
	DeepBreath = "Deep breath",
	Bubbles = "Bubbles",
	Beckon = "Beckon",
	Gloat = "Gloat",
	Stretch = "Stretch",
	Slouch = "Slouch",
	Sneeze = "Sneeze",
	HandRub = "Hand rub",
	Voilà = "Voilà",
	Navigate = "Navigate",
	CalmDown = "Calm down",
	EvilLaugh = "Evil laugh",
	Ouch = "Ouch",
	Anxious = "Anxious",
	Headbob = "Headbob",
	Aww = "Aww",
	WavingLight = "Waving light",
	RaiseTheRoof = "Raise the roof",
	Twirl = "Twirl",
	RhythmicClap = "Rhythmic clap",
	Conduct = "Conduct",
	SilentClap = "Silent clap",
	Skipping = "Skipping",
	Pleading = "Pleading",
	Tiptoeing = "Tiptoeing",
	Grieving = "Grieving",
	HackySack = "Hacky sack",
	Somersault = "Somersault",
	Moping = "Moping",
	PullUp = "Pull-up",
	JollyDance = "Jolly dance",
	BlindfoldBalancePose = "Blindfold balance pose",
	CureForMeDance = "Cure for me dance",
	Whistle = "Whistle",
	Flex = "Flex",
	FloatSpin = "Float spin",
	Read = "Read",
	Cartwheel = "Cartwheel",
	HypeDance = "Hype dance",
	HeartGesture = "Heart gesture",
	Cough = "Cough",
	Amazed = "Amazed",
	FlagSignal = "Flag signal",
	FlightRun = "Flight run",
	JellyfishDance = "Jellyfish dance",
	Dizzy = "Dizzy",
}

export enum FriendAction {
	HoldHand = "Hold hand",
	HighFive = "High-five",
	Hug = "Hug",
	FistBump = "Fist bump",
	DoubleFive = "Double-five",
	HairTousle = "Hair tousle",
	Carry = "Carry",
	PlayFight = "Play fight",
	Bearhug = "Bearhug",
	Handshake = "Handshake",
	DuetDance = "Duet dance",
	SideHug = "Side hug",
	CradleCarry = "Cradle carry",
	DuetBow = "Duet bow",
}

export enum SpiritType {
	Standard = 0,
	Elder = 1,
	Seasonal = 2,
	Guide = 3,
}

interface ItemCostRaw {
	money?: number;
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
	seasonalHearts?: number;
	eventTickets?: number;
}

interface ItemRawTranslation {
	key: CosmeticCommon;
	number?: number;
}

interface BaseItemRawWithoutChildren {
	level?: 2 | 3 | 4 | 5 | 6;
	seasonPass?: boolean;
	cost?: ItemCostRaw;
	regularHeart?: boolean;
}

interface ItemRawSingleCosmeticWithoutChildren extends BaseItemRawWithoutChildren {
	translation?:
		| Exclude<
				CosmeticCommon,
				| CosmeticCommon.WingBuffMultiple
				| CosmeticCommon.BlessingMultiple
				| CosmeticCommon.QuestMultiple
				| CosmeticCommon.HeartMultiple
				| CosmeticCommon.MusicSheetMultiple
		  >
		| ItemRawTranslation;
	cosmetic: Cosmetic;
}

interface ItemRawMultipleCosmeticsWithoutChildren extends BaseItemRawWithoutChildren {
	translation?: CosmeticCommon | ItemRawTranslation;
	cosmetic: readonly [Cosmetic, ...Cosmetic[]];
	cosmeticDisplay: Cosmetic;
}

export type ItemRawWithoutChildren =
	| ItemRawSingleCosmeticWithoutChildren
	| ItemRawMultipleCosmeticsWithoutChildren;

export type ItemRawWithPossibleChildren = ItemRawWithoutChildren & {
	/**
	 * Rarely, ultimates shrink to fit in the friendship tree.
	 */
	thirdHeight?: boolean;
	children?: readonly ItemRawWithoutChildren[];
};

export type ItemRaw = ItemRawWithoutChildren | ItemRawWithPossibleChildren;

interface ItemCostSeasonal {
	cost: number;
	seasonId: SeasonIds;
}

interface ItemCostEvent {
	cost: number;
	eventId: EventIds;
}

export interface ItemCost {
	money?: number;
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles: ItemCostSeasonal[];
	seasonalHearts: ItemCostSeasonal[];
	eventTickets: ItemCostEvent[];
}

interface ItemTranslation {
	key: `cosmetic-common-names.${CosmeticCommon}`;
	number?: number;
}

export interface ItemWithoutChildren {
	translation: ItemTranslation | null;
	cosmetics: readonly [Cosmetic, ...Cosmetic[]];
	cosmeticDisplay: Cosmetic;
	level: 2 | 3 | 4 | 5 | 6 | null;
	seasonPass: boolean;
	cost: ItemCost | null;
	regularHeart: boolean;
}

export interface ItemWithPossibleChildren extends ItemWithoutChildren {
	/**
	 * Rarely, ultimates shrink to fit in the friendship tree.
	 */
	thirdHeight: boolean;
	children: readonly ItemWithoutChildren[];
}

export type Item = ItemWithoutChildren | ItemWithPossibleChildren;

export type LegacyFriendshipTree = readonly (
	| readonly [ItemWithoutChildren]
	| readonly [ItemWithoutChildren, ItemWithPossibleChildren]
	| readonly [ItemWithPossibleChildren, ItemWithPossibleChildren | null, ItemWithPossibleChildren]
)[];

export type FriendshipTree = readonly (readonly [
	ItemWithoutChildren | null,
	(ItemWithoutChildren | null)?,
	(ItemWithoutChildren | null)?,
])[];

export const SpiritsHistoryOrderType = {
	Natural: 0,
	Rarity: 1,
} as const satisfies Readonly<Record<string, number>>;

export type SpiritsHistoryOrderTypes =
	(typeof SpiritsHistoryOrderType)[keyof typeof SpiritsHistoryOrderType];

export const SPIRITS_HISTORY_ORDER_TYPE_VALUES = Object.values(SpiritsHistoryOrderType);

export function isSpiritsHistoryOrderType(type: number): type is SpiritsHistoryOrderTypes {
	return SPIRITS_HISTORY_ORDER_TYPE_VALUES.includes(type as SpiritsHistoryOrderTypes);
}

export function friendshipTreeToItems(
	friendshipTree: FriendshipTree | LegacyFriendshipTree,
): readonly ItemWithoutChildren[] {
	const result = [];

	for (const items of friendshipTree) {
		for (const item of items) {
			if (!item) {
				continue;
			}

			result.push(item);

			if ("children" in item) {
				result.push(...item.children);
			}
		}
	}

	return result;
}
