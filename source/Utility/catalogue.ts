import { URL } from "node:url";
import { WIKI_URL } from "./Constants.js";
import {
	EVENT_EMOJIS,
	type Emoji,
	type EventEmojis,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	type SeasonEmojis,
	resolveCurrencyEmoji,
} from "./emojis.js";

export type RotationNumber = 1 | 2 | 3;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;
export const NO_FRIENDSHIP_TREE_TEXT = "This spirit does not have a friendship tree." as const;
export const NO_FRIENDSHIP_TREE_YET_TEXT = "This spirit does not yet have an infographic." as const;

export const GUIDE_SPIRIT_IN_PROGRESS_TEXT =
	"This spirit's friendship tree has not been fully revealed." as const;

export const NO_EVENT_OFFER_TEXT = "There are no cosmetics for this event." as const;
export const NO_EVENT_INFOGRAPHIC_YET = "This event does not yet have an infographic." as const;

export const enum Cosmetic {
	/**
	 * Unlocked by default.
	 */
	EmoteSit = 0,
	/**
	 * Unlocked by default.
	 */
	BaseStance = 1,
	/**
	 * Unlocked by default.
	 */
	BaseCall = 2,
	/**
	 * Unlocked by default.
	 */
	BaseOutfit = 3,
	/**
	 * Unlocked by default.
	 */
	BaseMask = 4,
	/**
	 * Unlocked by default.
	 */
	BaseHair1 = 5,
	/**
	 * Unlocked by default.
	 */
	BaseCape = 6,
	EmotePoint1 = 7,
	EmotePoint2 = 8,
	PointingCandlemakerHair = 9,
	PointingCandlemakerBlessing1 = 10,
	PointingCandlemakerHeart = 11,
	PointingCandlemakerWingBuff = 12,
	EmotePoint3 = 13,
	EmotePoint4 = 14,
	PointingCandlemakerOutfit = 15,
	PointingCandlemakerBlessing2 = 16,
	EmoteCome1 = 17,
	EmoteCome2 = 18,
	UsheringStargazerHair = 19,
	UsheringStargazerBlessing1 = 20,
	UsheringStargazerHeart = 21,
	UsheringStargazerWingBuff = 22,
	EmoteCome3 = 23,
	EmoteCome4 = 24,
	UsheringStargazerOutfit = 25,
	UsheringStargazerBlessing2 = 26,
	EmoteNoThanks1 = 27,
	EmoteNoThanks2 = 28,
	RejectingVoyagerBlessing1 = 29,
	RejectingVoyagerHair = 30,
	RejectingVoyagerHeart = 31,
	RejectingVoyagerWingBuff = 32,
	EmoteNoThanks3 = 33,
	EmoteNoThanks4 = 34,
	RejectingVoyagerFaceAccessory = 35,
	RejectingVoyagerBlessing2 = 36,
	EmoteButterfly1 = 37,
	EmoteButterfly2 = 38,
	ButterflyCharmerBlessing1 = 39,
	ButterflyCharmerCape1 = 40,
	ButterflyCharmerHeart = 41,
	ButterflyCharmerWingBuff1 = 42,
	EmoteButterfly3 = 43,
	EmoteButterfly4 = 44,
	ButterflyCharmerOutfit = 45,
	ButterflyCharmerBlessing2 = 46,
	ButterflyCharmerWingBuff2 = 47,
	ButterflyCharmerCape2 = 48,
	EmoteClap1 = 49,
	EmoteClap2 = 50,
	ApplaudingBellmakerBlessing1 = 51,
	ApplaudingBellmakerHair = 52,
	ApplaudingBellmakerHeart = 53,
	ApplaudingBellmakerWingBuff = 54,
	EmoteClap3 = 55,
	EmoteClap4 = 56,
	ApplaudingBellmakerBlessing2 = 57,
	EmoteWave1 = 58,
	EmoteWave2 = 59,
	WavingBellmakerBlessing1 = 60,
	WavingBellmakerHair = 61,
	WavingBellmakerHeart = 62,
	WavingBellmakerWingBuff1 = 63,
	EmoteWave3 = 64,
	EmoteWave4 = 65,
	WavingBellmakerBlessing2 = 66,
	WavingBellmakerMask = 67,
	WavingBellmakerWingBuff2 = 68,
	EmoteWave5 = 69,
	EmoteWave6 = 70,
	EmoteYawn1 = 71,
	EmoteYawn2 = 72,
	SlumberingShipwrightBlessing1 = 73,
	SlumberingShipwrightHair = 74,
	SlumberingShipwrightHeart = 75,
	SlumberingShipwrightWingBuff = 76,
	EmoteYawn3 = 77,
	EmoteYawn4 = 78,
	SlumberingShipwrightBlessing2 = 79,
	EmoteLaugh1 = 80,
	EmoteLaugh2 = 81,
	LaughingLightCollectorBlessing1 = 82,
	LaughingLightCollectorHarp = 83,
	LaughingLightCollectorHeart = 84,
	LaughingLightCollectorWingBuff = 85,
	EmoteLaugh3 = 86,
	EmoteLaugh4 = 87,
	LaughingLightCollectorHair = 88,
	LaughingLightCollectorBlessing2 = 89,
	CallBird = 90,
	BirdWhispererMusicSheet = 91,
	BirdWhispererBlessing1 = 92,
	BirdWhispererHeart = 93,
	BirdWhispererWingBuff = 94,
	BirdWhispererBlessing2 = 95,
	BirdWhispererHair = 96,
	EmoteWipeBrow1 = 97,
	EmoteWipeBrow2 = 98,
	ExhaustedDockWorkerBlessing1 = 99,
	ExhaustedDockWorkerHeart = 100,
	ExhaustedDockWorkerWingBuff = 101,
	EmoteWipeBrow3 = 102,
	EmoteWipeBrow4 = 103,
	ExhaustedDockWorkerBlessing2 = 104,
	ExhaustedDockWorkerFaceAccessory = 105,
	EmoteTeamwork = 106,
	CeremonialWorshipperBlessing1 = 107,
	CeremonialWorshipperHeart = 108,
	CeremonialWorshipperWingBuff = 109,
	CeremonialWorshipperBlessing2 = 110,
	EmoteShiver1 = 111,
	EmoteShiver2 = 112,
	ShiveringTrailblazerBlessing1 = 113,
	ShiveringTrailblazerOutfit = 114,
	ShiveringTrailblazerHeart = 115,
	ShiveringTrailblazerWingBuff = 116,
	EmoteShiver3 = 117,
	EmoteShiver4 = 118,
	ShiveringTrailblazerBlessing2 = 119,
	ShiveringTrailblazerHair = 120,
	EmoteBlush1 = 121,
	EmoteBlush2 = 122,
	BlushingProspectorBlessing1 = 123,
	BlushingProspectorHair = 124,
	BlushingProspectorHeart = 125,
	BlushingProspectorWingBuff = 126,
	EmoteBlush3 = 127,
	EmoteBlush4 = 128,
	BlushingProspectorBlessing2 = 129,
	BlushingProspectorDrum = 130,
	EmoteHideAndSeek = 131,
	HideAndSeekPioneerHair = 132,
	HideAndSeekPioneerBlessing1 = 133,
	HideAndSeekPioneerHeart = 134,
	HideAndSeekPioneerWingBuff1 = 135,
	HideAndSeekPioneerBlessing2 = 136,
	HideAndSeekPioneerMask = 137,
	HideAndSeekPioneerWingBuff2 = 138,
	HideAndSeekPioneerOutfit = 139,
	EmoteAngry1 = 140,
	EmoteAngry2 = 141,
	PoutyPorterBlessing1 = 142,
	PoutyPorterHair = 143,
	PoutyPorterHeart = 144,
	PoutyPorterWingBuff1 = 145,
	EmoteAngry3 = 146,
	EmoteAngry4 = 147,
	PoutyPorterBlessing2 = 148,
	PoutyPorterCape1 = 149,
	PoutyPorterWingBuff2 = 150,
	PoutyPorterCape2 = 151,
	Shocked1 = 152,
	Shocked2 = 153,
	DismayedHunterBlessing1 = 154,
	DismayedHunterHair = 155,
	DismayedHunterHeart = 156,
	DismayedHunterWingBuff1 = 157,
	Shocked3 = 158,
	Shocked4 = 159,
	DismayedHunterBlessing2 = 160,
	DismayedHunterCape1 = 161,
	DismayedHunterWingBuff2 = 162,
	DismayedHunterCape2 = 163,
	EmoteApologise1 = 164,
	EmoteApologise2 = 165,
	ApologeticLumberjackBlessing1 = 166,
	ApologeticLumberjackHair = 167,
	ApologeticLumberjackHeart = 168,
	ApologeticLumberjackWingBuff = 169,
	EmoteApologise3 = 170,
	EmoteApologise4 = 171,
	ApologeticLumberjackBlessing2 = 172,
	ApologeticLumberjackFaceAccessory = 173,
	EmoteCrying1 = 174,
	EmoteCrying2 = 175,
	TearfulLightMinerBlessing1 = 176,
	TearfulLightMinerHair = 177,
	TearfulLightMinerHeart = 178,
	TearfulLightMinerWingBuff1 = 179,
	EmoteCrying3 = 180,
	EmoteCrying4 = 181,
	TearfulLightMinerBlessing2 = 182,
	TearfulLightMinerWingBuff2 = 183,
	EmoteCrying5 = 184,
	EmoteCrying6 = 185,
	CallWhale = 186,
	WhaleWhispererBlessing1 = 187,
	WhaleWhispererHeart = 188,
	WhaleWhispererWingBuff = 189,
	WhaleWhispererBlessing2 = 190,
	WhaleWhispererMusicSheet = 191,
	StanceConfident = 192,
	ConfidentSightseerHair = 193,
	ConfidentSightseerBlessing1 = 194,
	ConfidentSightseerHeart = 195,
	ConfidentSightseerWingBuff = 196,
	ConfidentSightseerBlessing2 = 197,
	ConfidentSightseerOutfit = 198,
	EmoteHandstand1 = 199,
	EmoteHandstand2 = 200,
	HandstandingThrillseekerBlessing1 = 201,
	HandstandingThrillseekerHeart = 202,
	HandstandingThrillseekerWingBuff1 = 203,
	EmoteHandstand3 = 204,
	EmoteHandstand4 = 205,
	HandstandingThrillseekerBlessing2 = 206,
	HandstandingThrillseekerCape1 = 207,
	HandstandingThrillseekerWingBuff2 = 208,
	HandstandingThrillseekerCape2 = 209,
	CallManta = 210,
	MantaWhispererBlessing1 = 211,
	MantaWhispererHeart = 212,
	MantaWhispererWingBuff = 213,
	MantaWhispererBlessing2 = 214,
	MantaWhispererMusicSheet = 215,
	EmoteBackflip1 = 216,
	EmoteBackflip2 = 217,
	BackflippingChampionBlessing1 = 218,
	BackflippingChampionHair = 219,
	BackflippingChampionHeart = 220,
	BackflippingChampionWingBuff = 221,
	EmoteBackflip3 = 222,
	EmoteBackflip4 = 223,
	BackflippingChampionBlessing2 = 224,
	BackflippingChampionFaceAccessory = 225,
	EmoteCheer1 = 226,
	EmoteCheer2 = 227,
	CheerfulSpectatorBlessing1 = 228,
	CheerfulSpectatorHair = 229,
	CheerfulSpectatorHeart = 230,
	CheerfulSpectatorWingBuff = 231,
	EmoteCheer3 = 232,
	EmoteCheer4 = 233,
	CheerfulSpectatorBlessing2 = 234,
	CheerfulSpectatorPiano = 235,
	EmoteBow1 = 236,
	EmoteBow2 = 237,
	BowingMedalistBlessing1 = 238,
	BowingMedalistHair = 239,
	BowingMedalistHeart = 240,
	BowingMedalistWingBuff = 241,
	EmoteBow3 = 242,
	EmoteBow4 = 243,
	BowingMedalistBlessing2 = 244,
	BowingMedalistFaceAccessory = 245,
	StanceProud = 246,
	ProudVictorCape1 = 247,
	ProudVictorBlessing1 = 248,
	ProudVictorHeart = 249,
	ProudVictorWingBuff1 = 250,
	ProudVictorBlessing2 = 251,
	ProudVictorMask = 252,
	ProudVictorWingBuff2 = 253,
	ProudVictorCape2 = 254,
	EmoteDuck1 = 255,
	EmoteDuck2 = 256,
	FrightenedRefugeeBlessing1 = 257,
	FrightenedRefugeeHair = 258,
	FrightenedRefugeeHeart = 259,
	FrightenedRefugeeWingBuff = 260,
	EmoteDuck3 = 261,
	EmoteDuck4 = 262,
	FrightenedRefugeeBlessing2 = 263,
	FrightenedRefugeeContrabass = 264,
	EmoteFaint1 = 265,
	EmoteFaint2 = 266,
	FaintingWarriorBlessing1 = 267,
	FaintingWarriorHair = 268,
	FaintingWarriorHeart = 269,
	FaintingWarriorWingBuff = 270,
	EmoteFaint3 = 271,
	EmoteFaint4 = 272,
	FaintingWarriorBlessing2 = 273,
	FaintingWarriorMask = 274,
	StanceCourageous = 275,
	CourageousSoldierHair = 276,
	CourageousSoldierBlessing1 = 277,
	CourageousSoldierHeart = 278,
	CourageousSoldierWingBuff1 = 279,
	CourageousSoldierBlessing2 = 280,
	CourageousSoldierCape1 = 281,
	CourageousSoldierWingBuff2 = 282,
	CourageousSoldierCape2 = 283,
	StanceSneaky = 284,
	StealthySurvivorHair = 285,
	StealthySurvivorBlessing1 = 286,
	StealthySurvivorHeart = 287,
	StealthySurvivorWingBuff1 = 288,
	StealthySurvivorBlessing2 = 289,
	StealthySurvivorCape1 = 290,
	StealthySurvivorWingBuff2 = 291,
	StealthySurvivorCape2 = 292,
	EmoteSalute1 = 293,
	EmoteSalute2 = 294,
	SalutingCaptainBlessing1 = 295,
	SalutingCaptainHair = 296,
	SalutingCaptainHeart = 297,
	SalutingCaptainWingBuff = 298,
	EmoteSalute3 = 299,
	EmoteSalute4 = 300,
	SalutingCaptainBlessing2 = 301,
	SalutingCaptainFireworksStaff = 302,
	EmoteLookAround1 = 303,
	EmoteLookAround2 = 304,
	LookoutScoutBlessing1 = 305,
	LookoutScoutHorn = 306,
	LookoutScoutHeart = 307,
	LookoutScoutWingBuff = 308,
	EmoteLookAround3 = 309,
	EmoteLookAround4 = 310,
	LookoutScoutBlessing2 = 311,
	LookoutScoutFaceAccessory = 312,
	EmotePray1 = 313,
	EmotePray2 = 314,
	PrayingAcolyteBlessing1 = 315,
	PrayingAcolyteHair = 316,
	PrayingAcolyteHeart = 317,
	PrayingAcolyteWingBuff1 = 318,
	EmotePray3 = 319,
	EmotePray4 = 320,
	PrayingAcolyteBlessing2 = 321,
	PrayingAcolyteCape1 = 322,
	PrayingAcolyteWingBuff2 = 323,
	PrayingAcolyteCape2 = 324,
	EmoteTelekinesis1 = 325,
	EmoteTelekinesis2 = 326,
	LevitatingAdeptBlessing1 = 327,
	LevitatingAdeptHair = 328,
	LevitatingAdeptHeart = 329,
	LevitatingAdeptWingBuff = 330,
	EmoteTelekinesis3 = 331,
	EmoteTelekinesis4 = 332,
	LevitatingAdeptBlessing2 = 333,
	LevitatingAdeptFaceAccessory = 334,
	StancePolite = 335,
	PoliteScholarOutfit = 336,
	PoliteScholarBlessing1 = 337,
	PoliteScholarHeart = 338,
	PoliteScholarWingBuff1 = 339,
	PoliteScholarBlessing2 = 340,
	PoliteScholarHair = 341,
	CallCosmicManta = 342,
	MemoryWhispererOutfit = 343,
	MemoryWhispererBlessing1 = 344,
	MemoryWhispererHeart = 345,
	MemoryWhispererWingBuff1 = 346,
	MemoryWhispererBlessing2 = 347,
	MemoryWhispererCape1 = 348,
	MemoryWhispererWingBuff2 = 349,
	MemoryWhispererCape2 = 350,
	EmoteFloat1 = 351,
	EmoteFloat2 = 352,
	MeditatingMonasticBlessing1 = 353,
	MeditatingMonasticHair = 354,
	MeditatingMonasticHeart = 355,
	MeditatingMonasticWingBuff = 356,
	EmoteFloat3 = 357,
	EmoteFloat4 = 358,
	MeditatingMonasticBlessing2 = 359,
	MeditatingMonasticChair = 360,

	ElderOfTheIsleHair = 361,
	ElderOfThePrairieHair = 362,
	ElderOfTheForestHair = 363,
	ElderOfTheValleyHair1 = 364,
	ElderOfTheValleyHair2 = 365,
	ElderOfTheWastelandHair = 366,
	ElderOfTheVaultHair = 367,

	GratitudePendant = 368,
	GratitudeUltimateMask = 369,
	StanceSassy = 370,
	SassyDrifterHair = 371,
	SassyDrifterBlessing1 = 372,
	SassyDrifterBlessing2 = 373,
	SassyDrifterMask = 374,
	EmoteYoga1 = 375,
	EmoteYoga2 = 376,
	StretchingGuruHair = 377,
	StretchingGuruBlessing1 = 378,
	EmoteYoga3 = 379,
	EmoteYoga4 = 380,
	StretchingGuruBlessing2 = 381,
	StretchingGuruCape = 382,
	EmoteKabuki1 = 383,
	EmoteKabuki2 = 384,
	ProvokingPerformerMusicSheet = 385,
	ProvokingPerformerBlessing = 386,
	EmoteKabuki3 = 387,
	EmoteKabuki4 = 388,
	ProvokingPerformerHair = 389,
	ProvokingPerformerMask = 390,
	EmoteLeap1 = 391,
	EmoteLeap2 = 392,
	LeapingDancerSmallBell = 393,
	LeapingDancerBlessing1 = 394,
	EmoteLeap3 = 395,
	EmoteLeap4 = 396,
	LeapingDancerBlessing2 = 397,
	LeapingDancerMask = 398,
	EmoteAcknowledge1 = 399,
	EmoteAcknowledge2 = 400,
	SalutingProtectorMusicSheet = 401,
	SalutingProtectorBlessing1 = 402,
	EmoteAcknowledge3 = 403,
	EmoteAcknowledge4 = 404,
	SalutingProtectorCape = 405,
	SalutingProtectorMask = 406,
	EmoteKungFu1 = 407,
	EmoteKungFu2 = 408,
	GreetingShamanBlessing1 = 409,
	GreetingShamanLargeBell = 410,
	EmoteKungFu3 = 411,
	EmoteKungFu4 = 412,
	GreetingShamanBlessing2 = 413,
	GreetingShamanMask = 414,

	LightseekerPendant = 415,
	LightseekerUltimateProp = 416,
	FriendActionCarry1 = 417,
	PiggybackLightseekerMask = 418,
	PiggybackLightseekerBlessing1 = 419,
	PiggybackLightseekerBlessing2 = 420,
	FriendActionCarry2 = 421,
	PiggybackLightseekerHair = 422,
	PiggybackLightseekerCape = 423,
	FriendActionDoubleFive1 = 424,
	DoublefiveLightCatcherBlessing1 = 425,
	DoublefiveLightCatcherHair = 426,
	DoublefiveLightCatcherMask = 427,
	FriendActionDoubleFive2 = 428,
	DoublefiveLightCatcherBlessing2 = 429,
	DoublefiveLightCatcherFlute = 430,
	StanceLaidback = 431,
	LaidbackPioneerMask = 432,
	LaidbackPioneerBlessing1 = 433,
	LaidbackPioneerBlessing2 = 434,
	LaidbackPioneerMusicSheet = 435,
	LaidbackPioneerHair = 436,
	LaidbackPioneerBlessing3 = 437,
	LaidbackPioneerBlessing4 = 438,
	LaidbackPioneerUmbrella = 439,
	EmoteTripleAxel1 = 440,
	EmoteTripleAxel2 = 441,
	TwirlingChampionBlessing1 = 442,
	TwirlingChampionMask = 443,
	EmoteTripleAxel3 = 444,
	EmoteTripleAxel4 = 445,
	TwirlingChampionHair = 446,
	TwirlingChampionPanflute = 447,
	CallCrab = 448,
	CrabWhispererMask = 449,
	CrabWhispererBlessing1 = 450,
	CrabWhispererBlessing2 = 451,
	CrabWhispererMusicSheet = 452,
	CrabWhispererBlessing3 = 453,
	CrabWhispererBlessing4 = 454,
	CrabWhispererHair = 455,
	CrabWhispererCape = 456,
	EmoteShush1 = 457,
	EmoteShush2 = 458,
	ShushingLightScholarBlessing1 = 459,
	ShushingLightScholarMask = 460,
	EmoteShush3 = 461,
	EmoteShush4 = 462,
	ShushingLightScholarBlessing2 = 463,
	ShushingLightScholarCape = 464,

	/**
	 * Unlocked by default.
	 */
	BaseHair2 = 465,
	/**
	 * Unlocked by default.
	 */
	BaseHair3 = 466,
}

export enum SeasonName {
	Gratitude = "Season of Gratitude",
	Lightseekers = "Season of Lightseekers",
	Belonging = "Season of Belonging",
	Rhythm = "Season of Rhythm",
	Enchantment = "Season of Enchantment",
	Sanctuary = "Season of Sanctuary",
	Prophecy = "Season of Prophecy",
	Dreams = "Season of Dreams",
	Assembly = "Season of Assembly",
	LittlePrince = "Season of the Little Prince",
	Flight = "Season of Flight",
	Abyss = "Season of Abyss",
	Performance = "Season of Performance",
	Shattering = "Season of Shattering",
	AURORA = "Season of AURORA",
	Remembrance = "Season of Remembrance",
	Passage = "The Season of Passage",
	Moments = "The Season of Moments",
	Revival = "Season of Revival",
	NineColouredDeer = "Season of the Nine-Coloured Deer",
	Nesting = "Season of Nesting",
	Duets = "Season of Duets",
}

export const SEASON_NAME_VALUES = Object.values(SeasonName);

export const SeasonNameToSeasonalEmoji = {
	[SeasonName.Gratitude]: SEASON_EMOJIS.Gratitude,
	[SeasonName.Lightseekers]: SEASON_EMOJIS.Lightseekers,
	[SeasonName.Belonging]: SEASON_EMOJIS.Belonging,
	[SeasonName.Rhythm]: SEASON_EMOJIS.Rhythm,
	[SeasonName.Enchantment]: SEASON_EMOJIS.Enchantment,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.Sanctuary,
	[SeasonName.Prophecy]: SEASON_EMOJIS.Prophecy,
	[SeasonName.Dreams]: SEASON_EMOJIS.Dreams,
	[SeasonName.Assembly]: SEASON_EMOJIS.Assembly,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrince,
	[SeasonName.Flight]: SEASON_EMOJIS.Flight,
	[SeasonName.Abyss]: SEASON_EMOJIS.Abyss,
	[SeasonName.Performance]: SEASON_EMOJIS.Performance,
	[SeasonName.Shattering]: SEASON_EMOJIS.Shattering,
	[SeasonName.AURORA]: SEASON_EMOJIS.Aurora,
	[SeasonName.Remembrance]: SEASON_EMOJIS.Remembrance,
	[SeasonName.Passage]: SEASON_EMOJIS.Passage,
	[SeasonName.Moments]: SEASON_EMOJIS.Moments,
	[SeasonName.Revival]: SEASON_EMOJIS.Revival,
	[SeasonName.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeer,
	[SeasonName.Nesting]: SEASON_EMOJIS.Nesting,
	[SeasonName.Duets]: SEASON_EMOJIS.Duets,
} as const satisfies Readonly<Record<SeasonName, SeasonEmojis>>;

export const SeasonNameToSeasonalCandleEmoji = {
	[SeasonName.Gratitude]: SEASON_EMOJIS.GratitudeCandle,
	[SeasonName.Lightseekers]: SEASON_EMOJIS.LightseekersCandle,
	[SeasonName.Belonging]: SEASON_EMOJIS.BelongingCandle,
	[SeasonName.Rhythm]: SEASON_EMOJIS.RhythmCandle,
	[SeasonName.Enchantment]: SEASON_EMOJIS.EnchantmentCandle,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.SanctuaryCandle,
	[SeasonName.Prophecy]: SEASON_EMOJIS.ProphecyCandle,
	[SeasonName.Dreams]: SEASON_EMOJIS.DreamsCandle,
	[SeasonName.Assembly]: SEASON_EMOJIS.AssemblyCandle,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrinceCandle,
	[SeasonName.Flight]: SEASON_EMOJIS.FlightCandle,
	[SeasonName.Abyss]: SEASON_EMOJIS.AbyssCandle,
	[SeasonName.Performance]: SEASON_EMOJIS.PerformanceCandle,
	[SeasonName.Shattering]: SEASON_EMOJIS.ShatteringCandle,
	[SeasonName.AURORA]: SEASON_EMOJIS.AuroraCandle,
	[SeasonName.Remembrance]: SEASON_EMOJIS.RemembranceCandle,
	[SeasonName.Passage]: SEASON_EMOJIS.PassageCandle,
	[SeasonName.Moments]: SEASON_EMOJIS.MomentsCandle,
	[SeasonName.Revival]: SEASON_EMOJIS.RevivalCandle,
	[SeasonName.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeerCandle,
	[SeasonName.Nesting]: SEASON_EMOJIS.NestingCandle,
	[SeasonName.Duets]: SEASON_EMOJIS.DuetsCandle,
} as const satisfies Readonly<Record<SeasonName, SeasonEmojis>>;

const SeasonNameToSeasonalHeartEmoji = {
	[SeasonName.Belonging]: SEASON_EMOJIS.BelongingHeart,
	[SeasonName.Rhythm]: SEASON_EMOJIS.RhythmHeart,
	[SeasonName.Enchantment]: SEASON_EMOJIS.EnchantmentHeart,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.SanctuaryHeart,
	[SeasonName.Prophecy]: SEASON_EMOJIS.ProphecyHeart,
	[SeasonName.Dreams]: SEASON_EMOJIS.DreamsHeart,
	[SeasonName.Assembly]: SEASON_EMOJIS.AssemblyHeart,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrinceHeart,
	[SeasonName.Flight]: SEASON_EMOJIS.FlightHeart,
	[SeasonName.Abyss]: SEASON_EMOJIS.AbyssHeart,
	[SeasonName.Performance]: SEASON_EMOJIS.PerformanceHeart,
	[SeasonName.Shattering]: SEASON_EMOJIS.ShatteringHeart,
	[SeasonName.AURORA]: SEASON_EMOJIS.AuroraHeart,
	[SeasonName.Remembrance]: SEASON_EMOJIS.RemembranceHeart,
	[SeasonName.Passage]: SEASON_EMOJIS.PassageHeart,
	[SeasonName.Moments]: SEASON_EMOJIS.MomentsHeart,
	[SeasonName.Revival]: SEASON_EMOJIS.RevivalHeart,
	[SeasonName.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeerHeart,
	[SeasonName.Nesting]: SEASON_EMOJIS.NestingHeart,
	[SeasonName.Duets]: SEASON_EMOJIS.DuetsHeart,
} as const satisfies Readonly<
	Record<Exclude<SeasonName, SeasonName.Gratitude | SeasonName.Lightseekers>, SeasonEmojis>
>;

enum SeasonFlags {
	Gratitude = 1 << 0,
	Lightseekers = 1 << 1,
	Belonging = 1 << 2,
	Rhythm = 1 << 3,
	Enchantment = 1 << 4,
	Sanctuary = 1 << 5,
	Prophecy = 1 << 6,
	Dreams = 1 << 7,
	Assembly = 1 << 8,
	LittlePrince = 1 << 9,
	Flight = 1 << 10,
	Abyss = 1 << 11,
	Performance = 1 << 12,
	Shattering = 1 << 13,
	AURORA = 1 << 14,
	Remembrance = 1 << 15,
	Passage = 1 << 16,
	Moments = 1 << 17,
	Revival = 1 << 18,
	NineColouredDeer = 1 << 19,
	Nesting = 1 << 20,
	Duets = 1 << 21,
}

const SeasonFlagsToSeasonName = {
	[SeasonFlags.Gratitude]: SeasonName.Gratitude,
	[SeasonFlags.Lightseekers]: SeasonName.Lightseekers,
	[SeasonFlags.Belonging]: SeasonName.Belonging,
	[SeasonFlags.Rhythm]: SeasonName.Rhythm,
	[SeasonFlags.Enchantment]: SeasonName.Enchantment,
	[SeasonFlags.Sanctuary]: SeasonName.Sanctuary,
	[SeasonFlags.Prophecy]: SeasonName.Prophecy,
	[SeasonFlags.Dreams]: SeasonName.Dreams,
	[SeasonFlags.Assembly]: SeasonName.Assembly,
	[SeasonFlags.LittlePrince]: SeasonName.LittlePrince,
	[SeasonFlags.Flight]: SeasonName.Flight,
	[SeasonFlags.Abyss]: SeasonName.Abyss,
	[SeasonFlags.Performance]: SeasonName.Performance,
	[SeasonFlags.Shattering]: SeasonName.Shattering,
	[SeasonFlags.AURORA]: SeasonName.AURORA,
	[SeasonFlags.Remembrance]: SeasonName.Remembrance,
	[SeasonFlags.Passage]: SeasonName.Passage,
	[SeasonFlags.Moments]: SeasonName.Moments,
	[SeasonFlags.Revival]: SeasonName.Revival,
	[SeasonFlags.NineColouredDeer]: SeasonName.NineColouredDeer,
	[SeasonFlags.Nesting]: SeasonName.Nesting,
	[SeasonFlags.Duets]: SeasonName.Duets,
} as const satisfies Readonly<Record<SeasonFlags, SeasonName>>;

export const SEASON_FLAGS_TO_SEASON_NAME_ENTRIES = Object.entries(SeasonFlagsToSeasonName);

export enum EventName {
	HalloweenOfficeEvent = "Halloween Office Event",
	DaysOfGiving = "Days of Giving",
	DaysOfFeast = "Days of Feast",
	LunarNewYear = "Lunar New Year",
	DaysOfLove = "Days of Love",
	DaysOfSpring = "Days of Spring",
	DaysOfNature = "Days of Nature",
	DaysOfHealing = "Days of Healing",
	DaysOfRainbow = "Days of Rainbow",
	SkyAnniversary = "Sky Anniversary",
	DaysOfSummerLights = "Days of Summer Lights",
	DaysOfMischief = "Days of Mischief",
	DaysOfFortune = "Days of Fortune",
	DaysOfBloom = "Days of Bloom",
	ChildrensDay = "Children's Day",
	DaysOfSummer = "Days of Summer",
	KizunaAI = "Kizuna AI",
	HarmonyHallGrandOpening = "Harmony Hall Grand Opening",
	DaysOfSunlight = "Days of Sunlight",
	LazyDays = "Lazy Days",
	DaysOfColour = "Days of Colour",
	DaysOfMusic = "Days of Music",
	AURORAEncoreConcerts = "AURORA Encore Concerts",
	DaysOfStyle = "Days of Style",
	AviarysFireworkFestival = "Aviary's Firework Festival",
	SpringCamping = "Spring Camping",
	SkyXCinnamorollPopUpCafe = "Sky × Cinnamoroll Pop-Up Cafe",
	SkyFest = "SkyFest",
	TournamentOfTriumph = "Tournament of Triumph",
	DaysOfMoonlight = "Days of Moonlight",
}

export enum EventNameUnique {
	// 2019.
	HalloweenOfficeEvent2019 = "Halloween Office Event 2019",
	DaysOfGiving2019 = "Days of Giving 2019",
	DaysOfFeast2019 = "Days of Feast 2019",

	// 2020.
	LunarNewYear2020 = "Lunar New Year 2020",
	DaysOfLove2020 = "Days of Love 2020",
	DaysOfSpring2020 = "Days of Spring 2020",
	DaysOfNature2020 = "Days of Nature 2020",
	DaysOfHealing2020 = "Days of Healing 2020",
	DaysOfRainbow2020 = "Days of Rainbow 2020",
	SkyAnniversary2020 = "Sky Anniversary 2020",
	DaysOfSummerLights2020 = "Days of Summer Lights 2020",
	DaysOfMischief2020 = "Days of Mischief 2020",
	DaysOfGiving2020 = "Days of Giving 2020",
	DaysOfFeast2020 = "Days of Feast 2020",

	// 2021.
	DaysOfFortune2021 = "Days of Fortune 2021",
	DaysOfLove2021 = "Days of Love 2021",
	DaysOfBloom2021 = "Days of Bloom 2021",
	DaysOfNature2021 = "Days of Nature 2021",
	ChildrensDay2021 = "Children's Day 2021",
	DaysOfRainbow2021 = "Days of Rainbow 2021",
	SkyAnniversary2021 = "Sky Anniversary 2021",
	DaysOfSummer2021 = "Days of Summer 2021",
	DaysOfSummerLights2021 = "Days of Summer Lights 2021",
	DaysOfGiving2021 = "Days of Giving 2021",
	DaysOfMischief2021 = "Days of Mischief 2021",
	DaysOfFeast2021 = "Days of Feast 2021",

	// 2022.
	DaysOfFortune2022 = "Days of Fortune 2022",
	DaysOfLove2022 = "Days of Love 2022",
	KizunaAI2022 = "Kizuna AI 2022",
	DaysOfBloom2022 = "Days of Bloom 2022",
	DaysOfNature2022 = "Days of Nature 2022",
	HarmonyHallGrandOpening2022 = "Harmony Hall Grand Opening 2022",
	DaysOfRainbow2022 = "Days of Rainbow 2022",
	SkyAnniversary2022 = "Sky Anniversary 2022",
	DaysOfSunlight2022 = "Days of Sunlight 2022",
	LazyDays2022 = "Lazy Days 2022",
	DaysOfMischief2022 = "Days of Mischief 2022",
	DaysOfGiving2022 = "Days of Giving 2022",
	DaysOfFeast2022 = "Days of Feast 2022",

	// 2023.
	DaysOfFortune2023 = "Days of Fortune 2023",
	DaysOfLove2023 = "Days of Love 2023",
	DaysOfBloom2023 = "Days of Bloom 2023",
	DaysOfNature2023 = "Days of Nature 2023",
	DaysOfColour2023 = "Days of Colour 2023",
	DaysOfMusic2023 = "Days of Music 2023",
	SkyAnniversary2023 = "Sky Anniversary 2023",
	AURORAEncoreConcerts2023 = "AURORA Encore Concerts 2023",
	DaysOfSunlight2023 = "Days of Sunlight 2023",
	DaysOfStyle2023 = "Days of Style 2023",
	DaysOfMischief2023 = "Days of Mischief 2023",
	DaysOfGiving2023 = "Days of Giving 2023",
	AviarysFireworkFestival2023 = "Aviary's Firework Festival 2023",
	DaysOfFeast2023 = "Days of Feast 2023",

	// 2024.
	DaysOfFortune2024 = "Days of Fortune 2024",
	DaysOfLove2024 = "Days of Love 2024",
	SpringCamping2024 = "Spring Camping 2024",
	DaysOfBloom2024 = "Days of Bloom 2024",
	SkyXCinnamorollPopUpCafe2024 = "Sky × Cinnamoroll Pop-Up Cafe 2024",
	DaysOfNature2024 = "Days of Nature 2024",
	DaysOfColour2024 = "Days of Colour 2024",
	SkyFest2024 = "Sky Fest 2024",
	TournamentOfTriumph2024 = "Tournament of Triumph 2024",
	DaysOfSunlight2024 = "Days of Sunlight 2024",
	DaysOfMoonlight2024 = "Days of Moonlight 2024",
	DaysOfStyle2024 = "Days of Style 2024",
}

export const EventNameUniqueToEventName = {
	[EventNameUnique.HalloweenOfficeEvent2019]: EventName.HalloweenOfficeEvent,
	[EventNameUnique.DaysOfGiving2019]: EventName.DaysOfGiving,
	[EventNameUnique.DaysOfFeast2019]: EventName.DaysOfFeast,
	[EventNameUnique.LunarNewYear2020]: EventName.LunarNewYear,
	[EventNameUnique.DaysOfLove2020]: EventName.DaysOfLove,
	[EventNameUnique.DaysOfSpring2020]: EventName.DaysOfSpring,
	[EventNameUnique.DaysOfNature2020]: EventName.DaysOfNature,
	[EventNameUnique.DaysOfHealing2020]: EventName.DaysOfHealing,
	[EventNameUnique.DaysOfRainbow2020]: EventName.DaysOfRainbow,
	[EventNameUnique.SkyAnniversary2020]: EventName.SkyAnniversary,
	[EventNameUnique.DaysOfSummerLights2020]: EventName.DaysOfSummerLights,
	[EventNameUnique.DaysOfMischief2020]: EventName.DaysOfMischief,
	[EventNameUnique.DaysOfGiving2020]: EventName.DaysOfGiving,
	[EventNameUnique.DaysOfFeast2020]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2021]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfLove2021]: EventName.DaysOfLove,
	[EventNameUnique.DaysOfBloom2021]: EventName.DaysOfBloom,
	[EventNameUnique.DaysOfNature2021]: EventName.DaysOfNature,
	[EventNameUnique.ChildrensDay2021]: EventName.ChildrensDay,
	[EventNameUnique.DaysOfRainbow2021]: EventName.DaysOfRainbow,
	[EventNameUnique.SkyAnniversary2021]: EventName.SkyAnniversary,
	[EventNameUnique.DaysOfSummer2021]: EventName.DaysOfSummer,
	[EventNameUnique.DaysOfSummerLights2021]: EventName.DaysOfSummerLights,
	[EventNameUnique.DaysOfMischief2021]: EventName.DaysOfMischief,
	[EventNameUnique.DaysOfGiving2021]: EventName.DaysOfGiving,
	[EventNameUnique.DaysOfFeast2021]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2022]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfLove2022]: EventName.DaysOfLove,
	[EventNameUnique.KizunaAI2022]: EventName.KizunaAI,
	[EventNameUnique.DaysOfBloom2022]: EventName.DaysOfBloom,
	[EventNameUnique.DaysOfNature2022]: EventName.DaysOfNature,
	[EventNameUnique.HarmonyHallGrandOpening2022]: EventName.HarmonyHallGrandOpening,
	[EventNameUnique.DaysOfRainbow2022]: EventName.DaysOfRainbow,
	[EventNameUnique.SkyAnniversary2022]: EventName.SkyAnniversary,
	[EventNameUnique.DaysOfSunlight2022]: EventName.DaysOfSunlight,
	[EventNameUnique.LazyDays2022]: EventName.LazyDays,
	[EventNameUnique.DaysOfMischief2022]: EventName.DaysOfMischief,
	[EventNameUnique.DaysOfGiving2022]: EventName.DaysOfGiving,
	[EventNameUnique.DaysOfFeast2022]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2023]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfLove2023]: EventName.DaysOfLove,
	[EventNameUnique.DaysOfBloom2023]: EventName.DaysOfBloom,
	[EventNameUnique.DaysOfNature2023]: EventName.DaysOfNature,
	[EventNameUnique.DaysOfColour2023]: EventName.DaysOfColour,
	[EventNameUnique.DaysOfMusic2023]: EventName.DaysOfMusic,
	[EventNameUnique.SkyAnniversary2023]: EventName.SkyAnniversary,
	[EventNameUnique.AURORAEncoreConcerts2023]: EventName.AURORAEncoreConcerts,
	[EventNameUnique.DaysOfSunlight2023]: EventName.DaysOfSunlight,
	[EventNameUnique.DaysOfStyle2023]: EventName.DaysOfStyle,
	[EventNameUnique.DaysOfMischief2023]: EventName.DaysOfMischief,
	[EventNameUnique.DaysOfGiving2023]: EventName.DaysOfGiving,
	[EventNameUnique.AviarysFireworkFestival2023]: EventName.AviarysFireworkFestival,
	[EventNameUnique.DaysOfFeast2023]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2024]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfLove2024]: EventName.DaysOfLove,
	[EventNameUnique.SpringCamping2024]: EventName.SpringCamping,
	[EventNameUnique.DaysOfBloom2024]: EventName.DaysOfBloom,
	[EventNameUnique.SkyXCinnamorollPopUpCafe2024]: EventName.SkyXCinnamorollPopUpCafe,
	[EventNameUnique.DaysOfNature2024]: EventName.DaysOfNature,
	[EventNameUnique.DaysOfColour2024]: EventName.DaysOfColour,
	[EventNameUnique.SkyFest2024]: EventName.SkyFest,
	[EventNameUnique.TournamentOfTriumph2024]: EventName.TournamentOfTriumph,
	[EventNameUnique.DaysOfSunlight2024]: EventName.DaysOfSunlight,
	[EventNameUnique.DaysOfMoonlight2024]: EventName.DaysOfMoonlight,
	[EventNameUnique.DaysOfStyle2024]: EventName.DaysOfStyle,
} as const satisfies Readonly<Record<EventNameUnique, EventName>>;

export const EVENT_NAME_VALUES = Object.values(EventName);

export const EventNameToEventCurrencyEmoji = {
	[EventName.HalloweenOfficeEvent]: EVENT_EMOJIS.Mischief,
	[EventName.DaysOfGiving]: null,
	[EventName.DaysOfFeast]: EVENT_EMOJIS.Feast,
	[EventName.LunarNewYear]: EVENT_EMOJIS.Fortune,
	[EventName.DaysOfLove]: EVENT_EMOJIS.Love,
	[EventName.DaysOfSpring]: null,
	[EventName.DaysOfNature]: EVENT_EMOJIS.Nature,
	[EventName.DaysOfHealing]: null,
	[EventName.DaysOfRainbow]: EVENT_EMOJIS.Colour,
	[EventName.SkyAnniversary]: EVENT_EMOJIS.SkyAnniversary,
	[EventName.DaysOfSummerLights]: null,
	[EventName.DaysOfMischief]: EVENT_EMOJIS.Mischief,
	[EventName.DaysOfFortune]: EVENT_EMOJIS.Fortune,
	[EventName.DaysOfBloom]: EVENT_EMOJIS.Bloom,
	[EventName.ChildrensDay]: null,
	[EventName.DaysOfSummer]: EVENT_EMOJIS.Sunlight,
	[EventName.KizunaAI]: null,
	[EventName.HarmonyHallGrandOpening]: EVENT_EMOJIS.Music,
	[EventName.DaysOfSunlight]: EVENT_EMOJIS.Sunlight,
	[EventName.LazyDays]: EVENT_EMOJIS.Sunlight,
	[EventName.DaysOfColour]: EVENT_EMOJIS.Colour,
	[EventName.DaysOfMusic]: EVENT_EMOJIS.Music,
	[EventName.AURORAEncoreConcerts]: EVENT_EMOJIS.AURORAEncore,
	[EventName.DaysOfStyle]: EVENT_EMOJIS.Style,
	[EventName.AviarysFireworkFestival]: EVENT_EMOJIS.AviarysFireworkFestival,
	[EventName.SpringCamping]: null,
	[EventName.SkyXCinnamorollPopUpCafe]: EVENT_EMOJIS.SkyXCinnamorollPopUpCafe,
	[EventName.SkyFest]: EVENT_EMOJIS.SkyFest,
	[EventName.TournamentOfTriumph]: EVENT_EMOJIS.TournamentOfTriumph,
	[EventName.DaysOfMoonlight]: EVENT_EMOJIS.Moonlight,
} as const satisfies Readonly<Record<EventName, EventEmojis | null>>;

export function snakeCaseName(name: string) {
	return name
		.replaceAll("'s", "s")
		.replace("' ", "'")
		.replaceAll(/[ '-]/g, "_")
		.replaceAll(/[()]/g, "")
		.replaceAll("×", "x")
		.toLowerCase();
}

export function wikiURL(name: string) {
	return String(
		new URL(
			(name.includes("(") ? name.slice(0, name.indexOf("(") - 1) : name).replaceAll(" ", "_"),
			WIKI_URL,
		),
	);
}

interface ItemCostRaw {
	money?: number;
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
	seasonalHearts?: number;
	eventCurrency?: number;
}

export interface ItemCost {
	money?: number;
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: ItemCostSeasonal[];
	seasonalHearts?: ItemCostSeasonal[];
	eventCurrency?: ItemCostEvent[];
}

interface ItemCostSeasonal {
	cost: number;
	seasonName: SeasonName;
}

interface ItemCostEvent {
	cost: number;
	eventName: EventName;
}

export interface ItemRaw {
	name: string;
	cosmetic: Cosmetic | Cosmetic[];
	cost?: ItemCostRaw;
	emoji?: Emoji;
}

export interface Item {
	name: string;
	cosmetics: Cosmetic[];
	cost: ItemCost | null;
	emoji: Emoji | null;
}

interface ResolveOfferOptions {
	seasonName?: SeasonName;
	eventName?: EventName;
}

export function resolveOffer(
	items: readonly ItemRaw[],
	{ seasonName, eventName }: ResolveOfferOptions = {},
) {
	return items.map((item) => ({
		...item,
		cosmetics: Array.isArray(item.cosmetic) ? item.cosmetic : [item.cosmetic],
		// TypeScript states this is too complex to represent, so this is a workaround.
		emoji: (item.emoji as Emoji) ?? null,
		cost: item.cost
			? {
					...item.cost,
					seasonalCandles:
						seasonName && item.cost.seasonalCandles
							? [{ cost: item.cost.seasonalCandles, seasonName }]
							: [],
					seasonalHearts:
						seasonName && item.cost.seasonalHearts
							? [{ cost: item.cost.seasonalHearts, seasonName }]
							: [],
					eventCurrency:
						eventName && item.cost.eventCurrency
							? [{ cost: item.cost.eventCurrency, eventName }]
							: [],
				}
			: null,
	}));
}

export function resolveAllCosmetics(items: readonly Item[]) {
	return items.reduce<number[]>((total, { cosmetics }) => {
		total.push(...cosmetics);
		return total;
	}, []);
}

export function addCosts(items: ItemCost[]) {
	const result = items.reduce<Required<ItemCost>>(
		(
			total,
			{
				money = 0,
				candles = 0,
				hearts = 0,
				ascendedCandles = 0,
				seasonalCandles = [],
				seasonalHearts = [],
				eventCurrency = [],
			},
		) => {
			total.money += Math.round(money * 100);
			total.candles += candles;
			total.hearts += hearts;
			total.ascendedCandles += ascendedCandles;

			for (const seasonalCandle of seasonalCandles) {
				const sameSeason = total.seasonalCandles.findIndex(
					({ seasonName }) => seasonName === seasonalCandle.seasonName,
				);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalCandles.push({ ...seasonalCandle });
				} else {
					total.seasonalCandles.at(sameSeason)!.cost += seasonalCandle.cost;
				}
			}

			for (const seasonalHeart of seasonalHearts) {
				const sameSeason = total.seasonalHearts.findIndex(
					({ seasonName }) => seasonName === seasonalHeart.seasonName,
				);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalHearts.push({ ...seasonalHeart });
				} else {
					total.seasonalHearts.at(sameSeason)!.cost += seasonalHeart.cost;
				}
			}

			for (const event of eventCurrency) {
				const sameEvent = total.eventCurrency.findIndex(
					({ eventName }) => eventName === event.eventName,
				);

				if (sameEvent === -1) {
					// Prevents mutation.
					total.eventCurrency.push({ ...event });
				} else {
					total.eventCurrency.at(sameEvent)!.cost += event.cost;
				}
			}

			return total;
		},
		{
			money: 0,
			candles: 0,
			hearts: 0,
			ascendedCandles: 0,
			seasonalCandles: [],
			seasonalHearts: [],
			eventCurrency: [],
		},
	);

	result.money /= 100;
	return result;
}

export function resolveCostToString(cost: ItemCost) {
	const totalCost = [];

	if (cost.money) {
		totalCost.push(`$${cost.money} `);
	}

	if (cost.candles) {
		totalCost.push(
			resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Candle, number: cost.candles }),
		);
	}

	if (cost.hearts) {
		totalCost.push(
			resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: cost.hearts }),
		);
	}

	if (cost.ascendedCandles) {
		totalCost.push(
			resolveCurrencyEmoji({
				emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
				number: cost.ascendedCandles,
			}),
		);
	}

	if (cost.seasonalCandles) {
		for (const seasonalCandles of cost.seasonalCandles) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji: SeasonNameToSeasonalCandleEmoji[seasonalCandles.seasonName],
					number: seasonalCandles.cost,
				}),
			);
		}
	}

	if (cost.seasonalHearts) {
		for (const seasonalHearts of cost.seasonalHearts) {
			const { seasonName } = seasonalHearts;

			totalCost.push(
				resolveCurrencyEmoji({
					emoji:
						seasonName !== SeasonName.Gratitude && seasonName !== SeasonName.Lightseekers
							? SeasonNameToSeasonalHeartEmoji[seasonName]
							: MISCELLANEOUS_EMOJIS.SeasonalHeart,
					number: seasonalHearts.cost,
				}),
			);
		}
	}

	if (cost.eventCurrency) {
		for (const event of cost.eventCurrency) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji:
						EventNameToEventCurrencyEmoji[event.eventName] ?? MISCELLANEOUS_EMOJIS.EventCurrency,
					number: event.cost,
				}),
			);
		}
	}

	return totalCost;
}

export const enum CatalogueType {
	StandardSpirits = 0,
	Elders = 1,
	SeasonalSpirits = 2,
	Events = 3,
	StarterPacks = 4,
	SecretArea = 5,
	HarmonyHall = 6,
	PermanentEventStore = 7,
	NestingWorkshop = 8,
}
