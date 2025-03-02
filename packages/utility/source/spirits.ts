import { Collection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import type { Cosmetic } from "./cosmetics.js";
import { skyDate } from "./dates.js";
import type { EventIds } from "./event.js";
import type { SeasonIds } from "./season.js";

export const SpiritId = {
	// Isles of Dawn.
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
}

export enum SpiritStance {
	Base = "Base",
	Courageous = "Courageous",
	Confident = "Confident",
	Sneaky = "Sneaky",
	Proud = "Proud",
	Polite = "Polite",
	Sassy = "Sassy",
	Laidback = "Laidback",
	Wise = "Wise",
	Timid = "Timid",
	Tinker = "Tinker",
	Injured = "Injured",
}

export enum SpiritCall {
	Base = "Base",
	Bird = "Bird",
	Whale = "Whale",
	Manta = "Manta",
	CosmicManta = "Cosmic manta",
	Crab = "Crab",
	Jellyfish = "Jellyfish",
	BabyManta = "Baby manta",
	Nightbird = "Nightbird",

	// Kizuna-AI pin.
	KizunaAI = "Kizuna-AI",

	// PlayStation starter pack.
	Journey = "Journey",

	// Season of Moomin.
	Ninny = "Ninny",
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

export const SPIRIT_TYPE = {
	Standard: 0,
	Elder: 1,
	Seasonal: 2,
	Guide: 3,
} as const satisfies Readonly<Record<string, number>>;

export type SpiritType = (typeof SPIRIT_TYPE)[keyof typeof SPIRIT_TYPE];

interface ItemCostRaw {
	money?: number;
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
	seasonalHearts?: number;
	eventTickets?: number;
}

export interface ItemRaw {
	name: string;
	cosmetic: Cosmetic | Cosmetic[];
	cost?: ItemCostRaw;
}

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
	seasonalCandles?: ItemCostSeasonal[];
	seasonalHearts?: ItemCostSeasonal[];
	eventTickets?: ItemCostEvent[];
}

export interface Item {
	name: string;
	cosmetics: Cosmetic[];
	cost: ItemCost | null;
}

interface TravellingDatesData {
	spiritId: SpiritIds;
	start: DateTime;
	end: DateTime;
}

export const TRAVELLING_DATES = new Collection<number, TravellingDatesData>()
	.set(1, {
		spiritId: SpiritId.SassyDrifter,
		start: skyDate(2020, 1, 31, 12),
		end: skyDate(2020, 2, 3),
	})
	.set(2, {
		spiritId: SpiritId.DoublefiveLightCatcher,
		start: skyDate(2020, 2, 14, 12),
		end: skyDate(2020, 2, 17),
	})
	.set(3, {
		spiritId: SpiritId.LaidbackPioneer,
		start: skyDate(2020, 2, 27),
		end: skyDate(2020, 3, 2),
	})
	.set(4, {
		spiritId: SpiritId.ProvokingPerformer,
		start: skyDate(2020, 3, 12),
		end: skyDate(2020, 3, 16),
	})
	.set(5, {
		spiritId: SpiritId.PleafulParent,
		start: skyDate(2020, 3, 26),
		end: skyDate(2020, 3, 30),
	})
	.set(6, {
		spiritId: SpiritId.CrabWhisperer,
		start: skyDate(2020, 4, 9),
		end: skyDate(2020, 4, 13),
	})
	.set(7, {
		spiritId: SpiritId.PiggybackLightseeker,
		start: skyDate(2020, 4, 16),
		end: skyDate(2020, 4, 20),
	})
	.set(8, {
		spiritId: SpiritId.StretchingGuru,
		start: skyDate(2020, 4, 30),
		end: skyDate(2020, 5, 4),
	})
	.set(9, {
		spiritId: SpiritId.SparklerParent,
		start: skyDate(2020, 5, 14),
		end: skyDate(2020, 5, 18),
	})
	.set(10, {
		spiritId: SpiritId.SassyDrifter,
		start: skyDate(2020, 5, 28),
		end: skyDate(2020, 6, 1),
	})
	.set(11, {
		spiritId: SpiritId.HairtousleTeen,
		start: skyDate(2020, 6, 11),
		end: skyDate(2020, 6, 15),
	})
	.set(12, {
		spiritId: SpiritId.LeapingDancer,
		start: skyDate(2020, 6, 25),
		end: skyDate(2020, 6, 29),
	})
	.set(13, {
		spiritId: SpiritId.ConfettiCousin,
		start: skyDate(2020, 7, 9),
		end: skyDate(2020, 7, 13),
	})
	.set(14, {
		spiritId: SpiritId.GreetingShaman,
		start: skyDate(2020, 7, 23),
		end: skyDate(2020, 7, 27),
	})
	.set(15, {
		spiritId: SpiritId.WiseGrandparent,
		start: skyDate(2020, 8, 6),
		end: skyDate(2020, 8, 10),
	})
	.set(16, {
		spiritId: SpiritId.ShushingLightScholar,
		start: skyDate(2020, 8, 20),
		end: skyDate(2020, 8, 24),
	})
	.set(17, {
		spiritId: SpiritId.FestivalSpinDancer,
		start: skyDate(2020, 9, 3),
		end: skyDate(2020, 9, 7),
	})
	.set(18, {
		spiritId: SpiritId.TwirlingChampion,
		start: skyDate(2020, 9, 17),
		end: skyDate(2020, 9, 21),
	})
	.set(19, {
		spiritId: SpiritId.ProvokingPerformer,
		start: skyDate(2020, 10, 1),
		end: skyDate(2020, 10, 5),
	})
	.set(20, {
		spiritId: SpiritId.AdmiringActor,
		start: skyDate(2020, 10, 15),
		end: skyDate(2020, 10, 19),
	})
	.set(21, {
		spiritId: SpiritId.IndifferentAlchemist,
		start: skyDate(2020, 10, 29),
		end: skyDate(2020, 11, 2),
	})
	.set(22, {
		spiritId: SpiritId.BoogieKid,
		start: skyDate(2020, 11, 12),
		end: skyDate(2020, 11, 16),
	})
	.set(23, {
		spiritId: SpiritId.LaidbackPioneer,
		start: skyDate(2020, 11, 26),
		end: skyDate(2020, 11, 30),
	})
	.set(24, {
		spiritId: SpiritId.PleafulParent,
		start: skyDate(2020, 12, 10),
		end: skyDate(2020, 12, 14),
	})
	.set(25, {
		spiritId: SpiritId.TroupeGreeter,
		start: skyDate(2020, 12, 24),
		end: skyDate(2020, 12, 28),
	})
	.set(26, {
		spiritId: SpiritId.NoddingMuralist,
		start: skyDate(2021, 1, 7),
		end: skyDate(2021, 1, 11),
	})
	.set(27, {
		spiritId: SpiritId.ConfettiCousin,
		start: skyDate(2021, 1, 21),
		end: skyDate(2021, 1, 25),
	})
	.set(28, {
		spiritId: SpiritId.RespectfulPianist,
		start: skyDate(2021, 2, 4),
		end: skyDate(2021, 2, 8),
	})
	.set(29, {
		spiritId: SpiritId.CrabWalker,
		start: skyDate(2021, 2, 18),
		end: skyDate(2021, 2, 22),
	})
	.set(30, {
		spiritId: SpiritId.PiggybackLightseeker,
		start: skyDate(2021, 3, 4),
		end: skyDate(2021, 3, 8),
	})
	.set(31, {
		spiritId: SpiritId.LeapingDancer,
		start: skyDate(2021, 3, 18),
		end: skyDate(2021, 3, 22),
	})
	.set(32, {
		spiritId: SpiritId.SparklerParent,
		start: skyDate(2021, 4, 1),
		end: skyDate(2021, 4, 5),
	})
	.set(33, {
		spiritId: SpiritId.DoublefiveLightCatcher,
		start: skyDate(2021, 4, 15),
		end: skyDate(2021, 4, 19),
	})
	.set(34, {
		spiritId: SpiritId.RallyingThrillseeker,
		start: skyDate(2021, 4, 29),
		end: skyDate(2021, 5, 3),
	})
	.set(35, {
		spiritId: SpiritId.ThoughtfulDirector,
		start: skyDate(2021, 5, 13),
		end: skyDate(2021, 5, 17),
	})
	.set(36, {
		spiritId: SpiritId.SnoozingCarpenter,
		start: skyDate(2021, 5, 27),
		end: skyDate(2021, 5, 31),
	})
	.set(37, {
		spiritId: SpiritId.TimidBookworm,
		start: skyDate(2021, 6, 10),
		end: skyDate(2021, 6, 14),
	})
	.set(38, {
		spiritId: SpiritId.AdmiringActor,
		start: skyDate(2021, 6, 24),
		end: skyDate(2021, 6, 28),
	})
	.set(39, {
		spiritId: SpiritId.SassyDrifter,
		start: skyDate(2021, 7, 8),
		end: skyDate(2021, 7, 12),
	})
	.set(40, {
		spiritId: SpiritId.BoogieKid,
		start: skyDate(2021, 7, 22),
		end: skyDate(2021, 7, 26),
	})
	.set(41, {
		spiritId: SpiritId.ProphetOfWater,
		start: skyDate(2021, 8, 5),
		end: skyDate(2021, 8, 9),
	})
	.set(42, {
		spiritId: SpiritId.ChillSunbather,
		start: skyDate(2021, 8, 19),
		end: skyDate(2021, 8, 23),
	})
	.set(43, {
		spiritId: SpiritId.CrabWhisperer,
		start: skyDate(2021, 9, 1),
		end: skyDate(2021, 9, 5),
	})
	.set(44, {
		spiritId: SpiritId.TroupeJuggler,
		start: skyDate(2021, 9, 16),
		end: skyDate(2021, 9, 20),
	})
	.set(45, {
		spiritId: SpiritId.GratefulShellCollector,
		start: skyDate(2021, 9, 30),
		end: skyDate(2021, 10, 4),
	})
	.set(46, {
		spiritId: SpiritId.FestivalSpinDancer,
		start: skyDate(2021, 10, 14),
		end: skyDate(2021, 10, 18),
	})
	.set(47, {
		spiritId: SpiritId.PlayfightingHerbalist,
		start: skyDate(2021, 10, 28),
		end: skyDate(2021, 11, 1),
	})
	.set(48, {
		spiritId: SpiritId.WiseGrandparent,
		start: skyDate(2021, 11, 11),
		end: skyDate(2021, 11, 15),
	})
	.set(49, {
		spiritId: SpiritId.JellyWhisperer,
		start: skyDate(2021, 11, 25),
		end: skyDate(2021, 11, 29),
	})
	.set(50, {
		spiritId: SpiritId.ProphetOfFire,
		start: skyDate(2021, 12, 9),
		end: skyDate(2021, 12, 13),
	})
	.set(51, {
		spiritId: SpiritId.SparklerParent,
		start: skyDate(2021, 12, 23),
		end: skyDate(2021, 12, 27),
	})
	.set(52, {
		spiritId: SpiritId.TwirlingChampion,
		start: skyDate(2022, 1, 6),
		end: skyDate(2022, 1, 10),
	})
	.set(53, {
		spiritId: SpiritId.SalutingProtector,
		start: skyDate(2022, 1, 20),
		end: skyDate(2022, 1, 24),
	})
	.set(54, {
		spiritId: SpiritId.ProphetOfEarth,
		start: skyDate(2022, 2, 3),
		end: skyDate(2022, 2, 7),
	})
	.set(55, {
		spiritId: SpiritId.HikingGrouch,
		start: skyDate(2022, 2, 17),
		end: skyDate(2022, 2, 21),
	})
	.set(56, {
		spiritId: SpiritId.TroupeGreeter,
		start: skyDate(2022, 3, 3),
		end: skyDate(2022, 3, 7),
	})
	.set(57, {
		spiritId: SpiritId.StretchingGuru,
		start: skyDate(2022, 3, 17),
		end: skyDate(2022, 3, 21),
	})
	.set(58, {
		spiritId: SpiritId.ScarecrowFarmer,
		start: skyDate(2022, 3, 31),
		end: skyDate(2022, 4, 4),
	})
	.set(59, {
		spiritId: SpiritId.SpinningMentor,
		start: skyDate(2022, 4, 14),
		end: skyDate(2022, 4, 18),
	})
	.set(60, {
		spiritId: SpiritId.DaydreamForester,
		start: skyDate(2022, 4, 28),
		end: skyDate(2022, 5, 2),
	})
	.set(61, {
		spiritId: SpiritId.ProphetOfAir,
		start: skyDate(2022, 5, 12),
		end: skyDate(2022, 5, 16),
	})
	.set(62, {
		spiritId: SpiritId.GreetingShaman,
		start: skyDate(2022, 5, 26),
		end: skyDate(2022, 5, 30),
	})
	.set(63, {
		spiritId: SpiritId.HairtousleTeen,
		start: skyDate(2022, 6, 9),
		end: skyDate(2022, 6, 13),
	})
	.set(64, {
		spiritId: SpiritId.PeekingPostman,
		start: skyDate(2022, 6, 23),
		end: skyDate(2022, 6, 27),
	})
	.set(65, {
		spiritId: SpiritId.TimidBookworm,
		start: skyDate(2022, 7, 7),
		end: skyDate(2022, 7, 11),
	})
	.set(66, {
		spiritId: SpiritId.DoublefiveLightCatcher,
		start: skyDate(2022, 7, 21),
		end: skyDate(2022, 7, 27),
	})
	.set(67, {
		spiritId: SpiritId.ThoughtfulDirector,
		start: skyDate(2022, 8, 4),
		end: skyDate(2022, 8, 8),
	})
	.set(68, {
		spiritId: SpiritId.ScoldingStudent,
		start: skyDate(2022, 8, 18),
		end: skyDate(2022, 8, 22),
	})
	.set(69, {
		spiritId: SpiritId.IndifferentAlchemist,
		start: skyDate(2022, 9, 1),
		end: skyDate(2022, 9, 5),
	})
	.set(70, {
		spiritId: SpiritId.ShushingLightScholar,
		start: skyDate(2022, 9, 15),
		end: skyDate(2022, 9, 19),
	})
	.set(71, {
		spiritId: SpiritId.BeckoningRuler,
		start: skyDate(2022, 9, 29),
		end: skyDate(2022, 10, 3),
	})
	.set(72, {
		spiritId: SpiritId.LaidbackPioneer,
		start: skyDate(2022, 10, 13),
		end: skyDate(2022, 10, 17),
	})
	.set(73, {
		spiritId: SpiritId.NoddingMuralist,
		start: skyDate(2022, 10, 27),
		end: skyDate(2022, 10, 31),
	})
	.set(74, {
		spiritId: SpiritId.ProphetOfWater,
		start: skyDate(2022, 11, 10),
		end: skyDate(2022, 11, 14),
	})
	.set(75, {
		spiritId: SpiritId.BearhugHermit,
		start: skyDate(2022, 11, 24),
		end: skyDate(2022, 11, 28),
	})
	.set(76, {
		spiritId: SpiritId.SassyDrifter,
		start: skyDate(2022, 12, 8),
		end: skyDate(2022, 12, 12),
	})
	.set(77, {
		spiritId: SpiritId.PleafulParent,
		start: skyDate(2022, 12, 22),
		end: skyDate(2022, 12, 26),
	})
	.set(78, {
		spiritId: SpiritId.BaffledBotanist,
		start: skyDate(2023, 1, 5),
		end: skyDate(2023, 1, 9),
	})
	.set(79, {
		spiritId: SpiritId.RallyingThrillseeker,
		start: skyDate(2023, 1, 19),
		end: skyDate(2023, 1, 23),
	})
	.set(80, {
		spiritId: SpiritId.PiggybackLightseeker,
		start: skyDate(2023, 2, 2),
		end: skyDate(2023, 2, 6),
	})
	.set(81, {
		spiritId: SpiritId.SlouchingSoldier,
		start: skyDate(2023, 2, 16),
		end: skyDate(2023, 2, 20),
	})
	.set(82, {
		spiritId: SpiritId.BoogieKid,
		start: skyDate(2023, 3, 2),
		end: skyDate(2023, 3, 6),
	})
	.set(83, {
		spiritId: SpiritId.CrabWalker,
		start: skyDate(2023, 3, 16),
		end: skyDate(2023, 3, 20),
	})
	.set(84, {
		spiritId: SpiritId.ProvokingPerformer,
		start: skyDate(2023, 3, 30),
		end: skyDate(2023, 4, 3),
	})
	.set(85, {
		spiritId: SpiritId.SneezingGeographer,
		start: skyDate(2023, 4, 13),
		end: skyDate(2023, 4, 17),
	})
	.set(86, {
		spiritId: SpiritId.SnoozingCarpenter,
		start: skyDate(2023, 4, 27),
		end: skyDate(2023, 5, 1),
	})
	.set(87, {
		spiritId: SpiritId.TinkeringChimesmith,
		start: skyDate(2023, 5, 11),
		end: skyDate(2023, 5, 15),
	})
	.set(88, {
		spiritId: SpiritId.GratefulShellCollector,
		start: skyDate(2023, 5, 25),
		end: skyDate(2023, 5, 29),
	})
	.set(89, {
		spiritId: SpiritId.AdmiringActor,
		start: skyDate(2023, 6, 8),
		end: skyDate(2023, 6, 12),
	})
	.set(90, {
		spiritId: SpiritId.SparklerParent,
		start: skyDate(2023, 6, 22),
		end: skyDate(2023, 6, 26),
	})
	.set(91, {
		spiritId: SpiritId.SpinningMentor,
		start: skyDate(2023, 7, 6),
		end: skyDate(2023, 7, 10),
	})
	.set(92, {
		spiritId: SpiritId.GloatingNarcissist,
		start: skyDate(2023, 7, 20),
		end: skyDate(2023, 7, 24),
	})
	.set(93, {
		spiritId: SpiritId.ProphetOfFire,
		start: skyDate(2023, 8, 3),
		end: skyDate(2023, 8, 7),
	})
	.set(94, {
		spiritId: SpiritId.LivelyNavigator,
		start: skyDate(2023, 8, 17),
		end: skyDate(2023, 8, 21),
	})
	.set(95, {
		spiritId: SpiritId.JellyWhisperer,
		start: skyDate(2023, 8, 31),
		end: skyDate(2023, 9, 4),
	})
	.set(96, {
		spiritId: SpiritId.StarCollector,
		start: skyDate(2023, 9, 14),
		end: skyDate(2023, 9, 18),
	})
	.set(97, {
		spiritId: SpiritId.ConfettiCousin,
		start: skyDate(2023, 9, 28),
		end: skyDate(2023, 10, 2),
	})
	.set(98, {
		spiritId: SpiritId.PlayfightingHerbalist,
		start: skyDate(2023, 10, 12),
		end: skyDate(2023, 10, 16),
	})
	.set(99, {
		spiritId: SpiritId.TroupeJuggler,
		start: skyDate(2023, 10, 26),
		end: skyDate(2023, 10, 30),
	})
	.set(100, {
		spiritId: SpiritId.WiseGrandparent,
		start: skyDate(2023, 11, 9),
		end: skyDate(2023, 11, 13),
	})
	.set(101, {
		spiritId: SpiritId.TalentedBuilder,
		start: skyDate(2023, 11, 23),
		end: skyDate(2023, 11, 27),
	})
	.set(102, {
		spiritId: SpiritId.StretchingLamplighter,
		start: skyDate(2023, 12, 7),
		end: skyDate(2023, 12, 11),
	})
	.set(103, {
		spiritId: SpiritId.FestivalSpinDancer,
		start: skyDate(2023, 12, 21),
		end: skyDate(2023, 12, 25),
	})
	.set(104, {
		spiritId: SpiritId.ChillSunbather,
		start: skyDate(2024, 1, 4),
		end: skyDate(2024, 1, 8),
	})
	.set(105, {
		spiritId: SpiritId.AnxiousAngler,
		start: skyDate(2024, 1, 18),
		end: skyDate(2024, 1, 22),
	})
	.set(106, {
		spiritId: SpiritId.TwirlingChampion,
		start: skyDate(2024, 2, 1),
		end: skyDate(2024, 2, 5),
	})
	.set(107, {
		spiritId: SpiritId.BearhugHermit,
		start: skyDate(2024, 2, 15),
		end: skyDate(2024, 2, 19),
	})
	.set(108, {
		spiritId: SpiritId.LightWhisperer,
		start: skyDate(2024, 2, 29),
		end: skyDate(2024, 3, 4),
	})
	.set(109, {
		spiritId: SpiritId.DaydreamForester,
		start: skyDate(2024, 3, 14),
		end: skyDate(2024, 3, 18),
	})
	.set(110, {
		spiritId: SpiritId.HairtousleTeen,
		start: skyDate(2024, 3, 28),
		end: skyDate(2024, 4, 1),
	})
	.set(111, {
		spiritId: SpiritId.SassyDrifter,
		start: skyDate(2024, 4, 11),
		end: skyDate(2024, 4, 15),
	})
	.set(112, {
		spiritId: SpiritId.DancingPerformer,
		start: skyDate(2024, 4, 25),
		end: skyDate(2024, 4, 29),
	})
	.set(113, {
		spiritId: SpiritId.TimidBookworm,
		start: skyDate(2024, 5, 9),
		end: skyDate(2024, 5, 13),
	})
	.set(114, {
		spiritId: SpiritId.DoublefiveLightCatcher,
		start: skyDate(2024, 5, 23),
		end: skyDate(2024, 5, 27),
	})
	.set(115, {
		spiritId: SpiritId.LeapingDancer,
		start: skyDate(2024, 6, 6),
		end: skyDate(2024, 6, 10),
	})
	.set(116, {
		spiritId: SpiritId.ThoughtfulDirector,
		start: skyDate(2024, 6, 20),
		end: skyDate(2024, 6, 24),
	})
	.set(117, {
		spiritId: SpiritId.BeckoningRuler,
		start: skyDate(2024, 7, 4),
		end: skyDate(2024, 7, 8),
	})
	.set(118, {
		spiritId: SpiritId.ScarecrowFarmer,
		start: skyDate(2024, 7, 18),
		end: skyDate(2024, 7, 22),
	})
	.set(119, {
		spiritId: SpiritId.MellowMusician,
		start: skyDate(2024, 8, 1),
		end: skyDate(2024, 8, 5),
	})
	.set(120, {
		spiritId: SpiritId.SpinningMentor,
		start: skyDate(2024, 8, 15),
		end: skyDate(2024, 8, 19),
	})
	.set(121, {
		spiritId: SpiritId.ProphetOfEarth,
		start: skyDate(2024, 8, 29),
		end: skyDate(2024, 9, 6),
	})
	.set(122, {
		spiritId: SpiritId.ShushingLightScholar,
		start: skyDate(2024, 9, 12),
		end: skyDate(2024, 9, 16),
	})
	.set(123, {
		spiritId: SpiritId.BaffledBotanist,
		start: skyDate(2024, 9, 26),
		end: skyDate(2024, 9, 30),
	})
	.set(124, {
		spiritId: SpiritId.BumblingBoatswain,
		start: skyDate(2024, 10, 10),
		end: skyDate(2024, 10, 14),
	})
	.set(125, {
		spiritId: SpiritId.PleafulParent,
		start: skyDate(2024, 10, 24),
		end: skyDate(2024, 10, 28),
	})
	.set(126, {
		spiritId: SpiritId.WarriorOfLove,
		start: skyDate(2024, 11, 7),
		end: skyDate(2024, 11, 11),
	})
	.set(127, {
		spiritId: SpiritId.SalutingProtector,
		start: skyDate(2024, 11, 21),
		end: skyDate(2024, 11, 25),
	})
	.set(128, {
		spiritId: SpiritId.ScoldingStudent,
		start: skyDate(2024, 12, 5),
		end: skyDate(2024, 12, 9),
	})
	.set(129, {
		spiritId: SpiritId.SalutingProtector,
		start: skyDate(2024, 12, 9),
		end: skyDate(2024, 12, 12),
	})
	.set(130, {
		spiritId: SpiritId.ProphetOfWater,
		start: skyDate(2024, 12, 19),
		end: skyDate(2024, 12, 23),
	})
	.set(131, {
		spiritId: SpiritId.TroupeGreeter,
		start: skyDate(2025, 1, 2),
		end: skyDate(2025, 1, 6),
	})
	.set(132, {
		spiritId: SpiritId.CrabWalker,
		start: skyDate(2025, 1, 16),
		end: skyDate(2025, 1, 20),
	})
	.set(133, {
		spiritId: SpiritId.ForgetfulStoryteller,
		start: skyDate(2025, 1, 30),
		end: skyDate(2025, 2, 3),
	})
	.set(134, {
		spiritId: SpiritId.PiggybackLightseeker,
		start: skyDate(2025, 2, 13),
		end: skyDate(2025, 2, 17),
	})
	.set(135, {
		spiritId: SpiritId.MindfulMiner,
		start: skyDate(2025, 2, 27),
		end: skyDate(2025, 3, 3),
	});
