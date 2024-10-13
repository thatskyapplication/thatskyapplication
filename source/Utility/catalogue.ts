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
	MobileCape = 7,
	EmotePoint1 = 8,
	EmotePoint2 = 9,
	PointingCandlemakerHair = 10,
	PointingCandlemakerBlessing1 = 11,
	PointingCandlemakerHeart = 12,
	PointingCandlemakerWingBuff = 13,
	EmotePoint3 = 14,
	EmotePoint4 = 15,
	PointingCandlemakerOutfit = 16,
	PointingCandlemakerBlessing2 = 17,
	EmoteCome1 = 18,
	EmoteCome2 = 19,
	UsheringStargazerHair = 20,
	UsheringStargazerBlessing1 = 21,
	UsheringStargazerHeart = 22,
	UsheringStargazerWingBuff = 23,
	EmoteCome3 = 24,
	EmoteCome4 = 25,
	UsheringStargazerOutfit = 26,
	UsheringStargazerBlessing2 = 27,
	EmoteNoThanks1 = 28,
	EmoteNoThanks2 = 29,
	RejectingVoyagerBlessing1 = 30,
	RejectingVoyagerHair = 31,
	RejectingVoyagerHeart = 32,
	RejectingVoyagerWingBuff = 33,
	EmoteNoThanks3 = 34,
	EmoteNoThanks4 = 35,
	RejectingVoyagerFaceAccessory = 36,
	RejectingVoyagerBlessing2 = 37,
	EmoteButterfly1 = 38,
	EmoteButterfly2 = 39,
	ButterflyCharmerBlessing1 = 40,
	ButterflyCharmerCape1 = 41,
	ButterflyCharmerHeart = 42,
	ButterflyCharmerWingBuff1 = 43,
	EmoteButterfly3 = 44,
	EmoteButterfly4 = 45,
	ButterflyCharmerOutfit = 46,
	EmoteClap1 = 47,
	EmoteClap2 = 48,
	ApplaudingBellmakerBlessing1 = 49,
	ApplaudingBellmakerHair = 50,
	ApplaudingBellmakerHeart = 51,
	ApplaudingBellmakerWingBuff = 52,
	EmoteClap3 = 53,
	EmoteClap4 = 54,
	ApplaudingBellmakerBlessing2 = 55,
	EmoteWave1 = 56,
	EmoteWave2 = 57,
	WavingBellmakerBlessing1 = 58,
	WavingBellmakerHair = 59,
	WavingBellmakerHeart = 60,
	WavingBellmakerWingBuff1 = 61,
	EmoteWave3 = 62,
	EmoteWave4 = 63,
	WavingBellmakerBlessing2 = 64,
	WavingBellmakerMask = 65,
	WavingBellmakerWingBuff2 = 66,
	EmoteWave5 = 67,
	EmoteWave6 = 68,
	EmoteYawn1 = 69,
	EmoteYawn2 = 70,
	SlumberingShipwrightBlessing1 = 71,
	SlumberingShipwrightHair = 72,
	SlumberingShipwrightHeart = 73,
	SlumberingShipwrightWingBuff = 74,
	EmoteYawn3 = 75,
	EmoteYawn4 = 76,
	SlumberingShipwrightBlessing2 = 77,
	EmoteLaugh1 = 78,
	EmoteLaugh2 = 79,
	LaughingLightCollectorBlessing1 = 80,
	LaughingLightCollectorHarp = 81,
	LaughingLightCollectorHeart = 82,
	LaughingLightCollectorWingBuff = 83,
	EmoteLaugh3 = 84,
	EmoteLaugh4 = 85,
	LaughingLightCollectorHair = 86,
	LaughingLightCollectorBlessing2 = 87,
	CallBird = 88,
	BirdWhispererMusicSheet = 89,
	BirdWhispererBlessing1 = 90,
	BirdWhispererHeart = 91,
	BirdWhispererWingBuff = 92,
	BirdWhispererBlessing2 = 93,
	BirdWhispererHair = 94,
	EmoteWipeBrow1 = 95,
	EmoteWipeBrow2 = 96,
	ExhaustedDockWorkerBlessing1 = 97,
	ExhaustedDockWorkerHeart = 98,
	ExhaustedDockWorkerWingBuff = 99,
	EmoteWipeBrow3 = 100,
	EmoteWipeBrow4 = 101,
	ExhaustedDockWorkerBlessing2 = 102,
	ExhaustedDockWorkerFaceAccessory = 103,
	EmoteTeamwork = 104,
	CeremonialWorshipperBlessing1 = 105,
	CeremonialWorshipperHeart = 106,
	CeremonialWorshipperWingBuff = 107,
	CeremonialWorshipperBlessing2 = 108,
	EmoteShiver1 = 109,
	EmoteShiver2 = 110,
	ShiveringTrailblazerBlessing1 = 111,
	ShiveringTrailblazerOutfit = 112,
	ShiveringTrailblazerHeart = 113,
	ShiveringTrailblazerWingBuff = 114,
	EmoteShiver3 = 115,
	EmoteShiver4 = 116,
	ShiveringTrailblazerBlessing2 = 117,
	ShiveringTrailblazerHair = 118,
	EmoteBlush1 = 119,
	EmoteBlush2 = 120,
	BlushingProspectorBlessing1 = 121,
	BlushingProspectorHair = 122,
	BlushingProspectorHeart = 123,
	BlushingProspectorWingBuff = 124,
	EmoteBlush3 = 125,
	EmoteBlush4 = 126,
	BlushingProspectorBlessing2 = 127,
	BlushingProspectorDrum = 128,
	EmoteHideAndSeek = 129,
	HideAndSeekPioneerHair = 130,
	HideAndSeekPioneerBlessing1 = 131,
	HideAndSeekPioneerHeart = 132,
	HideAndSeekPioneerWingBuff1 = 133,
	HideAndSeekPioneerBlessing2 = 134,
	HideAndSeekPioneerMask = 135,
	HideAndSeekPioneerWingBuff2 = 136,
	HideAndSeekPioneerOutfit = 137,
	EmoteAngry1 = 138,
	EmoteAngry2 = 139,
	PoutyPorterBlessing1 = 140,
	PoutyPorterHair = 141,
	PoutyPorterHeart = 142,
	PoutyPorterWingBuff1 = 143,
	EmoteAngry3 = 144,
	EmoteAngry4 = 145,
	PoutyPorterBlessing2 = 146,
	PoutyPorterCape1 = 147,
	Shocked1 = 148,
	Shocked2 = 149,
	DismayedHunterBlessing1 = 150,
	DismayedHunterHair = 151,
	DismayedHunterHeart = 152,
	DismayedHunterWingBuff1 = 153,
	Shocked3 = 154,
	Shocked4 = 155,
	DismayedHunterBlessing2 = 156,
	DismayedHunterCape1 = 157,
	EmoteApologise1 = 158,
	EmoteApologise2 = 159,
	ApologeticLumberjackBlessing1 = 160,
	ApologeticLumberjackHair = 161,
	ApologeticLumberjackHeart = 162,
	ApologeticLumberjackWingBuff = 163,
	EmoteApologise3 = 164,
	EmoteApologise4 = 165,
	ApologeticLumberjackBlessing2 = 166,
	ApologeticLumberjackFaceAccessory = 167,
	EmoteCrying1 = 168,
	EmoteCrying2 = 169,
	TearfulLightMinerBlessing1 = 170,
	TearfulLightMinerHair = 171,
	TearfulLightMinerHeart = 172,
	TearfulLightMinerWingBuff1 = 173,
	EmoteCrying3 = 174,
	EmoteCrying4 = 175,
	TearfulLightMinerBlessing2 = 176,
	TearfulLightMinerWingBuff2 = 177,
	EmoteCrying5 = 178,
	EmoteCrying6 = 179,
	CallWhale = 180,
	WhaleWhispererBlessing1 = 181,
	WhaleWhispererHeart = 182,
	WhaleWhispererWingBuff = 183,
	WhaleWhispererBlessing2 = 184,
	WhaleWhispererMusicSheet = 185,
	StanceConfident = 186,
	ConfidentSightseerHair = 187,
	ConfidentSightseerBlessing1 = 188,
	ConfidentSightseerHeart = 189,
	ConfidentSightseerWingBuff = 190,
	ConfidentSightseerBlessing2 = 191,
	ConfidentSightseerOutfit = 192,
	EmoteHandstand1 = 193,
	EmoteHandstand2 = 194,
	HandstandingThrillseekerBlessing1 = 195,
	HandstandingThrillseekerHeart = 196,
	HandstandingThrillseekerWingBuff1 = 197,
	EmoteHandstand3 = 198,
	EmoteHandstand4 = 199,
	HandstandingThrillseekerBlessing2 = 200,
	HandstandingThrillseekerCape1 = 201,
	CallManta = 202,
	MantaWhispererBlessing1 = 203,
	MantaWhispererHeart = 204,
	MantaWhispererWingBuff = 205,
	MantaWhispererBlessing2 = 206,
	MantaWhispererMusicSheet = 207,
	EmoteBackflip1 = 208,
	EmoteBackflip2 = 209,
	BackflippingChampionBlessing1 = 210,
	BackflippingChampionHair = 211,
	BackflippingChampionHeart = 212,
	BackflippingChampionWingBuff = 213,
	EmoteBackflip3 = 214,
	EmoteBackflip4 = 215,
	BackflippingChampionBlessing2 = 216,
	BackflippingChampionFaceAccessory = 217,
	EmoteCheer1 = 218,
	EmoteCheer2 = 219,
	CheerfulSpectatorBlessing1 = 220,
	CheerfulSpectatorHair = 221,
	CheerfulSpectatorHeart = 222,
	CheerfulSpectatorWingBuff = 223,
	EmoteCheer3 = 224,
	EmoteCheer4 = 225,
	CheerfulSpectatorBlessing2 = 226,
	CheerfulSpectatorPiano = 227,
	EmoteBow1 = 228,
	EmoteBow2 = 229,
	BowingMedalistBlessing1 = 230,
	BowingMedalistHair = 231,
	BowingMedalistHeart = 232,
	BowingMedalistWingBuff = 233,
	EmoteBow3 = 234,
	EmoteBow4 = 235,
	BowingMedalistBlessing2 = 236,
	BowingMedalistFaceAccessory = 237,
	StanceProud = 238,
	ProudVictorCape1 = 239,
	ProudVictorBlessing1 = 240,
	ProudVictorHeart = 241,
	ProudVictorWingBuff1 = 242,
	ProudVictorBlessing2 = 243,
	ProudVictorMask = 244,
	EmoteDuck1 = 245,
	EmoteDuck2 = 246,
	FrightenedRefugeeBlessing1 = 247,
	FrightenedRefugeeHair = 248,
	FrightenedRefugeeHeart = 249,
	FrightenedRefugeeWingBuff = 250,
	EmoteDuck3 = 251,
	EmoteDuck4 = 252,
	FrightenedRefugeeBlessing2 = 253,
	FrightenedRefugeeContrabass = 254,
	EmoteFaint1 = 255,
	EmoteFaint2 = 256,
	FaintingWarriorBlessing1 = 257,
	FaintingWarriorHair = 258,
	FaintingWarriorHeart = 259,
	FaintingWarriorWingBuff = 260,
	EmoteFaint3 = 261,
	EmoteFaint4 = 262,
	FaintingWarriorBlessing2 = 263,
	FaintingWarriorMask = 264,
	StanceCourageous = 265,
	CourageousSoldierHair = 266,
	CourageousSoldierBlessing1 = 267,
	CourageousSoldierHeart = 268,
	CourageousSoldierWingBuff1 = 269,
	CourageousSoldierBlessing2 = 270,
	CourageousSoldierCape1 = 271,
	StanceSneaky = 272,
	StealthySurvivorHair = 273,
	StealthySurvivorBlessing1 = 274,
	StealthySurvivorHeart = 275,
	StealthySurvivorWingBuff1 = 276,
	StealthySurvivorBlessing2 = 277,
	StealthySurvivorCape1 = 278,
	EmoteSalute1 = 279,
	EmoteSalute2 = 280,
	SalutingCaptainBlessing1 = 281,
	SalutingCaptainHair = 282,
	SalutingCaptainHeart = 283,
	SalutingCaptainWingBuff = 284,
	EmoteSalute3 = 285,
	EmoteSalute4 = 286,
	SalutingCaptainBlessing2 = 287,
	SalutingCaptainFireworksStaff = 288,
	EmoteLookAround1 = 289,
	EmoteLookAround2 = 290,
	LookoutScoutBlessing1 = 291,
	LookoutScoutHorn = 292,
	LookoutScoutHeart = 293,
	LookoutScoutWingBuff = 294,
	EmoteLookAround3 = 295,
	EmoteLookAround4 = 296,
	LookoutScoutBlessing2 = 297,
	LookoutScoutFaceAccessory = 298,
	EmotePray1 = 299,
	EmotePray2 = 300,
	PrayingAcolyteBlessing1 = 301,
	PrayingAcolyteHair = 302,
	PrayingAcolyteHeart = 303,
	PrayingAcolyteWingBuff1 = 304,
	EmotePray3 = 305,
	EmotePray4 = 306,
	PrayingAcolyteBlessing2 = 307,
	PrayingAcolyteCape1 = 308,
	EmoteTelekinesis1 = 309,
	EmoteTelekinesis2 = 310,
	LevitatingAdeptBlessing1 = 311,
	LevitatingAdeptHair = 312,
	LevitatingAdeptHeart = 313,
	LevitatingAdeptWingBuff = 314,
	EmoteTelekinesis3 = 315,
	EmoteTelekinesis4 = 316,
	LevitatingAdeptBlessing2 = 317,
	LevitatingAdeptFaceAccessory = 318,
	StancePolite = 319,
	PoliteScholarOutfit = 320,
	PoliteScholarBlessing1 = 321,
	PoliteScholarHeart = 322,
	PoliteScholarWingBuff1 = 323,
	PoliteScholarBlessing2 = 324,
	PoliteScholarHair = 325,
	CallCosmicManta = 326,
	MemoryWhispererOutfit = 327,
	MemoryWhispererBlessing1 = 328,
	MemoryWhispererHeart = 329,
	MemoryWhispererWingBuff1 = 330,
	MemoryWhispererBlessing2 = 331,
	MemoryWhispererCape1 = 332,
	EmoteFloat1 = 333,
	EmoteFloat2 = 334,
	MeditatingMonasticBlessing1 = 335,
	MeditatingMonasticHair = 336,
	MeditatingMonasticHeart = 337,
	MeditatingMonasticWingBuff = 338,
	EmoteFloat3 = 339,
	EmoteFloat4 = 340,
	MeditatingMonasticBlessing2 = 341,
	MeditatingMonasticChair = 342,

	ElderOfTheIsleHair = 343,
	ElderOfThePrairieHair = 344,
	ElderOfTheForestHair = 345,
	ElderOfTheValleyHair1 = 346,
	ElderOfTheValleyHair2 = 347,
	ElderOfTheWastelandHair = 348,
	ElderOfTheVaultHair = 349,

	// 19/07/2019 | Season of Gratitude.
	GratitudePendant = 350,
	GratitudeUltimateMask = 351,
	StanceSassy = 352,
	SassyDrifterHair = 353,
	SassyDrifterBlessing1 = 354,
	SassyDrifterBlessing2 = 355,
	SassyDrifterMask = 356,
	EmoteYoga1 = 357,
	EmoteYoga2 = 358,
	StretchingGuruHair = 359,
	StretchingGuruBlessing1 = 360,
	EmoteYoga3 = 361,
	EmoteYoga4 = 362,
	StretchingGuruBlessing2 = 363,
	StretchingGuruCape = 364,
	EmoteKabuki1 = 365,
	EmoteKabuki2 = 366,
	ProvokingPerformerMusicSheet = 367,
	ProvokingPerformerBlessing1 = 368,
	EmoteKabuki3 = 369,
	EmoteKabuki4 = 370,
	ProvokingPerformerHair = 371,
	ProvokingPerformerMask = 372,
	EmoteLeap1 = 373,
	EmoteLeap2 = 374,
	LeapingDancerSmallBell = 375,
	LeapingDancerBlessing1 = 376,
	EmoteLeap3 = 377,
	EmoteLeap4 = 378,
	LeapingDancerBlessing2 = 379,
	LeapingDancerMask = 380,
	EmoteAcknowledge1 = 381,
	EmoteAcknowledge2 = 382,
	SalutingProtectorMusicSheet = 383,
	SalutingProtectorBlessing1 = 384,
	EmoteAcknowledge3 = 385,
	EmoteAcknowledge4 = 386,
	SalutingProtectorCape = 387,
	SalutingProtectorMask = 388,
	EmoteKungFu1 = 389,
	EmoteKungFu2 = 390,
	GreetingShamanBlessing1 = 391,
	GreetingShamanLargeBell = 392,
	EmoteKungFu3 = 393,
	EmoteKungFu4 = 394,
	GreetingShamanBlessing2 = 395,
	GreetingShamanMask = 396,

	// 12/08/2024 | Beta cape.
	BetaCape = 397,

	// 22/09/2019 | Founder's Pack.
	FoundersCape = 398,

	// 23/09/2019 | Season of Lightseekers.
	LightseekerPendant = 399,
	LightseekerUltimateProp = 400,
	FriendActionCarry1 = 401,
	PiggybackLightseekerMask = 402,
	PiggybackLightseekerBlessing1 = 403,
	PiggybackLightseekerBlessing2 = 404,
	FriendActionCarry2 = 405,
	PiggybackLightseekerHair = 406,
	PiggybackLightseekerCape = 407,
	FriendActionDoubleFive1 = 408,
	DoublefiveLightCatcherBlessing1 = 409,
	DoublefiveLightCatcherHair = 410,
	DoublefiveLightCatcherMask = 411,
	FriendActionDoubleFive2 = 412,
	DoublefiveLightCatcherBlessing2 = 413,
	DoublefiveLightCatcherFlute = 414,
	StanceLaidback = 415,
	LaidbackPioneerMask = 416,
	LaidbackPioneerBlessing1 = 417,
	LaidbackPioneerBlessing2 = 418,
	LaidbackPioneerMusicSheet = 419,
	LaidbackPioneerHair = 420,
	LaidbackPioneerBlessing3 = 421,
	LaidbackPioneerBlessing4 = 422,
	LaidbackPioneerUmbrella = 423,
	EmoteTripleAxel1 = 424,
	EmoteTripleAxel2 = 425,
	TwirlingChampionBlessing1 = 426,
	TwirlingChampionMask = 427,
	EmoteTripleAxel3 = 428,
	EmoteTripleAxel4 = 429,
	TwirlingChampionHair = 430,
	TwirlingChampionPanflute = 431,
	CallCrab = 432,
	CrabWhispererMask = 433,
	CrabWhispererBlessing1 = 434,
	CrabWhispererBlessing2 = 435,
	CrabWhispererMusicSheet = 436,
	CrabWhispererBlessing3 = 437,
	CrabWhispererBlessing4 = 438,
	CrabWhispererHair = 439,
	CrabWhispererCape = 440,
	EmoteShush1 = 441,
	EmoteShush2 = 442,
	ShushingLightScholarBlessing1 = 443,
	ShushingLightScholarMask = 444,
	EmoteShush3 = 445,
	EmoteShush4 = 446,
	ShushingLightScholarBlessing2 = 447,
	ShushingLightScholarCape = 448,

	// 27/10/2019 | Halloween Office Event.
	SpookyBatCape = 449,
	HungryPumpkinHat = 450,

	// 18/11/2019 | Season of Belonging.
	BelongingPendant = 451,
	BelongingBonfire = 452,
	EmoteBoogieDance1 = 453,
	EmoteBoogieDance2 = 454,
	BoogieKidBlessing1 = 455,
	BoogieKidBlessing2 = 456,
	EmoteBoogieDance3 = 457,
	EmoteBoogieDance4 = 458,
	BoogieKidMask = 459,
	BoogieKidOutfit = 460,
	BoogieKidSeasonalHeart = 461,
	EmoteConfetti1 = 462,
	EmoteConfetti2 = 463,
	ConfettiCousinBlessing1 = 464,
	ConfettiCousinBlessing2 = 465,
	EmoteConfetti3 = 466,
	EmoteConfetti4 = 467,
	ConfettiCousinCape = 468,
	ConfettiCousinHair = 469,
	ConfettiCousinSeasonalHeart = 470,
	FriendActionHairTousle1 = 471,
	HairtousleTeenBlessing1 = 472,
	HairtousleTeenBlessing2 = 473,
	HairtousleTeenMusicSheet = 474,
	FriendActionHairTousle2 = 475,
	HairtousleTeenBlessing3 = 476,
	HairtousleTeenEarmuffs = 477,
	HairtousleTeenUkulele = 478,
	HairtousleTeenBlessing4 = 479,
	HairtousleTeenSeasonalHeart = 480,
	EmoteSparkler1 = 481,
	EmoteSparkler2 = 482,
	SparklerParentBlessing1 = 483,
	SparklerParentMask = 484,
	EmoteSparkler3 = 485,
	EmoteSparkler4 = 486,
	SparklerParentHair = 487,
	SparklerParentBlessing2 = 488,
	SparklerParentSeasonalHeart = 489,
	EmoteDontGo1 = 490,
	EmoteDontGo2 = 491,
	PleafulParentBlessing1 = 492,
	PleafulParentGuitar = 493,
	EmoteDontGo3 = 494,
	EmoteDontGo4 = 495,
	PleafulParentMask = 496,
	PleafulParentCape = 497,
	PleafulParentSeasonalHeart = 498,
	StanceWise = 499,
	WiseGrandparentBlessing1 = 500,
	WiseGrandparentMusicSheet = 501,
	WiseGrandparentBlessing2 = 502,
	WiseGrandparentBlessing3 = 503,
	WiseGrandparentMask = 504,
	WiseGrandparentBlessing4 = 505,
	WiseGrandparentBlessing5 = 506,
	WiseGrandparentCape = 507,
	WiseGrandparentSeasonalHeart = 508,

	// 22/12/2019 | Days of Feast.
	DaysOfFeastHat = 509,

	// 24/01/2020 | Season of Rhythm.
	RhythmPendant = 510,
	RhythmUltimateMask = 511,
	RhythmUltimateHair = 512,
	EmoteWelcome1 = 513,
	EmoteWelcome2 = 514,
	TroupeGreeterMusicSheet = 515,
	TroupeGreeterBlessing1 = 516,
	EmoteWelcome3 = 517,
	EmoteWelcome4 = 518,
	TroupeGreeterMask = 519,
	TroupeGreeterOutfit = 520,
	TroupeGreeterSeasonalHeart = 521,
	EmoteSpinDance1 = 522,
	EmoteSpinDance2 = 523,
	FestivalSpinDancerBlessing1 = 524,
	FestivalSpinDancerMusicSheet = 525,
	EmoteSpinDance3 = 526,
	EmoteSpinDance4 = 527,
	FestivalSpinDancerHair = 528,
	FestivalSpinDancerOutfit = 529,
	FestivalSpinDancerSeasonalHeart = 530,
	EmoteBlowKiss1 = 531,
	EmoteBlowKiss2 = 532,
	AdmiringActorBlessing1 = 533,
	AdmiringActorMusicSheet = 534,
	EmoteBlowKiss3 = 535,
	EmoteBlowKiss4 = 536,
	AdmiringActorOutfit = 537,
	AdmiringActorMask = 538,
	AdmiringActorSeasonalHeart = 539,
	EmoteJuggle1 = 540,
	EmoteJuggle2 = 541,
	TroupeJugglerHair = 542,
	TroupeJugglerBlessing1 = 543,
	EmoteJuggle3 = 544,
	EmoteJuggle4 = 545,
	TroupeJugglerBlessing2 = 546,
	TroupeJugglerCape = 547,
	TroupeJugglerOutfit = 548,
	TroupeJugglerBlessing3 = 549,
	TroupeJugglerSeasonalHeart = 550,
	EmoteRespect1 = 551,
	EmoteRespect2 = 552,
	RespectfulPianistHair = 553,
	RespectfulPianistBlessing1 = 554,
	EmoteRespect3 = 555,
	EmoteRespect4 = 556,
	RespectfulPianistBlessing2 = 557,
	RespectfulPianistWinterPiano = 558,
	RespectfulPianistMask = 559,
	RespectfulPianistBlessing3 = 560,
	RespectfulPianistSeasonalHeart = 561,
	EmoteThinking1 = 562,
	EmoteThinking2 = 563,
	ThoughtfulDirectorBlessing1 = 564,
	ThoughtfulDirectorMask = 565,
	EmoteThinking3 = 566,
	EmoteThinking4 = 567,
	ThoughtfulDirectorXylophone = 568,
	ThoughtfulDirectorBlessing2 = 569,
	ThoughtfulDirectorBlessing3 = 570,
	ThoughtfulDirectorCape = 571,
	ThoughtfulDirectorSeasonalHeart = 572,

	// 31/01/2020 | Travelling spirit #1.
	SassyDrifterHeart = 573,
	SassyDrifterWingBuff = 574,

	// 12/02/2020 12:00 | Days of Love.
	DaysOfLoveSwing = 575,

	// 14/02/2020 | Travelling spirit #2.
	DoublefiveLightCatcherHeart = 576,
	DoublefiveLightCatcherWingBuff = 577,

	// 27/02/2020 | Travelling spirit #3.
	LaidbackPioneerHeart = 578,
	LaidbackPioneerWingBuff = 579,

	// 12/03/2020 | Travelling spirit #4.
	ProvokingPerformerHeart = 580,
	ProvokingPerformerWingBuff = 581,
	ProvokingPerformerBlessing2 = 582,

	// 26/03/2020 | Travelling spirit #5.
	PleafulParentWingBuff = 583,
	PleafulParentBlessing2 = 584,

	// 09/04/2020 | Travelling spirit #6.
	CrabWhispererHeart = 585,
	CrabWhispererWingBuff = 586,

	// 16/04/2020 | Travelling spirit #7.
	PiggybackLightseekerHeart = 587,
	PiggybackLightseekerWingBuff = 588,

	// 20/04/2020 | Season of Enchantment.
	EnchantmentGuideQuest1 = 589,
	EnchantmentGuideHeart1 = 590,
	EnchantmentPendant = 591,
	EnchantmentUltimateFaceAccessory = 592,
	EnchantmentTurban = 593,
	EmoteNod1 = 594,
	EmoteNod2 = 595,
	NoddingMuralistMask = 596,
	NoddingMuralistBlessing1 = 597,
	EmoteNod3 = 598,
	EmoteNod4 = 599,
	NoddingMuralistBlessing2 = 600,
	NoddingMuralistHair = 601,
	NoddingMuralistSeasonalHeart = 602,
	EmoteShrug1 = 603,
	EmoteShrug2 = 604,
	IndifferentAlchemistBlessing1 = 605,
	IndifferentAlchemistMask = 606,
	EmoteShrug3 = 607,
	EmoteShrug4 = 608,
	IndifferentAlchemistHair = 609,
	IndifferentAlchemistBlessing2 = 610,
	IndifferentAlchemistBlessing3 = 611,
	IndifferentAlchemistCape = 612,
	IndifferentAlchemistSeasonalHeart = 613,
	EmoteCrabWalk1 = 614,
	EmoteCrabWalk2 = 615,
	CrabWalkerHair = 616,
	CrabWalkerBlessing1 = 617,
	EmoteCrabWalk3 = 618,
	EmoteCrabWalk4 = 619,
	CrabWalkerBlessing2 = 620,
	CrabWalkerCape = 621,
	CrabWalkerSeasonalHeart = 622,
	EmoteBoo1 = 623,
	EmoteBoo2 = 624,
	ScarecrowFarmerBlessing1 = 625,
	ScarecrowFarmerMask = 626,
	EmoteBoo3 = 627,
	EmoteBoo4 = 628,
	ScarecrowFarmerHair = 629,
	ScarecrowFarmerBlessing2 = 630,
	ScarecrowFarmerSeasonalHeart = 631,
	EmoteDoze1 = 632,
	EmoteDoze2 = 633,
	SnoozingCarpenterBlessing1 = 634,
	SnoozingCarpenterHair = 635,
	EmoteDoze3 = 636,
	EmoteDoze4 = 637,
	SnoozingCarpenterCape = 638,
	SnoozingCarpenterBlessing2 = 639,
	SnoozingCarpenterSeasonalHeart = 640,
	FriendActionPlayFight1 = 641,
	PlayfightingHerbalistBlessing1 = 642,
	PlayfightingHerbalistMask = 643,
	PlayfightingHerbalistBlessing2 = 644,
	PlayfightingHerbalistBlessing3 = 645,
	FriendActionPlayFight2 = 646,
	PlayfightingHerbalistMusicSheet = 647,
	PlayfightingHerbalistHair = 648,
	PlayfightingHerbalistCape = 649,
	PlayfightingHerbalistBlessing4 = 650,
	PlayfightingHerbalistSeasonalHeart = 651,

	// 20/04/2020 | Days of Nature.
	EarthCape = 652,

	// 27/04/2020 | Season of Enchantment Quest 2.
	EnchantmentGuideQuest2 = 653,
	EnchantmentGuideHeart2 = 654,

	// 30/04/2020 | Travelling spirit #8.
	StretchingGuruHeart = 655,
	StretchingGuruWingBuff = 656,

	// 04/05/2020 | Season of Enchantment Quest 3.
	EnchantmentGuideQuest3 = 657,
	EnchantmentGuideHeart3 = 658,

	// 11/05/2020 | Season of Enchantment Quest 4.
	EnchantmentGuideQuest4 = 659,
	EnchantmentGuideHeart4 = 660,

	// 14/05/2020 | Travelling spirit #9.
	SparklerParentWingBuff = 661,

	// 18/05/2020 | Season of Enchantment Quest 5.
	EnchantmentGuideQuest5 = 662,
	EnchantmentGuideHeart5 = 663,

	// 18/05/2020 12:00 | Days of Healing.
	HealingHairAccessory = 664,

	// 28/05/2020 | Travelling Spirit Error.
	SalutingProtectorHeart = 665,
	SalutingProtectorWingBuff = 666,
	SalutingProtectorBlessing2 = 667,

	// 11/06/2020 | Season of Enchantment Quest 6.
	EnchantmentGuideQuest6 = 668,
	EnchantmentGuideHeart6 = 669,
	EnchantmentGuideHug = 670,

	// 11/06/2020 | Travelling spirit #11.
	HairtousleTeenWingBuff = 671,

	// 25/06/2020 | Travelling spirit #12.
	LeapingDancingHeart = 672,
	LeapingDancingWingBuff = 673,

	// 09/07/2020 | Travelling spirit #13.
	ConfettiCousinWingBuff = 674,

	// 13/07/2020 | Season of Sanctuary.
	SanctuaryGuideQuest1 = 675,
	SanctuaryGuideHeart1 = 676,
	SanctuaryPendant = 677,
	SanctuaryHandpan = 678,
	SanctuaryGuideMantaCape = 679,
	CallJellyfish = 680,
	JellyWhispererMusicSheet = 681,
	JellyWhispererBlessing1 = 682,
	JellyWhispererHair = 683,
	JellyWhispererBlessing2 = 684,
	JellyWhispererBlessing3 = 685,
	JellyWhispererOutfit = 686,
	JellyWhispererSeasonalHeart = 687,
	StanceTimid = 688,
	TimidBookwormBlessing1 = 689,
	TimidBookwormMusicSheet = 690,
	TimidBookwormHair = 691,
	TimidBookwormBlessing2 = 692,
	TimidBookwormBlessing3 = 693,
	TimidBookwormCape = 694,
	TimidBookwormSeasonalHeart = 695,
	EmoteRallyCheer1 = 696,
	EmoteRallyCheer2 = 697,
	RallyingThrillseekerHair = 698,
	RallyingThrillseekerBlessing1 = 699,
	EmoteRallyCheer3 = 700,
	EmoteRallyCheer4 = 701,
	RallyingThrillseekerOutfit = 702,
	RallyingThrillseekerBlessing2 = 703,
	RallyingThrillseekerSeasonalHeart = 704,
	EmoteGrumpy1 = 705,
	EmoteGrumpy2 = 706,
	HikingGrouchBlessing1 = 707,
	HikingGrouchMask = 708,
	EmoteGrumpy3 = 709,
	EmoteGrumpy4 = 710,
	HikingGrouchHair = 711,
	HikingGrouchBlessing2 = 712,
	HikingGrouchBlessing3 = 713,
	HikingGrouchBowTie = 714,
	HikingGrouchSeasonalHeart = 715,
	EmoteGrateful1 = 716,
	EmoteGrateful2 = 717,
	GratefulShellCollectorBlessing1 = 718,
	GratefulShellCollectorHair = 719,
	EmoteGrateful3 = 720,
	EmoteGrateful4 = 721,
	GratefulShellCollectorCape = 722,
	GratefulShellCollectorBlessing2 = 723,
	GratefulShellCollectorSeasonalHeart = 724,
	EmoteBellyScratch1 = 725,
	EmoteBellyScratch2 = 726,
	ChillSunbatherBlessing1 = 727,
	ChillSunbatherFaceAccessory = 728,
	EmoteBellyScratch3 = 729,
	EmoteBellyScratch4 = 730,
	ChillSunbatherHairAccessory = 731,
	ChillSunbatherBlessing2 = 732,
	ChillSunbatherCape = 733,
	ChillSunbatherBlessing3 = 734,
	ChillSunbatherSeasonalHeart = 735,

	// 13/07/2020 | Sky Anniversary.
	SkyAnniversaryHairAccessory1 = 736,

	// 20/07/2020 | Season of Sanctuary Quest 2.
	SanctuaryGuideQuest2 = 737,
	SanctuaryGuideHeart2 = 738,

	// 23/07/2020 | Travelling spirit #14.
	GreetingShamanHeart = 739,
	GreetingShamanWingBuff = 740,

	// 27/07/2020 | Season of Sanctuary Quest 3.
	SanctuaryGuideQuest3 = 741,
	SanctuaryGuideHeart3 = 742,

	// 04/08/2020 | Season of Sanctuary Quest 4.
	SanctuaryGuideQuest4 = 743,
	SanctuaryGuideHeart4 = 744,

	// 06/08/2020 | Travelling spirit #15.
	WiseGrandparentWingBuff = 745,

	// 10/08/2020 | Season of Sanctuary Quest 5.
	SanctuaryGuideQuest5 = 746,
	SanctuaryGuideHeart5 = 747,

	// 20/08/2020 | Travelling spirit #16.
	ShushingLightScholarHeart = 748,
	ShushingLightScholarWingBuff = 749,

	// 03/09/2020 | Travelling spirit #17.
	FestivalSpinDancerWingBuff = 750,
	FestivalSpinDancerBlessing2 = 751,

	// 08/09/2020 | Season of Sanctuary Quest 6.
	SanctuaryGuideQuest6 = 752,
	SanctuaryGuideHeart6 = 753,
	SanctuaryGuideFriendActionHug = 754,

	// 08/09/2020 | Days of Summer Lights.
	DaysOfSummerLightsLantern = 755,

	// 17/09/2020 | Travelling spirit #18.
	TwirlingChampionHeart = 756,
	TwirlingChampionWingBuff = 757,
	TwirlingChampionBlessing2 = 758,

	// 05/10/2020 | Season of Prophecy.
	ProphecyGuideQuest1 = 759,
	ProphecyGuideHeart1 = 760,
	ProphecyPendant = 761,
	ProphecyGuideDunun = 762,
	ProphecyGuideAnubisMask = 763,
	EmoteDeepBreath1 = 764,
	EmoteDeepBreath2 = 765,
	ProphetOfWaterBlessing1 = 766,
	ProphetOfWaterHair = 767,
	EmoteDeepBreath3 = 768,
	EmoteDeepBreath4 = 769,
	ProphetOfWaterBlessing2 = 770,
	ProphetOfWaterCape = 771,
	ProphetOfWaterMask = 772,
	ProphetOfWaterBlessing3 = 773,
	ProphetOfWaterSeasonalHeart = 774,
	EmoteDustOff1 = 775,
	EmoteDustOff2 = 776,
	ProphetOfEarthHair = 777,
	ProphetOfEarthBlessing1 = 778,
	EmoteDustOff3 = 779,
	EmoteDustOff4 = 780,
	ProphetOfEarthMusicSheet = 781,
	ProphetOfEarthBlessing2 = 782,
	ProphetOfEarthCape = 783,
	ProphetOfEarthMask = 784,
	ProphetOfEarthSeasonalHeart = 785,
	EmoteBalance1 = 786,
	EmoteBalance2 = 787,
	ProphetOfAirHair = 788,
	ProphetOfAirBlessing1 = 789,
	EmoteBalance3 = 790,
	EmoteBalance4 = 791,
	ProphetOfAirBlessing2 = 792,
	ProphetOfAirMask = 793,
	ProphetOfAirCape = 794,
	ProphetOfAirBlessing3 = 795,
	ProphetOfAirSeasonalHeart = 796,
	EmoteChestPound1 = 797,
	EmoteChestPound2 = 798,
	ProphetOfFireBlessing1 = 799,
	ProphetOfFireHair = 800,
	EmoteChestPound3 = 801,
	EmoteChestPound4 = 802,
	ProphetOfFireBlessing2 = 803,
	ProphetOfFireMusicSheet = 804,
	ProphetOfFireMask = 805,
	ProphetOfFireOutfit = 806,
	ProphetOfFireSeasonalHeart = 807,

	// 12/10/2020 | Season of Prophecy Quest 2.
	ProphecyGuideQuest2 = 808,
	ProphecyGuideHeart2 = 809,

	// 15/10/2020 | Travelling spirit #20.
	AdmiringActorWingBuff = 810,
	AdmiringActorBlessing2 = 811,

	// 22/10/2020 | Days of Mischief.
	MischiefWebCape = 812,
	MischiefWitchHat = 813,

	// 26/10/2020 | Season of Prophecy Quest 3.
	ProphecyGuideQuest3 = 814,
	ProphecyGuideHeart3 = 815,

	// 29/10/2020 | Travelling Spirit #21.
	IndifferentAlchemistWingBuff = 816,

	// 09/11/2020 | Season of Prophecy Quest 4.
	ProphecyGuideQuest4 = 817,
	ProphecyGuideHeart4 = 818,

	// 12/11/2020 | Travelling Spirit #22.
	BoogieKidWingBuff = 819,

	// 15/12/2020 | Version 0.12.0.
	ButterflyCharmerBlessing2 = 820,
	ButterflyCharmerWingBuff2 = 821,
	ButterflyCharmerCape2 = 822,
	ProudVictorWingBuff2 = 823,
	ProudVictorCape2 = 824,
	PoutyPorterWingBuff2 = 825,
	PoutyPorterCape2 = 826,

	// 21/12/2020 | Days of Feast.
	FeastNeckTie = 827,
	DaysOfFeastCape = 828,
	DaysOfFeastTable = 829,
	DaysOfFeastHorns = 830,
	SnowflakeCape = 831,

	// 24/12/2020 | Travelling Spirit #25.
	TroupeGreeterWingBuff = 832,
	TroupeGreeterBlessing2 = 833,

	// 04/01/2021 | Season of Dreams.
	DreamsPendant = 834,
	DreamsGuideQuest1 = 835,
	DreamsGuideHeart1 = 836,
	DreamsGuidePhoenixMask = 837,
	DreamsGuideUltimateCape = 838,
	EmoteSpinTrick1 = 839,
	EmoteSpinTrick2 = 840,
	SpinningMentorHair = 841,
	SpinningMentorBlessing1 = 842,
	EmoteSpinTrick3 = 843,
	EmoteSpinTrick4 = 844,
	SpinningMentorMask = 845,
	SpinningMentorBlessing2 = 846,
	SpinningMentorBlessing3 = 847,
	SpinningMentorCape = 848,
	SpinningMentorSeasonalHeart = 849,
	EmoteShowDance1 = 850,
	EmoteShowDance2 = 851,
	DancingPerformerBlessing1 = 852,
	DancingPerformerHair = 853,
	EmoteShowDance3 = 854,
	EmoteShowDance4 = 855,
	DancingPerformerBlessing2 = 856,
	DancingPerformerMask = 857,
	DancingPerformerCape = 858,
	DancingPerformerLute = 859,
	DancingPerformerSeasonalHeart = 860,
	EmotePeek1 = 861,
	EmotePeek2 = 862,
	PeekingPostmanMusicSheet = 863,
	PeekingPostmanBlessing1 = 864,
	EmotePeek3 = 865,
	EmotePeek4 = 866,
	PeekingPostmanOutfit = 867,
	PeekingPostmanBlessing2 = 868,
	PeekingPostmanCape = 869,
	PeekingPostmanRabbitMask = 870,
	PeekingPostmanSeasonalHeart = 871,
	FriendActionBearhug1 = 872,
	BearhugHermitBlessing1 = 873,
	BearhugHermitRedHorns = 874,
	BearhugHermitBlessing2 = 875,
	BearhugHermitMusicSheet = 876,
	BearhugHermitBlessing3 = 877,
	FriendActionBearhug2 = 878,
	BearhugHermitHair = 879,
	BearhugHermitOutfit = 880,
	BearhugHermitSeasonalHeart = 881,

	// 07/01/2021 | Travelling Spirit #26.
	NoddingMuralistWingBuff = 882,

	// 11/01/2021 | Season of Dreams Quest 2.
	DreamsGuideQuest2 = 883,
	DreamsGuideHeart2 = 884,

	// 25/01/2021 | Season of Dreams Quest 3.
	DreamsGuideQuest3 = 885,
	DreamsGuideHeart3 = 886,

	// 04/02/2021 | Travelling Spirit Error.
	CrabWalkerWingBuff = 887,

	// 04/02/2021 | Travelling Spirit #28.
	RespectfulPianistWingBuff = 888,

	// 06/02/2021 | Version 0.12.3.
	CourageousSoldierWingBuff2 = 889,
	CourageousSoldierCape2 = 890,
	PrayingAcolyteWingBuff2 = 891,
	PrayingAcolyteCape2 = 892,

	// 08/02/2021 | Season of Dreams Quest 4.
	DreamsGuideQuest4 = 893,
	DreamsGuideHeart4 = 894,

	// 08/02/2021 12:00 | Days of Fortune.
	DaysOfFortuneMask = 895,
	DaysOfFortuneHeaddress = 896,
	DaysOfFortuneOrange = 897,
	DaysOfFortuneCape = 898,
	FortuneBlushingMask = 899,
	FortuneBunHair = 900,
	DaysOfFortuneWoolHat = 901, // 21/02/2021 12:00.

	// 12/02/2021 12:00 | Days of Love.
	DaysOfLoveMask = 902,
	DaysOfLoveSeesaw = 903, // 12/02/2021 12:00.

	// 15/02/2021 | Season of Dreams Quest 5.
	DreamsGuideQuest5 = 904,
	DreamsGuideHeart5 = 905,

	// 16/03/2021 | Version 0.13.0.
	DismayedHunterWingBuff2 = 906,
	DismayedHunterCape2 = 907,

	// 22/03/2021 | Days of Bloom.
	BloomHair = 908,
	BloomCape = 909,
	PinkBloomTeaset = 910,

	// 05/04/2021 | Season of Assembly.
	AssemblyGuideQuest1 = 911,
	AssemblyGuideHeart1 = 912,
	AssemblyPendant = 913,
	AssemblyGuideUltimateMask = 914,
	AssemblyGuideUltimateHair = 915,
	AssemblyGuideBugle = 916,
	AssemblyGuideUltimateCape = 917,
	AssemblyGuideHighFive = 918,
	EmoteFacepalm1 = 919,
	EmoteFacepalm2 = 920,
	BaffledBotanistBlessing1 = 921,
	BaffledBotanistHair = 922,
	EmoteFacepalm3 = 923,
	EmoteFacepalm4 = 924,
	BaffledBotanistMask = 925,
	BaffledBotanistBlessing2 = 926,
	BaffledBotanistBlessing3 = 927,
	BaffledBotanistProp = 928,
	BaffledBotanistSeasonalHeart = 929,
	EmoteScold1 = 930,
	EmoteScold2 = 931,
	ScoldingStudentMask = 932,
	ScoldingStudentBlessing1 = 933,
	EmoteScold3 = 934,
	EmoteScold4 = 935,
	ScoldingStudentHair = 936,
	ScoldingStudentBlessing2 = 937,
	ScoldingStudentBlessing3 = 938,
	ScoldingStudentCape = 939,
	ScoldingStudentSeasonalHeart = 940,
	EmoteEww1 = 941,
	EmoteEww2 = 942,
	ScaredyCadetMask = 943,
	ScaredyCadetBlessing1 = 944,
	EmoteEww3 = 945,
	EmoteEww4 = 946,
	ScaredyCadetMusicSheet = 947,
	ScaredyCadetHair = 948,
	ScaredyCadetHammock = 949,
	ScaredyCadetBlessing2 = 950,
	ScaredyCadetSeasonalHeart = 951,
	EmoteMarching1 = 952,
	EmoteMarching2 = 953,
	MarchingAdventurerHair = 954,
	MarchingAdventurerBlessing1 = 955,
	EmoteMarching3 = 956,
	EmoteMarching4 = 957,
	MarchingAdventurerBlessing2 = 958,
	MarchingAdventurerMask = 959,
	MarchingAdventurerTikiTorch = 960,
	MarchingAdventurerBlessing3 = 961,
	MarchingAdventurerSeasonalHeart = 962,
	EmoteChuckle1 = 963,
	EmoteChuckle2 = 964,
	ChucklingScoutMask = 965,
	ChucklingScoutBlessing1 = 966,
	EmoteChuckle3 = 967,
	EmoteChuckle4 = 968,
	ChucklingScoutBlessing2 = 969,
	ChucklingScoutOutfit = 970,
	ChucklingScoutProp = 971,
	ChucklingScoutBlessing3 = 972,
	ChucklingScoutSeasonalHeart = 973,
	EmoteBubbles1 = 974,
	EmoteBubbles2 = 975,
	DaydreamForesterMask = 976,
	DaydreamForesterBlessing1 = 977,
	EmoteBubbles3 = 978,
	EmoteBubbles4 = 979,
	DaydreamForesterMusicSheet = 980,
	DaydreamForesterBlessing2 = 981,
	DaydreamForesterBlessing3 = 982,
	DaydreamForesterHair = 983,
	DaydreamForesterSeasonalHeart = 984,

	// 19/04/2021 | Season of Assembly Quest 2.
	AssemblyGuideQuest2 = 985,
	AssemblyGuidePillow = 986,

	// 19/04/2021 | Days of Nature.
	OceanNecklace = 987,
	OceanCape = 988,

	// 29/04/2021 | Travelling Spirit #34.
	RallyingThrillseekerWingBuff = 989,

	// 03/05/2021 | Season of Assembly Quest 3.
	AssemblyGuideQuest3 = 990,
	AssemblyGuideHeart2 = 991,
	AssemblyGuideFriendActionHug = 992,

	// 10/05/2021 | Season of Assembly Quest 4.
	AssemblyGuideQuest4 = 993,
	AssemblyGuideJar = 994,

	// 13/05/2021 | Travelling Spirit #35.
	ThoughtfulDirectorWingBuff = 995,

	// 17/05/2021 | Season of Assembly Quest 5.
	AssemblyGuideQuest5 = 996,
	AssemblyGuideBrazier = 997,
	AssemblyGuideDoubleFive = 998,

	// 27/05/2021 | Travelling Spirit #36.
	SnoozingCarpenterWingBuff = 999,

	// 27/05/2021 | Version 0.13.4.
	HandstandingThrillseekerWingBuff2 = 1000,
	HandstandingThrillseekerCape2 = 1001,

	// 31/05/2021 | Season of Assembly Quest 6.
	AssemblyGuideQuest6 = 1002,
	AssemblyGuideHeart3 = 1003,
	AssemblyGuideBookcase = 1004,
	AssemblyGuideTarpaulin = 1005,

	// 10/06/2021 | Travelling Spirit #37.
	TimidBookwormWingBuff = 1006,

	// 14/06/2021 | Days of Rainbow.
	RainbowBraid = 1007,
	RainbowCape = 1008,
	RainbowHat = 1009,
	RainbowFlower = 1010,

	// 29/06/2021 | Nintendo Switch release.
	SwitchBlueCape = 1011,
	SwitchRedCape = 1012,
	VesselFlute = 1013,
	ElvishHairstyle = 1014,

	// 06/07/2021 | Season of the Little Prince.
	LittlePrinceScarf = 1015,
	LittlePrinceFox = 1016,
	TheRoseQuest1 = 1017,
	TheRoseHeart1 = 1018,
	LittlePrincePendant = 1019,
	TheRoseUltimateHair = 1020,
	TheRoseUltimateOutfit = 1021,
	TheRoseRose = 1022,
	EmoteBeckon1 = 1023,
	EmoteBeckon2 = 1024,
	BeckoningRulerBlessing1 = 1025,
	BeckoningRulerHair = 1026,
	EmoteBeckon3 = 1027,
	EmoteBeckon4 = 1028,
	BeckoningRulerFrogMask = 1029,
	BeckoningRulerBlessing2 = 1030,
	BeckoningRulerSeasonalHeart = 1031,
	EmoteGloat1 = 1032,
	EmoteGloat2 = 1033,
	GloatingNarcissistBlessing1 = 1034,
	GloatingNarcissistMusicSheet = 1035,
	EmoteGloat3 = 1036,
	EmoteGloat4 = 1037,
	GloatingNarcissistBlessing2 = 1038,
	GloatingNarcissistOutfit = 1039,
	GloatingNarcissistHair = 1040,
	GloatingNarcissistBlessing3 = 1041,
	GloatingNarcissistSeasonalHeart = 1042,
	EmoteStretch1 = 1043,
	EmoteStretch2 = 1044,
	StretchingLamplighterBlessing1 = 1045,
	StretchingLamplighterHair = 1046,
	EmoteStretch3 = 1047,
	EmoteStretch4 = 1048,
	StretchingLamplighterCape = 1049,
	StretchingLamplighterBlessing2 = 1050,
	StretchingLamplighterSeasonalHeart = 1051,
	EmoteSlouch1 = 1052,
	EmoteSlouch2 = 1053,
	SlouchingSoldierBlessing1 = 1054,
	SlouchingSoldierHair = 1055,
	EmoteSlouch3 = 1056,
	EmoteSlouch4 = 1057,
	SlouchingSoldierBlessing2 = 1058,
	SlouchingSoldierMusicSheet = 1059,
	SlouchingSoldierCape = 1060,
	SlouchingSoldierBlessing3 = 1061,
	SlouchingSoldierSeasonalHeart = 1062,
	EmoteSneeze1 = 1063,
	EmoteSneeze2 = 1064,
	SneezingGeographerHair = 1065,
	SneezingGeographerBlessing1 = 1066,
	EmoteSneeze3 = 1067,
	EmoteSneeze4 = 1068,
	SneezingGeographerBlessing2 = 1069,
	SneezingGeographerCape = 1070,
	SneezingGeographerSeasonalHeart = 1071,
	EmoteHandRub1 = 1072,
	EmoteHandRub2 = 1073,
	StarCollectorNecktie = 1074,
	StarCollectorBlessing1 = 1075,
	EmoteHandRub3 = 1076,
	EmoteHandRub4 = 1077,
	StarCollectorBlessing2 = 1078,
	StarCollectorCape = 1079,
	StarCollectorProp = 1080,
	StarCollectorBlessing3 = 1081,
	StarCollectorSeasonalHeart = 1082,

	// 12/07/2021 | Sky Anniversary.
	SkyAnniversaryHairAccessory2 = 1083,
	SkyAnniversaryProp = 1084,

	// 15/07/2021 | Season of the Little Prince Quest 2.
	TheRoseQuest2 = 1085,
	TheRoseHeart2 = 1086,

	// 23/07/2021 | Season of the Little Prince Quest 3.
	TheRoseQuest3 = 1087,
	TheRoseHeart3 = 1088,

	// 02/08/2021 | Season of the Little Prince Quest 4.
	TheRoseQuest4 = 1089,
	TheRoseHeart4 = 1090,

	// 05/08/2021 | Travelling Spirit #41.
	ProphetOfWaterProp = 1091,
	ProphetOfWaterWingBuff = 1092,

	// 11/08/2021 | Season of the Little Prince Quest 5.
	TheRoseQuest5 = 1093,
	TheRoseHeart5 = 1094,

	// 12/08/2021 | Days of Summer.
	DoubleDeckChairs = 1095,
	SummerHat = 1096,
	SummerUmbrella = 1097,
	SummerShellHairPin = 1098,

	// 19/08/2021 | Travelling Spirit #42.
	ChillSunbatherSunlounger = 1099,
	ChillSunbatherWingBuff = 1100,

	// 20/08/2021 | Season of the Little Prince Quest 6.
	TheRoseQuest6 = 1101,
	TheRoseHeart6 = 1102,

	// 30/08/2021 | Season of the Little Prince Quest 7.
	TheRoseQuest7 = 1103,
	TheRoseHeart7 = 1104,
	SwordOutfit = 1105,
	LittlePrinceAsteroidJacket = 1106,

	// 02/09/2021 | Travelling Spirit #43.
	CrabWhispererPipe = 1107,

	// 16/09/2021 | Travelling Spirit #44.
	TroupeJugglerProp = 1108,
	TroupeJugglerWingBuff = 1109,

	// 20/09/2021 | Days of Summer Lights.
	SummerLightsAccessory = 1110,

	// 30/09/2021 | Travelling Spirit #45.
	GratefulShellCollectorChairs = 1111,
	GratefulShellCollectorWingBuff = 1112,

	// 04/10/2021 | Season of Flight.
	FlightGuideQuest1 = 1113,
	FlightGuideHeart1 = 1114,
	FlightPendant = 1115,
	FlightGuideUltimateHairAccessory = 1116,
	FlightGuideUltimateOutfit = 1117,
	EmoteNavigate1 = 1118,
	EmoteNavigate2 = 1119,
	LivelyNavigatorBlessing1 = 1120,
	LivelyNavigatorHair = 1121,
	LivelyNavigatorHairAccessory = 1122,
	LivelyNavigatorBlessing2 = 1123,
	EmoteNavigate3 = 1124,
	EmoteNavigate4 = 1125,
	LivelyNavigatorTrailSpell1 = 1126,
	LivelyNavigatorCape = 1127,
	LivelyNavigatorMusicSheet = 1128,
	LivelyNavigatorTrailSpell2 = 1129,
	LivelyNavigatorSeasonalHeart = 1130,
	CallBabyManta = 1131,
	LightWhispererBlessing1 = 1132,
	LightWhispererHairAccessory = 1133,
	LightWhispererHair = 1134,
	LightWhispererBlessing2 = 1135,
	LightWhispererTrailSpell1 = 1136,
	LightWhispererCape = 1137,
	LightWhispererOutfit = 1138,
	LightWhispererTrailSpell2 = 1139,
	LightWhispererSeasonalHeart = 1140,
	StanceTinker = 1141,
	TinkeringChimesmithBlessing1 = 1142,
	TinkeringChimesmithOutfit = 1143,
	TinkeringChimesmithHairAccessory = 1144,
	TinkeringChimesmithBlessing2 = 1145,
	TinkeringChimesmithTrailSpell1 = 1146,
	TinkeringChimesmithKalimba = 1147,
	TinkeringChimesmithHair = 1148,
	TinkeringChimesmithTrailSpell2 = 1149,
	TinkeringChimesmithSeasonalHeart = 1150,
	EmoteVoilà1 = 1151,
	EmoteVoilà2 = 1152,
	TalentedBuilderBlessing1 = 1153,
	TalentedBuilderMusicSheet = 1154,
	TalentedBuilderNeckAccessory = 1155,
	TalentedBuilderBlessing2 = 1156,
	EmoteVoilà3 = 1157,
	EmoteVoilà4 = 1158,
	TalentedBuilderTrailSpell1 = 1159,
	TalentedBuilderOutfit = 1160,
	TalentedBuilderHair = 1161,
	TalentedBuilderTrailSpell2 = 1162,
	TalentedBuilderSeasonalHeart = 1163,

	// 14/10/2021 | Travelling Spirit #46.
	FestivalSpinDancerProp = 1164,

	// 18/10/2021 | Season of Flight Quest 2.
	FlightGuideQuest2 = 1165,
	FlightGuideHeart2 = 1166,
	FlightGuideHighFive = 1167,

	// 18/10/2021 | Days of Mischief.
	MischiefWitchHair = 1168,
	MischiefWitheredCape = 1169,
	MischiefSpookyDiningSet = 1170,
	MischiefWitchJumper = 1171,
	MischiefWitheredAntlers = 1172,
	MischiefSpiderQuiff = 1173,
	MischiefPumpkinProp = 1174,

	// 28/10/2021 | Travelling Spirit #47.
	PlayfightingHerbalistWingBuff = 1175,
	PlayfightingHerbalistOrb = 1176,

	// 01/11/2021 | Season of Flight Quest 3.
	FlightGuideQuest3 = 1177,
	FlightGuideHeart3 = 1178,

	// 11/11/2021 | Travelling Spirit #48.
	WiseGrandparentProp = 1179,

	// 15/11/2021 | Season of Flight Quest 4.
	FlightGuideQuest4 = 1180,
	FlightGuideHeart4 = 1181,

	// 18/11/2021 | Version 0.15.5.
	DreamsGuideFriendActionHug = 1182,
	ProphecyGuideFriendActionHug = 1183,

	// 25/11/2021 | Travelling Spirit #49.
	JellyWhispererWingBuff = 1184,
	JellyWhispererUmbrella = 1185,

	// 29/11/2021 | Season of Flight Quest 5.
	FlightGuideQuest5 = 1186,
	FlightGuideHeart5 = 1187,
	FlightGuideFriendActionHug = 1188,

	// 09/12/2021 | Travelling Spirit #50.
	ProphetOfFireWingBuff = 1189,
	ProphetOfFireCauldron = 1190,

	// 20/12/2021 | Days of Feast.
	OdeToJoyMusicSheet = 1191,
	WinterFeastPillow = 1192,
	WinterFeastScarf = 1193,
	WinterFeastHat = 1194,
	SnowflakeHairAccessory = 1195,
	WinterAncestorCape = 1196,
	WinterFeastSnowGlobe = 1197,

	// 23/12/2021 | Travelling Spirit #51.
	SparklerParentPinwheel = 1198,

	// 06/01/2022 | Travelling Spirit Error.
	ProphetOfEarthProp = 1199,
	ProphetOfEarthWingBuff = 1200,

	// 17/01/2022 | Season of Abyss.
	AbyssGuideQuest1 = 1201,
	AbyssGuideHeart1 = 1202,
	AbyssGuidePendant = 1203,
	AbyssGuideUltimateFaceAccessory = 1204,
	AbyssGuideUltimateCape = 1205,
	AbyssGuideUltimateMask = 1206,
	EmoteAnxious1 = 1207,
	EmoteAnxious2 = 1208,
	AnxiousAnglerBlessing1 = 1209,
	AnxiousAnglerMask = 1210,
	AnxiousAnglerHair = 1211,
	AnxiousAnglerBlessing2 = 1212,
	EmoteAnxious3 = 1213,
	EmoteAnxious4 = 1214,
	AnxiousAnglerBlessing3 = 1215,
	AnxiousAnglerCape = 1216,
	AnxiousAnglerOutfit = 1217,
	AnxiousAnglerBlessing4 = 1218,
	AnxiousAnglerSeasonalHeart = 1219,
	EmoteCalmDown1 = 1220,
	EmoteCalmDown2 = 1221,
	CeasingCommodoreBlessing1 = 1222,
	CeasingCommodoreHair = 1223,
	CeasingCommodoreMask = 1224,
	CeasingCommodoreBlessing2 = 1225,
	EmoteCalmDown3 = 1226,
	EmoteCalmDown4 = 1227,
	CeasingCommodoreCape = 1228,
	CeasingCommodoreBlessing3 = 1229,
	CeasingCommodoreSeasonalHeart = 1230,
	EmoteOuch1 = 1231,
	EmoteOuch2 = 1232,
	BumblingBoatswainBlessing1 = 1233,
	BumblingBoatswainMask = 1234,
	BumblingBoatswainMusicSheet = 1235,
	BumblingBoatswainBlessing2 = 1236,
	EmoteOuch3 = 1237,
	EmoteOuch4 = 1238,
	BumblingBoatswainBlessing3 = 1239,
	BumblingBoatswainCape = 1240,
	BumblingBoatswainHairAccessory = 1241,
	BumblingBoatswainBlessing4 = 1242,
	BumblingBoatswainSeasonalHeart = 1243,
	EmoteEvilLaugh1 = 1244,
	EmoteEvilLaugh2 = 1245,
	CacklingCannoneerBlessing1 = 1246,
	CacklingCannoneerMusicSheet = 1247,
	CacklingCannoneerMask = 1248,
	CacklingCannoneerBlessing2 = 1249,
	EmoteEvilLaugh3 = 1250,
	EmoteEvilLaugh4 = 1251,
	CacklingCannoneerCape = 1252,
	CacklingCannoneerBlessing3 = 1253,
	CacklingCannoneerBlessing4 = 1254,
	CacklingCannoneerHair = 1255,
	CacklingCannoneerSeasonalHeart = 1256,

	// 24/01/2022 | Season of Abyss Quest 2.
	AbyssGuideQuest2 = 1257,
	AbyssGuideHeart2 = 1258,

	// 24/01/2022 | Days of Fortune.
	DaysOfFortuneTigerMask = 1259,
	DaysOfFortuneFishCape = 1260,
	DaysOfFortuneFishHood = 1261,
	DaysOfFortuneFishAccessory = 1262,

	// 31/01/2022 | Season of Abyss Quest 3.
	AbyssGuideQuest3 = 1263,
	AbyssGuideHeart3 = 1264,

	// 07/02/2022 | Days of Love.
	DaysOfLoveFlowerCrown = 1265,
	DaysOfLoveGondola = 1266,

	// 14/02/2022 | Season of Abyss Quest 4.
	AbyssGuideQuest4 = 1267,
	AbyssGuideHeart4 = 1268,

	// 17/02/2022 | Travelling Spirit #55.
	HikingGrouchWingBuff = 1269,

	// 25/02/2022 | Kizuna AI.
	KizunaAIHair = 1270,
	KizunaAIBow = 1271,
	KizunaAICape = 1272,

	// 07/03/2022 | Season of Abyss Quest 5.
	AbyssGuideQuest5 = 1273,
	AbyssGuideHeart5 = 1274,
	AbyssGuideMask = 1275,

	// 28/03/2022 | Days of Bloom.
	PurpleBloomCape = 1276,
	PurpleBloomTeaset = 1277,

	// 31/03/2022 | Travelling Spirit #58.
	ScarecrowFarmerWingBuff = 1278,

	// 05/04/2022 | Version 0.17.0.
	MemoryWhispererWingBuff2 = 1279,
	MemoryWhispererCape2 = 1280,

	// 11/04/2022 | Season of Performance.
	PerformanceGuideQuest1 = 1281,
	PerformanceGuideSharedMemorySpell1 = 1282,
	PerformanceGuidePendant = 1283,
	PerformanceGuideUltimateMask = 1284,
	PerformanceGuideUltimateCape = 1285,
	PerformanceGuideUltimateHair = 1286,
	PerformanceGuideHighFive = 1287,
	PerformanceGuideHeart1 = 1288,
	FriendActionHandshake1 = 1289,
	FranticStagehandBlessing1 = 1290,
	FranticStagehandHood = 1291,
	FranticStagehandMusicSheet = 1292,
	FranticStagehandBlessing2 = 1293,
	FranticStagehandBlessing3 = 1294,
	FriendActionHandshake2 = 1295,
	FranticStagehandMask = 1296,
	FranticStagehandOutfit = 1297,
	FranticStagehandSeasonalHeart = 1298,
	EmoteAww1 = 1299,
	EmoteAww2 = 1300,
	ForgetfulStorytellerBlessing1 = 1301,
	ForgetfulStorytellerMask = 1302,
	ForgetfulStorytellerHair = 1303,
	ForgetfulStorytellerBlessing2 = 1304,
	EmoteAww3 = 1305,
	EmoteAww4 = 1306,
	ForgetfulStorytellerBlessing3 = 1307,
	ForgetfulStorytellerOutfit = 1308,
	ForgetfulStorytellerCape = 1309,
	ForgetfulStorytellerBlessing4 = 1310,
	ForgetfulStorytellerSeasonalHeart = 1311,
	EmoteHeadbob1 = 1312,
	EmoteHeadbob2 = 1313,
	MellowMusicianMask = 1314,
	MellowMusicianBlessing1 = 1315,
	MellowMusicianBlessing2 = 1316,
	MellowMusicianCape = 1317,
	EmoteHeadbob3 = 1318,
	EmoteHeadbob4 = 1319,
	MellowMusicianBlessing3 = 1320,
	MellowMusicianElectricGuitar = 1321,
	MellowMusicianHair = 1322,
	MellowMusicianBlessing4 = 1323,
	MellowMusicianSeasonalHeart = 1324,
	FriendActionDuetDance1 = 1325,
	ModestDancerBlessing1 = 1326,
	ModestDancerMusicSheet = 1327,
	ModestDancerMask = 1328,
	ModestDancerBlessing2 = 1329,
	ModestDancerBlessing3 = 1330,
	FriendActionDuetDance2 = 1331,
	ModestDancerOutfit = 1332,
	ModestDancerHair = 1333,
	ModestDancerSeasonalHeart = 1334,

	// 14/04/2022 | Travelling Spirit #59.
	SpinningMentorWingBuff = 1335,

	// 18/04/2022 | Days of Nature.
	NatureCoralCrown = 1336,
	NatureTurtleCape = 1337,
	NatureShoulderTurtle = 1338,

	// 25/04/2022 | Season of Performance Quest 2.
	PerformanceGuideQuest2 = 1339,
	PerformanceGuideMask = 1340,

	// 28/04/2022 | Travelling Spirit #60.
	DaydreamForesterWingBuff = 1341,

	// 09/05/2022 | Season of Performance Quest 3.
	PerformanceGuideQuest3 = 1342,
	PerformanceGuideSharedMemorySpell2 = 1343,
	PerformanceGuideDoubleFive = 1344,
	PerformanceGuideHeart2 = 1345,

	// 12/05/2022 | Travelling Spirit #61.
	ProphetOfAirProp = 1346,
	ProphetOfAirWingBuff = 1347,

	// 23/05/2022 | Season of Performance Quest 4.
	PerformanceGuideQuest4 = 1348,
	PerformanceGuideSharedMemorySpell3 = 1349,
	FriendActionHug = 1350,
	PerformanceGuideHeart3 = 1351,

	// 23/05/2022 | Harmony Hall Grand Opening.
	HarmonyHallGrandOpeningHairAccessory = 1352,
	HarmonyHallMusicSheet1 = 1353,
	HarmonyHallMusicSheet2 = 1354,
	HarmonyHallMusicSheet3 = 1355,
	HarmonyHallMusicSheet4 = 1356,
	FledglingHarp = 1357,
	RhythmGuitar = 1358,
	TriumphHandpan = 1359,

	// 06/06/2022 | Season of Performance Quest 5.
	PerformanceGuideQuest5 = 1360,
	PerformanceGuideSharedMemorySpell4 = 1361,
	PerformanceGuideDuetDance = 1362,
	PerformanceGuideHeart4 = 1363,
	PerformanceGuideFlowerPot = 1364,

	// 23/06/2022 | Travelling Spirit #64.
	PeekingPostmanWingBuff = 1365,

	// 28/07/2022 | Version 0.18.0.
	StealthySurvivorWingBuff2 = 1366,
	StealthySurvivorCape2 = 1367,

	// 30/06/2022 | Days of Rainbow.
	RainbowTrousers = 1368,
	RainbowEarring = 1369,
	RainbowHeadphones = 1370,
	RainbowDoubleFlower = 1371,

	// 11/07/2022 | Season of Shattering.
	TheVoidofShatteringQuest1 = 1372,
	TheVoidofShatteringHeart1 = 1373,
	ShatteringPendant = 1374,
	TheVoidofShatteringMantaCape = 1375,
	TheVoidofShatteringDarkDragonCape = 1376,
	AncientLightJellyfishHair = 1377,
	AncientLightJellyfishBlessing1 = 1378,
	AncientLightJellyfishBlessing2 = 1379,
	AncientLightJellyfishHairAccessory = 1380,
	AncientLightJellyfishCape = 1381,
	AncientLightJellyfishBlessing3 = 1382,
	AncientLightJellyfishSeasonalHeart = 1383,
	AncientLightMantaMusicSheet = 1384,
	AncientLightMantaBlessing1 = 1385,
	AncientLightMantaBlessing2 = 1386,
	AncientLightMantaHair = 1387,
	AncientLightMantaCape = 1388,
	AncientLightMantaBlessing3 = 1389,
	AncientLightMantaBlessing4 = 1390,
	AncientLightMantaOutfit = 1391,
	AncientLightMantaSeasonalHeart = 1392,
	AncientDarknessPlantHairAccessory = 1393,
	AncientDarknessPlantBlessing1 = 1394,
	AncientDarknessPlantBlessing2 = 1395,
	AncientDarknessPlantMask = 1396,
	AncientDarknessPlantMusicSheet = 1397,
	AncientDarknessPlantBlessing3 = 1398,
	AncientDarknessPlantBlessing4 = 1399,
	AncientDarknessPlantCape = 1400,
	AncientDarknessPlantSeasonalHeart = 1401,
	AncientDarknessDragonNeckAccessory = 1402,
	AncientDarknessDragonBlessing1 = 1403,
	AncientDarknessDragonBlessing2 = 1404,
	AncientDarknessDragonDarkHorn = 1405,
	AncientDarknessDragonHair = 1406,
	AncientDarknessDragonBlessing3 = 1407,
	AncientDarknessDragonSeasonalHeart = 1408,

	// 18/07/2022 | Sky Anniversary.
	SkyAnniversaryHairAccessory3 = 1409,
	HappyBirthdayMusicSheet = 1410,
	Balloon = 1411,
	LightFence = 1412,
	ConfettiLauncher = 1413,
	TGCGuitar = 1414,

	// 19/07/2022 | Season of Shattering Quest 2.
	TheVoidofShatteringQuest2 = 1415,
	TheVoidofShatteringHeart2 = 1416,

	// 05/08/2022 | Season of Shattering Quest 3.
	TheVoidofShatteringQuest3 = 1417,
	TheVoidofShatteringHeart3 = 1418,

	// 17/08/2022 | Version 0.18.5.
	ElderOfTheIsleFaceAccessory = 1419,
	ElderOfThePrairieFaceAccessory = 1420,
	ElderOfTheForestFaceAccessory = 1421,

	// 18/08/2022 | Travelling Spirit #68.
	ScoldingStudentWingBuff = 1422,

	// 19/08/2022 | Season of Shattering Quest 4.
	TheVoidofShatteringQuest4 = 1423,
	TheVoidofShatteringHeart4 = 1424,

	// 22/08/2022 | Days of Sunlight.
	CampfireTent = 1425,
	JellyShoulderBuddy = 1426,
	CampfireSnackKit = 1427,

	// 02/09/2022 | Season of Shattering Quest 5.
	TheVoidofShatteringQuest5 = 1428,
	TheVoidofShatteringHeart5 = 1429,

	// 16/09/2022 | Season of Shattering Quest 6.
	TheVoidofShatteringQuest6 = 1430,
	TheVoidofShatteringHeart6 = 1431,

	// 29/09/2022 | Travelling Spirit #71.
	BeckoningRulerWingBuff = 1432,

	// 17/10/2022 | Season of AURORA.
	RunawayHairstyle = 1433,
	TiaraWeCanTouch = 1434,
	RunawayOutfit = 1435,
	AURORAQuest1 = 1436,
	EmoteSilentClap2 = 1437,
	AURORAPendant = 1438,
	AURORAAuroraHair = 1439,
	AURORAUltimateOutfit = 1440,
	AURORAUltimateCape = 1441,
	EmoteSilentClap1 = 1442,
	EmoteSilentClap3 = 1443,
	EmoteSilentClap4 = 1444,
	EmoteWavingLight1 = 1445,
	EmoteWavingLight2 = 1446,
	RunningWayfarerMask = 1447,
	RunningWayfarerBlessing1 = 1448,
	RunningWayfarerBlessing2 = 1449,
	RunningWayfarerHair = 1450,
	EmoteWavingLight3 = 1451,
	EmoteWavingLight4 = 1452,
	RunningWayfarerBlessing3 = 1453,
	RunningWayfarerMusicSheet = 1454,
	RunningWayfarerCape = 1455,
	RunningWayfarerBlessing4 = 1456,
	RunningWayfarerSeasonalHeart = 1457,
	EmoteRaiseTheRoof1 = 1458,
	EmoteRaiseTheRoof2 = 1459,
	MindfulMinerBlessing1 = 1460,
	MindfulMinerMask = 1461,
	EmoteRaiseTheRoof3 = 1462,
	EmoteRaiseTheRoof4 = 1463,
	MindfulMinerHair = 1464,
	MindfulMinerBlessing2 = 1465,
	MindfulMinerBlessing3 = 1466,
	MindfulMinerOutfit = 1467,
	MindfulMinerCape = 1468,
	MindfulMinerBlessing4 = 1469,
	MindfulMinerSeasonalHeart = 1470,
	EmoteTwirl1 = 1471,
	EmoteTwirl2 = 1472,
	WarriorOfLoveMask = 1473,
	WarriorOfLoveBlessing1 = 1474,
	WarriorOfLoveBlessing2 = 1475,
	WarriorOfLoveHair = 1476,
	EmoteTwirl3 = 1477,
	EmoteTwirl4 = 1478,
	WarriorOfLoveMusicSheet = 1479,
	WarriorOfLoveBlessing3 = 1480,
	WarriorOfLoveBlessing4 = 1481,
	WarriorOfLoveCape = 1482,
	WarriorOfLoveSeasonalHeart = 1483,
	EmoteRhythmicClap1 = 1484,
	EmoteRhythmicClap2 = 1485,
	SeedOfHopeBlessing1 = 1486,
	SeedOfHopeMask = 1487,
	SeedOfHopeMusicSheet = 1488,
	SeedOfHopeBlessing2 = 1489,
	EmoteRhythmicClap3 = 1490,
	EmoteRhythmicClap4 = 1491,
	SeedOfHopeHair = 1492,
	SeedOfHopeBlessing3 = 1493,
	SeedOfHopeBlessing4 = 1494,
	SeedOfHopeCape = 1495,
	SeedOfHopeSeasonalHeart = 1496,

	// 24/10/2022 | Days of Mischief.
	MischiefTuftedHair = 1497,
	FelineFamiliarProp = 1498,
	CatCostumeMask = 1499,
	CatCostumeCape = 1500,

	// 31/10/2022 | Season of AURORA Quest 2.
	AURORAQuest2 = 1501,
	EmoteConduct1 = 1502,
	EmoteConduct2 = 1503,
	EmoteConduct3 = 1504,
	EmoteConduct4 = 1505,

	// 14/11/2022 | Season of AURORA Quest 3.
	AURORAQuest3 = 1506,
	AURORAHeart = 1507,
	EmoteSkipping1 = 1508,
	EmoteSkipping2 = 1509,
	EmoteSkipping3 = 1510,
	EmoteSkipping4 = 1511,

	// 24/11/2022 | Travelling Spirit #75.
	BearhugHermitWingBuff = 1512,

	// 28/11/2022 | Version 0.19.5.
	VoiceOfAURORA = 1513,

	// 28/11/2022 | Season of AURORA Quest 4.
	AURORAQuest4 = 1514,
	AURORAMusicSheet1 = 1515,

	// 06/12/2022 | PlayStation release.
	JourneyCape = 1516,
	JourneyHood = 1517,
	JourneyMask = 1518,

	// 06/12/2022 | Season of AURORA Quest 5.
	// This is the date of the dress rehearsal. It unlocked for players early.
	GivingInCape = 1519,
	ToTheLoveOutfit = 1520,
	AURORAQuest5 = 1521,
	AURORAMusicSheet2 = 1522,
	AURORAOutfit = 1523,
	AURORAMask = 1524,
	WingsOfAURORA = 1525,

	// 19/12/2022 | Days of Feast.
	FeastGoggles = 1526,
	SnowkidProp = 1527,
	TournamentSkyballSet = 1528,
	CosyHermitCape = 1529,

	// 05/01/2023 | Travelling Spirit #78.
	BaffledBotanistWingBuff = 1530,

	// 16/01/2023 | Season of Remembrance.
	AssemblyGuideSharedSpaceSpell = 1531,
	RemembranceGuideQuest1 = 1532,
	RemembranceGuideHeart1 = 1533,
	RemembrancePendant = 1534,
	RemembranceGuideUltimateNeckAccessory = 1535,
	RemembranceGuideUltimateProp = 1536,
	RemembranceGuideQuest2 = 1537,
	RemembranceGuideChimes = 1538,
	RemembranceGuideHighFive = 1539,
	RemembranceGuideSharedSpaceSpell1 = 1540,
	EmoteGrieving1 = 1541,
	EmoteGrieving2 = 1542,
	BereftVeteranMask = 1543,
	BereftVeteranBlessing1 = 1544,
	BereftVeteranBlessing2 = 1545,
	BereftVeteranHair = 1546,
	EmoteGrieving3 = 1547,
	EmoteGrieving4 = 1548,
	BereftVeteranCape = 1549,
	BereftVeteranBlessing3 = 1550,
	BereftVeteranSeasonalHeart = 1551,
	EmotePleading1 = 1552,
	EmotePleading2 = 1553,
	PleadingChildNeckAccessory = 1554,
	PleadingChildBlessing1 = 1555,
	PleadingChildBlessing2 = 1556,
	PleadingChildHair = 1557,
	EmotePleading3 = 1558,
	EmotePleading4 = 1559,
	PleadingChildOutfit = 1560,
	PleadingChildBlessing3 = 1561,
	PleadingChildSeasonalHeart = 1562,
	EmoteTiptoeing1 = 1563,
	EmoteTiptoeing2 = 1564,
	TiptoeingTeaBrewerBlessing1 = 1565,
	TiptoeingTeaBrewerHair = 1566,
	EmoteTiptoeing3 = 1567,
	EmoteTiptoeing4 = 1568,
	TiptoeingTeaBrewerBlessing2 = 1569,
	TiptoeingTeaBrewerOutfit = 1570,
	TiptoeingTeaBrewerCape = 1571,
	TiptoeingTeaBrewerBlessing3 = 1572,
	TiptoeingTeaBrewerSeasonalHeart = 1573,
	StanceInjured = 1574,
	WoundedWarriorBlessing1 = 1575,
	WoundedWarriorMask = 1576,
	WoundedWarriorOutfit = 1577,
	WoundedWarriorBlessing2 = 1578,
	WoundedWarriorBlessing3 = 1579,
	WoundedWarriorCape = 1580,
	WoundedWarriorSeasonalHeart = 1581,

	// 20/01/2023 | Days of Fortune.
	DaysOfFortuneRabbitMask = 1582,
	DaysOfFortuneMuralistsSmock = 1583,
	DaysOfFortuneEnchantedUmbrella = 1584,

	// 30/01/2023 | Season of Remembrance Quest 3 & Quest 4.
	RemembranceGuideQuest3 = 1585,
	RemembranceGuideHeart2 = 1586,
	RemembranceGuideQuest4 = 1587,
	RemembranceGuideKettle = 1588,
	RemembranceGuideDoubleFive = 1589,
	RemembranceGuideSharedSpaceSpell2 = 1590,

	// 13/02/2023 | Season of Remembrance Quest 5 & Quest 6.
	RemembranceGuideQuest5 = 1591,
	RemembranceGuideHeart3 = 1592,
	RemembranceGuideQuest6 = 1593,
	RemembranceGuidePottedPlant = 1594,

	// 13/02/2023 | Days of Love.
	DaysOfLoveFloweryArchway = 1595,
	DaysOfLoveClassyCravat = 1596,
	DaysOfLoveSerendipitousSceptre = 1597,

	// 16/02/2023 | Travelling Spirit #81.
	SlouchingSoldierWingBuff = 1598,

	// 27/02/2023 | Season of Remembrance Quest 7 & Quest 8.
	RemembranceGuideQuest7 = 1599,
	RemembranceGuideHeart4 = 1600,
	RemembranceGuideQuest8 = 1601,
	RemembranceGuideCrabPlushie = 1602,
	RemembranceGuideMantaPlushie = 1603,
	RemembranceGuideFriendActionHug = 1604,
	RemembranceGuideSharedSpaceSpell3 = 1605,

	// 06/03/2023 | Returning Spirits #1.
	ScaredyCadetWingBuff = 1606,
	MarchingAdventurerWingBuff = 1607,
	ChucklingScoutWingBuff = 1608,

	// 20/03/2023 | Season of Remembrance Quest 9 & Quest 10.
	RemembranceGuideQuest9 = 1609,
	RemembranceGuideSharedSpaceSpell4 = 1610,
	RemembranceGuideQuest10 = 1611,

	// 20/03/2023 | Days of Bloom.
	RedBloomCape = 1612,
	BloomButterflyFountain = 1613,
	BloomGardeningTunic = 1614,
	BloomPicnicBasket = 1615,

	// 13/04/2023 | Travelling Spirit #85.
	SneezingGeographerWingBuff = 1616,

	// 17/04/2023 | Season of Passage.
	PassageGuideQuest1 = 1617,
	PassageGuideHeart1 = 1618,
	PassagePendant = 1619,
	PassageGuideUltimateMask = 1620,
	PassageGuideUltimateCape = 1621,
	EmoteHackySack1 = 1622,
	EmoteHackySack2 = 1623,
	OddballOutcastHair = 1624,
	OddballOutcastBlessing1 = 1625,
	OddballOutcastBlessing2 = 1626,
	OddballOutcastNeckAccessory = 1627,
	EmoteHackySack3 = 1628,
	EmoteHackySack4 = 1629,
	OddballOutcastOutfit = 1630,
	OddballOutcastBlessing3 = 1631,
	OddballOutcastSeasonalHeart = 1632,
	EmoteSomersault1 = 1633,
	EmoteSomersault2 = 1634,
	TumblingTroublemakerBlessing1 = 1635,
	TumblingTroublemakerHair = 1636,
	EmoteSomersault3 = 1637,
	EmoteSomersault4 = 1638,
	TumblingTroublemakerBlessing2 = 1639,
	TumblingTroublemakerCape = 1640,
	TumblingTroublemakerBlessing3 = 1641,
	TumblingTroublemakerFaceAccessory = 1642,
	TumblingTroublemakerSeasonalHeart = 1643,
	EmoteMoping1 = 1644,
	EmoteMoping2 = 1645,
	MelancholyMopeFaceAccessory = 1646,
	MelancholyMopeBlessing1 = 1647,
	MelancholyMopeBlessing2 = 1648,
	MelancholyMopeHair = 1649,
	EmoteMoping3 = 1650,
	EmoteMoping4 = 1651,
	MelancholyMopeOutfit = 1652,
	MelancholyMopeBlessing3 = 1653,
	MelancholyMopeSeasonalHeart = 1654,
	EmotePullUp1 = 1655,
	EmotePullUp2 = 1656,
	OveractiveOverachieverBlessing1 = 1657,
	OveractiveOverachieverMantaOcarina = 1658,
	EmotePullUp3 = 1659,
	EmotePullUp4 = 1660,
	OveractiveOverachieverCape = 1661,
	OveractiveOverachieverBlessing2 = 1662,
	OveractiveOverachieverBlessing3 = 1663,
	OveractiveOverachieverHair = 1664,
	OveractiveOverachieverSeasonalHeart = 1665,

	// 20/04/2023 | Days of Nature.
	NatureSchoolCape = 1666,
	NatureGlasses = 1667,
	NatureSonorousSeashell = 1668,

	// 01/05/2023 | Season of Passage Quest 2.
	PassageGuideQuest2 = 1669,
	PassageGuideSerowMask = 1670,

	// 11/05/2023 | Travelling Spirit #88.
	TinkeringChimesmithWingBuff = 1671,

	// 15/05/2023 | Season of Passage Quest 3.
	PassageGuideQuest3 = 1672,
	PassageGuideHeart2 = 1673,
	PassageGuideBoarMask = 1674,

	// 01/06/2023 | Season of Passage Quest 4.
	PassageGuideQuest4 = 1675,
	PassageGuideHeart3 = 1676,
	PassageGuideMonkeyMask = 1677,

	// 01/06/2023 | Days of Colour.
	DarkRainbowCape = 1678,
	DarkRainbowEarrings = 1679,
	DarkRainbowTunic = 1680,

	// 12/06/2023 | Season of Passage Quest 5.
	PassageGuideQuest5 = 1681,
	PassageGuideHeart4 = 1682,
	PassageGuideHackySack = 1683,
	PassageGuideRacoonMask = 1684,

	// 03/07/2023 | Days of Music.
	DaysOfMusicMusicSheet = 1685,
	TriumphSaxophone = 1686,
	MarchingBandHat = 1687,
	TriumphViolin = 1688,

	// 17/07/2023 | Season of Moments.
	MomentsGuideCamera = 1689,
	MomentsPendant = 1690,
	MomentsGuideUltimateFaceAccessory = 1691,
	MomentsGuideUltimateCamera = 1692,
	MomentsGuideUltimateHairAccessory = 1693,
	MomentsGuideQuest1 = 1694,
	MomentsGuideHeart1 = 1695,
	FriendActionSideHug1 = 1696,
	FriendActionSideHug2 = 1697,
	ReassuringRangerBlessing1 = 1698,
	ReassuringRangerFaceAccessory = 1699,
	ReassuringRangerMask = 1700,
	ReassuringRangerBlessing2 = 1701,
	ReassuringRangerBlessing3 = 1702,
	ReassuringRangerCape = 1703,
	ReassuringRangerHairAccessory = 1704,
	ReassuringRangerBlessing4 = 1705,
	ReassuringRangerSeasonalHeart = 1706,
	CallNightbird = 1707,
	NightbirdWhispererHair = 1708,
	NightbirdWhispererBlessing1 = 1709,
	NightbirdWhispererBlessing2 = 1710,
	NightbirdWhispererHairAccessory = 1711,
	NightbirdWhispererOutfit = 1712,
	NightbirdWhispererBlessing3 = 1713,
	NightbirdWhispererBlessing4 = 1714,
	NightbirdWhispererShoes = 1715,
	NightbirdWhispererSeasonalHeart = 1716,
	EmoteJollyDance1 = 1717,
	EmoteJollyDance2 = 1718,
	JollyGeologistFaceAccessory = 1719,
	JollyGeologistHair = 1720,
	EmoteJollyDance3 = 1721,
	EmoteJollyDance4 = 1722,
	JollyGeologistBlessing1 = 1723,
	JollyGeologistBlessing2 = 1724,
	JollyGeologistMusicSheet = 1725,
	JollyGeologistProp = 1726,
	JollyGeologistSeasonalHeart = 1727,
	EmoteBlindfoldBalancePose1 = 1728,
	EmoteBlindfoldBalancePose2 = 1729,
	AsceticMonkBlessing1 = 1730,
	AsceticMonkMask = 1731,
	AsceticMonkHair = 1732,
	AsceticMonkBlessing2 = 1733,
	EmoteBlindfoldBalancePose3 = 1734,
	EmoteBlindfoldBalancePose4 = 1735,
	AsceticMonkOutfit = 1736,
	AsceticMonkBlessing3 = 1737,
	AsceticMonkSeasonalHeart = 1738,

	// 17/07/2023 | Sky Anniversary.
	SkyAnniversaryHairAccessory4 = 1739,
	AnniversarySonorousSeashell = 1740,
	AnniversaryPartyLights = 1741,
	AnniversaryPlush = 1742,

	// 20/07/2023 | Travelling Spirit #92.
	GloatingNarcissistWingBuff = 1743,

	// 31/07/2023 | Season of Moments Quest 2.
	MomentsGuideQuest2 = 1744,
	MomentsGuideHeart2 = 1745,
	MomentsGuideDoubleFive = 1746,

	// 03/08/2023 | Travelling Spirit #93.
	ProphetOfFireProp = 1747,

	// 07/08/2023 | Returning Spirits #4.
	CacklingCannoneerWingBuff = 1748,

	// 14/08/2023 | Season of Moments Quest 3.
	MomentsGuideQuest3 = 1749,
	MomentsGuideHeart3 = 1750,

	// 17/08/2023 | Travelling Spirit #94.
	LivelyNavigatorWingBuff = 1751,

	// 23/08/2023 | AURORA Encore Concerts.
	EmoteCureForMe1 = 1752,
	EmoteCureForMe2 = 1753,
	MusicalVoyageSneakers = 1754,

	// 28/08/2023 | Season of Moments Quest 4.
	MomentsGuideQuest4 = 1755,
	MomentsGuideHeart4 = 1756,

	// 11/09/2023 | Days of Sunlight.
	SunlightPinkBeachTowelCape = 1757,
	SunlightYellowBeachTowelCape = 1758,
	SunlightBlueBeachTowelCape = 1759,
	SunlightChunkySandals = 1760,
	SunlightSurfboard = 1761,

	// 14/09/2023 | Travelling Spirit #96.
	StarCollectorWingBuff = 1762,

	// 18/09/2023 | Season of Moments Quest 5.
	MomentsGuideQuest5 = 1763,
	MomentsGuideHeart5 = 1764,

	// 02/10/2023 | Days of Style.
	StyleTopHat = 1765,
	StyleRunwayMask = 1766,
	StyleStarSunglasses = 1767,
	StyleSilkBalletSlippers = 1768,
	StyleFlameSunglasses = 1769,
	StyleHeartSunglasses = 1770,
	StyleBunnySlippers = 1771,
	StyleWideLegJeans = 1772,

	// 16/10/2023 | Season of Revival.
	HopefulStewardQuest1 = 1773,
	HopefulStewardHeart1 = 1774,
	RevivalPendant = 1775,
	HopefulStewardUltimateHair = 1776,
	HopefulStewardUltimateCape = 1777,
	VestigeOfADesertedOasisHair = 1778,
	VestigeOfADesertedOasisBlessing1 = 1779,
	VestigeOfADesertedOasisBlessing2 = 1780,
	VestigeOfADesertedOasisCape = 1781,
	VestigeOfADesertedOasisShoes = 1782,
	VestigeOfADesertedOasisBlessing3 = 1783,
	VestigeOfADesertedOasisSeasonalHeart = 1784,
	MemoryOfALostVillageBlessing1 = 1785,
	MemoryOfALostVillageCape = 1786,
	MemoryOfALostVillageOutfit = 1787,
	MemoryOfALostVillageBlessing2 = 1788,
	MemoryOfALostVillageBlessing3 = 1789,
	MemoryOfALostVillageHair = 1790,
	MemoryOfALostVillageSeasonalHeart = 1791,
	EchoOfAnAbandonedRefugeBlessing1 = 1792,
	EchoOfAnAbandonedRefugeShoes = 1793,
	EchoOfAnAbandonedRefugeMusicSheet = 1794,
	EchoOfAnAbandonedRefugeBlessing2 = 1795,
	EchoOfAnAbandonedRefugeBlessing3 = 1796,
	EchoOfAnAbandonedRefugeCape = 1797,
	EchoOfAnAbandonedRefugeHairAccessory = 1798,
	EchoOfAnAbandonedRefugeBlessing4 = 1799,
	EchoOfAnAbandonedRefugeSeasonalHeart = 1800,
	RemnantOfAForgottenHavenBlessing1 = 1801,
	RemnantOfAForgottenHavenShoes = 1802,
	RemnantOfAForgottenHavenCape = 1803,
	RemnantOfAForgottenHavenBlessing2 = 1804,
	RemnantOfAForgottenHavenBlessing3 = 1805,
	RemnantOfAForgottenHavenHairAccessory = 1806,
	RemnantOfAForgottenHavenSeasonalHeart = 1807,

	// 23/10/2023 | Season of Revival Quest 2.
	HopefulStewardQuest2 = 1808,
	HopefulStewardHeart2 = 1809,

	// 23/10/2023 | Days of Mischief.
	MischiefCrabkinAccessory = 1810,
	MischiefGothBoots = 1811,
	MischiefGothGarment = 1812,
	MischiefGossamerCape = 1813,
	MischiefCrabulaCloak = 1814,
	MischiefCrabulaMask = 1815,

	// 30/10/2023 | Season of Revival Quest 3.
	HopefulStewardQuest3 = 1816,
	HopefulStewardHeart3 = 1817,

	// 09/11/2023 | Version 0.23.4
	/**
	 * Unlocked by default.
	 */
	BaseHair2 = 1818,
	/**
	 * Unlocked by default.
	 */
	BaseHair3 = 1819,

	// 13/11/2023 | Season of Revival Quest 4.
	HopefulStewardQuest4 = 1820,
	HopefulStewardHeart4 = 1821,
	HopefulStewardFriendActionHug = 1822,

	// 20/11/2023 | Season of Revival Quest 5.
	HopefulStewardQuest5 = 1823,
	HopefulStewardHeart5 = 1824,

	// 23/11/2023 | Travelling Spirit #101.
	TalentedBuilderWingBuff = 1825,

	// 27/11/2023 | Season of Revival Quest 6.
	HopefulStewardQuest6 = 1826,
	HopefulStewardHeart6 = 1827,

	// 27/11/2023 | Aviary's Firework Festival.
	FestivalEarrings = 1828,
	FestivalSceptre = 1829,
	MothAppreciationCape = 1830,
	MothAppreciationAntennae = 1831,
	SparrowAppreciationCape = 1832,
	SparrowAppreciationMask = 1833,

	// 04/12/2023 | Season of Revival Quest 7.
	HopefulStewardQuest7 = 1834,
	HopefulStewardHeart7 = 1835,

	// 07/12/2023 | Travelling Spirit #102.
	StretchingLamplighterWingBuff = 1836,

	// 12/12/2023 | Season of Revival Quest 8.
	HopefulStewardQuest8 = 1837,
	HopefulStewardHair = 1838,

	// 18/12/2023 | Season of Revival Quest 9.
	HopefulStewardQuest9 = 1839,

	// 18/12/2023 | Days of Feast.
	WinterFeastSnowboard = 1840,
	WinterPineConeHairClip = 1841,
	CourseCreationProp = 1842,
	CosyHermitBoots = 1843,
	WinterQuiltedCape = 1844,

	// 25/12/2023 | Season of Revival Quest 10.
	HopefulStewardQuest10 = 1845,

	// 15/01/2024 | Season of the Nine-Coloured Deer.
	GiftOfTheNineColouredDeer = 1846,
	RadianceOfTheNineColouredDeer = 1847,
	SpiritOfMuralQuest1 = 1848,
	SpiritOfMuralHeart1 = 1849,
	NineColouredDeerPendant = 1850,
	SpiritOfMuralUltimateHair = 1851,
	SpiritOfMuralUltimateOutfit = 1852,
	SpiritOfMuralUltimateCape = 1853,
	EmoteWhistle1 = 1854,
	EmoteWhistle2 = 1855,
	HerbGathererBlessing1 = 1856,
	HerbGathererOutfit = 1857,
	HerbGathererHair = 1858,
	HerbGathererBlessing2 = 1859,
	EmoteWhistle3 = 1860,
	EmoteWhistle4 = 1861,
	HerbGathererProp = 1862,
	HerbGathererBlessing3 = 1863,
	HerbGathererSeasonalHeart = 1864,
	EmoteFlex1 = 1865,
	EmoteFlex2 = 1866,
	HunterOutfit = 1867,
	HunterBlessing1 = 1868,
	EmoteFlex3 = 1869,
	EmoteFlex4 = 1870,
	HunterBlessing2 = 1871,
	HunterHair = 1872,
	HunterCape = 1873,
	HunterBlessing3 = 1874,
	HunterSeasonalHeart = 1875,
	FriendActionCradleCarry1 = 1876,
	FriendActionCradleCarry2 = 1877,
	FeudalLordBlessing1 = 1878,
	FeudalLordHairAccessory = 1879,
	FeudalLordMask = 1880,
	FeudalLordBlessing2 = 1881,
	FeudalLordBlessing3 = 1882,
	FeudalLordCape = 1883,
	FeudalLordMusicSheet = 1884,
	FeudalLordBlessing4 = 1885,
	FeudalLordSeasonalHeart = 1886,
	EmoteFloatSpin1 = 1887,
	EmoteFloatSpin2 = 1888,
	PrincessMask = 1889,
	PrincessBlessing1 = 1890,
	PrincessBlessing2 = 1891,
	PrincessHair = 1892,
	EmoteFloatSpin3 = 1893,
	EmoteFloatSpin4 = 1894,
	PrincessOutfit = 1895,
	PrincessBlessing3 = 1896,
	PrincessBlessing4 = 1897,
	PrincessCape = 1898,
	PrincessSeasonalHeart = 1899,

	// 18/01/2024 | Travelling Spirit #105.
	AnxiousAnglerWingBuff = 1900,

	// 29/01/2024 | Season of the Nine-Coloured Deer Quest 2.
	SpiritOfMuralQuest2 = 1901,
	SpiritOfMuralHeart2 = 1902,

	// 29/01/2024 | Days of Fortune.
	FortuneDragonMask = 1903,
	FortuneDrum = 1904,
	DaysOfFortuneDragonVestment = 1905,
	DaysOfFortuneDragonStole = 1906,
	DaysOfFortuneDragonBangles = 1907,

	// 12/02/2024 | Season of the Nine-Coloured Deer Quest 3.
	SpiritOfMuralQuest3 = 1908,
	SpiritOfMuralHairAccessory = 1909,

	// 12/02/2024 | Days of Love.
	LoveHeartPlushie = 1910,
	LoveHeartBeret = 1911,
	DaysofLoveMusicSheet = 1912,
	DaysofLoveMeteorMantle = 1913,

	// 27/02/2024 | Season of the Nine-Coloured Deer Quest 4.
	SpiritOfMuralQuest4 = 1914,
	SpiritOfMuralHeart3 = 1915,

	// 29/02/2024 | Travelling Spirit #108.
	LightWhispererWingBuff = 1916,

	// 04/03/2024 | Spring Camping.
	CeasingCommodoreWingBuff = 1917,
	FranticStagehandWingBuff = 1918,

	// 11/03/2024 | Season of the Nine-Coloured Deer Quest 5.
	SpiritOfMuralQuest5 = 1919,
	SpiritOfMuralMask = 1920,

	// 25/03/2024 | Days of Bloom.
	BloomArumPetalHair = 1921,
	BloomSpikySprigHair = 1922,
	BloomArumPetalCape = 1923,
	BloomLilypadUmbrella = 1924,

	// 10/04/2024 | Steam release.
	CompanionCube = 1925,

	// 15/04/2024 | Season of Nesting.
	NestingGuideQuest1 = 1926,
	StoneStool = 1927,
	NestingGuideHeart1 = 1928,
	NestingPendant = 1929,
	NestingGuideUltimateOutfit = 1930,
	NestingGuideUltimateProp = 1931,
	NestingSolariumBlessing1 = 1932,
	NestingSolariumProp1 = 1933,
	NestingSolariumProp2 = 1934,
	NestingSolariumBlessing2 = 1935,
	NestingSolariumBlessing3 = 1936,
	NestingSolariumProp3 = 1937,
	NestingSolariumProp4 = 1938,
	NestingSolariumBlessing4 = 1939,
	NestingSolariumSeasonalHeart = 1940,
	NestingLoftBlessing1 = 1941,
	NestingLoftProp1 = 1942,
	NestingLoftProp2 = 1943,
	NestingLoftBlessing2 = 1944,
	NestingLoftBlessing3 = 1945,
	NestingLoftCape = 1946,
	NestingLoftProp3 = 1947,
	NestingLoftBlessing4 = 1948,
	NestingLoftSeasonalHeart = 1949,
	NestingAtriumProp1 = 1950,
	NestingAtriumBlessing1 = 1951,
	NestingAtriumBlessing2 = 1952,
	NestingAtriumProp2 = 1953,
	NestingAtriumHair = 1954,
	NestingAtriumBlessing3 = 1955,
	NestingAtriumBlessing4 = 1956,
	NestingAtriumProp3 = 1957,
	NestingAtriumSeasonalHeart = 1958,
	NestingNookProp1 = 1959,
	NestingNookBlessing1 = 1960,
	NestingNookBlessing2 = 1961,
	NestingNookProp2 = 1962,
	NestingNookProp3 = 1963,
	NestingNookBlessing3 = 1964,
	NestingNookBlessing4 = 1965,
	NestingNookHairAccessory = 1966,
	NestingNookSeasonalHeart = 1967,

	// 15/04/2024 | Nesting Workshop week 1.
	StoneSingleBench = 1968,
	StoneWoodFiredOven = 1969,
	StoneTallCube = 1970,
	StoneSingleBed = 1971,

	// 22/04/2024 | Season of Nesting Quest 2.
	NestingGuideQuest2 = 1972,
	NestingGuideHeart2 = 1973,

	// 22/04/2024 | Nesting Workshop week 2.
	StoneChair = 1974,
	StoneSmallTable = 1975,
	DecorPillowOneColour = 1976,
	StoneTallShelf = 1977,

	// 25/04/2024 | Travelling Spirit #112.
	DancingPerformerWingBuff = 1978,

	// 27/04/2024 | Sky × Cinnamoroll Pop-Up Cafe.
	CosyTeacupHeadband = 1979,
	CosyCafeTable = 1980,
	CinnamorollPopUpCafeSwirledHair = 1981,
	CinnamorollPopUpCafeCinnamarollEars = 1982,
	CinnamorollPopUpCafePlushie = 1983,
	CinnamorollPopUpCafeMiniCompanion = 1984,
	CinnamorollPopUpCafeBowtie = 1985,
	CinnamorollPopUpCafeCloudCape = 1986,

	// 29/04/2024 | Season of Nesting Quest 3.
	NestingGuideQuest3 = 1987,
	NestingGuideHeart3 = 1988,

	// 29/04/2024 | Nesting Workshop week 3.
	StoneBench = 1989,
	StoneDesk = 1990,
	DecorPillowTwoColour = 1991,
	SmallSolidRug = 1992,

	// 06/05/2024 | Nesting Workshop week 4.
	StoneArmchair = 1993,
	StoneConsoleTable = 1994,
	DecorFoldedCloth = 1995,
	SmallStripesRug = 1996,

	// 13/05/2024 | Nesting Workshop week 5.
	StoneLoveseat = 1997,
	StoneRoundDiningTable = 1998,
	StonePlantStand = 1999,
	SmallClassicRug = 2000,

	// 20/05/2024 | Nesting Workshop week 6.
	StoneSofaCorner = 2001,
	StoneSquareDiningTable = 2002,
	StoneWallSconce = 2003,
	SmallHalfCircleRug = 2004,

	// 27/05/2024 | Season of Nesting Quest 4.
	NestingGuideQuest4 = 2005,
	NestingGuideHeart4 = 2006,

	// 27/05/2024 | Days of Nature.
	OceanMask = 2007,
	OceanBlueScarf = 2008,
	NatureWaveCape = 2009,
	NatureWaveTouchedHair = 2010,

	// 27/05/2024 | Nesting Workshop week 7.
	StoneSofaSide = 2011,
	StoneLongDiningTable = 2012,
	StoneSmallBathtub = 2013,
	MediumSolidRug = 2014,

	// 27/05/2024 | Nesting Challenge Board.
	StoneFigurine = 2015,

	// 03/06/2024 | Nesting Workshop week 8.
	StoneKichenDrawers = 2016,
	StoneCoffeeTable = 2017,
	StoneCandleLight = 2018,
	MediumStripesRug = 2019,

	// 03/06/2024 | Nesting Challenge Board.
	InstrumentStand = 2020,

	// 10/06/2024 | Season of Nesting Quest 5.
	NestingGuideQuest5 = 2021,
	NestingGuideHeart5 = 2022,

	// 10/06/2024 | Nesting Workshop week 9.
	StoneWallPotRack = 2023,
	StoneClosedBox = 2024,
	StoneWashstand = 2025,
	MediumDiamondsRug = 2026,

	// 10/06/2024 | Nesting Challenge Board.
	MusicPlayer = 2027,

	// 17/06/2024 | Nesting Workshop week 10.
	StoneEmptyBox = 2028,
	StoneWallMirror = 2029,
	MediumArgyleRug = 2030,

	// 24/06/2024 | Days of Colour.
	DarkRainbowMask = 2031,
	ColourGlamCut = 2032,
	DarkRainbowLoafers = 2033,
	ColourBubbleMachine = 2034,

	// 24/06/2024 | Nesting Workshop week 11.
	StoneWallMugRack = 2035,
	StoneWallTowelRack = 2036,
	MediumCircleRug = 2037,

	// 01/07/2024 | Nesting Workshop week 12.
	StoneKitchenCabinet = 2038,
	StoneWallShelf = 2039,
	LargeSolidRug = 2040,

	// 08/07/2024 | Nesting Workshop week 13.
	StoneKitchenStove = 2041,
	StoneWideCube = 2042,
	LargeBathtub = 2043,
	LargeCircleRug = 2044,

	// 12/07/2024 17:00 | SkyFest.
	SkyFestStarJar = 2045,
	SkyFest5thAnniversaryTShirt = 2046,
	SkyFest5thAnniversaryHeadband = 2047,
	SkyFestJenovaFan = 2048,
	SkyFestOreoHeadband = 2049,
	SkyFestWireframeCape = 2050,

	// 15/07/2024 | Season of Duets.
	DuetsGuideQuest1 = 2051,
	DuetsGuideMask = 2052,
	DuetsPendant = 2053,
	DuetsGuideUltimateProp1 = 2054,
	DuetsGuideUltimateCape = 2055,
	DuetsGuideUltimateProp2 = 2056,
	ThePianistsBeginningsBlessing1 = 2057,
	ThePianistsBeginningsProp1 = 2058,
	ThePianistsBeginningsHair = 2059,
	ThePianistsBeginningsBlessing2 = 2060,
	ThePianistsBeginningsBlessing3 = 2061,
	ThePianistsBeginningsOutfit = 2062,
	ThePianistsBeginningsProp2 = 2063,
	ThePianistsBeginningsBlessing4 = 2064,
	ThePianistsBeginningsSeasonalHeart = 2065,
	TheCellistsBeginningsHair = 2066,
	TheCellistsBeginningsBlessing1 = 2067,
	TheCellistsBeginningsBlessing2 = 2068,
	TheCellistsBeginningsProp = 2069,
	TheCellistsBeginningsOutfit = 2070,
	TheCellistsBeginningsBlessing4 = 2071,
	TheCellistsBeginningsSeasonalHeart = 2072,
	TheMusiciansLegacyMusicSheet = 2073,
	TheMusiciansLegacyBlessing1 = 2074,
	TheMusiciansLegacyBlessing2 = 2075,
	TheMusiciansLegacyProp1 = 2076,
	TheMusiciansLegacyProp2 = 2077,
	TheMusiciansLegacyBlessing3 = 2078,
	TheMusiciansLegacySeasonalHeart = 2079,
	TheCellistsFlourishingProp1 = 2080,
	TheCellistsFlourishingBlessing1 = 2081,
	TheCellistsFlourishingBlessing2 = 2082,
	TheCellistsFlourishingProp2 = 2083,
	TheCellistsFlourishingCape = 2084,
	TheCellistsFlourishingBlessing3 = 2085,
	TheCellistsFlourishingBlessing4 = 2086,
	TheCellistsFlourishingOutfit = 2087,
	TheCellistsFlourishingSeasonalHeart = 2088,
	ThePianistsFlourishingBlessing1 = 2089,
	ThePianistsFlourishingProp = 2090,
	ThePianistsFlourishingShoes = 2091,
	ThePianistsFlourishingBlessing2 = 2092,
	ThePianistsFlourishingBlessing3 = 2093,
	ThePianistsFlourishingOutfit = 2094,
	ThePianistsFlourishingSeasonalHeart = 2095,

	// 29/07/2024 | Season of Duets Quest 2.
	DuetsGuideQuest2 = 2096,
	DuetsGuideHeart1 = 2097,

	// 29/07/2024 | Tournament of Triumph.
	TournamentCurls = 2098,
	TournamentTorch = 2099,
	TournamentGoldenGarland = 2100,
	TournamentTunic = 2101,

	// 01/08/2024 | Travelling Spirit #119.
	MellowMusicianWingBuff = 2102,

	// 12/08/2024 | Season of Duets Quest 3.
	DuetsGuideQuest3 = 2103,
	DuetsGuideDuetBow1 = 2104,

	// 26/08/2024 | Season of Duets Quest 4.
	DuetsGuideQuest4 = 2105,
	DuetsGuideDuetBow2 = 2106,
	CompassionateCellistSharedMemorySpell = 2107,
	CompassionateCellistFaceAccessory = 2108,
	CompassionateCellistHeart = 2109,
	CompassionateCellistProp = 2110,

	// 26/08/2024 | Days of Sunlight.
	SunlightMantaFloat = 2111,
	SunlightBeachShorts = 2112,
	SunlightHeliosHoops = 2113,
	SunlightWovenWrap = 2114,

	// 09/09/2024 | Season of Duets Quest 5.
	DuetsGuideQuest5 = 2115,
	DuetsGuideHeart2 = 2116,

	// 16/09/2024 | Days of Moonlight.
	MoonlightBlossomAccessory = 2117,
	MoonlightLanternDecoration = 2118,
	MoonlightEarrings = 2119,
	MoonlightFrock = 2120,
	MoonlightUpdo = 2121,

	// 16/09/2024 | Returning Spirits #6.
	AncientLightJellyfishWingBuff = 2122,
	AncientLightMantaWingBuff = 2123,
	AncientDarknessPlantWingBuff = 2124,
	AncientDarknessDragonWingBuff = 2125,

	// 30/09/2024 | Days of Style.
	StyleDarknessFascinator = 2126,
	StyleDazzlingDress = 2127,
	StyleDapperSuit = 2128,
	StyleDapperMonocle = 2129,
	StyleDapperNecktie = 2130,

	// 10/10/2024 | Travelling Spirit #124.
	BumblingBoatswainWingBuff = 2131,

	// 14/10/2024 | Season of Moomin.
	HattifattenerShoulderBuddy,
	PointedSnufkinHat,
	RovingSnufkinRobe,
	RovingSnufkinScarf,
	MoomintrollEars,
	MoomintrollTail,
	TheMoominStorybookQuest1,
	EmoteRead1,
	EmoteRead2,
	MoominPendant,
	TheMoominStorybookUltimateUmbrella,
	TheMoominStorybookUltimatePlush,
	TheMoominStorybookUltimateOutfit,
	ComfortOfKindnessBlessing1,
	ComfortOfKindnessProp1,
	ComfortOfKindnessHair,
	ComfortOfKindnessBlessing2,
	ComfortOfKindnessBlessing3,
	ComfortOfKindnessProp2,
	ComfortOfKindnessNeckAccessory,
	ComfortOfKindnessBlessing4,
	ComfortOfKindnessBlessing5,
	ComfortOfKindnessCape,
	ComfortOfKindnessSeasonalHeart,
	SenseOfSelfMusicSheet,
	SenseOfSelfBlessing1,
	SenseOfSelfBlessing2,
	SenseOfSelfShoes,
	SenseOfSelfNeckAccessory,
	SenseOfSelfBlessing3,
	SenseOfSelfBlessing4,
	SenseOfSelfHairAccessory,
	SenseOfSelfSeasonalHeart,

	// 21/10/2024 | Days of Mischief.
	MischiefStarSticker,
	MischiefCauldron,
	MischiefSpiderBun,
	MischiefRavenFeatheredCloak,
	MischiefWitheredBroom,
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
	Moomin = "Season of Moomin",
}

export const SEASON_NAME_VALUES = Object.values(SeasonName);

export enum SeasonId {
	Gratitude = 0,
	Lightseekers = 1,
	Belonging = 2,
	Rhythm = 3,
	Enchantment = 4,
	Sanctuary = 5,
	Prophecy = 6,
	Dreams = 7,
	Assembly = 8,
	LittlePrince = 9,
	Flight = 10,
	Abyss = 11,
	Performance = 12,
	Shattering = 13,
	AURORA = 14,
	Remembrance = 15,
	Passage = 16,
	Moments = 17,
	Revival = 18,
	NineColouredDeer = 19,
	Nesting = 20,
	Duets = 21,
	Moomin = 22,
}

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
	[SeasonName.Moomin]: SEASON_EMOJIS.Moomin,
} as const satisfies Readonly<Record<SeasonName, SeasonEmojis>>;

export const SeasonIdToSeasonalEmoji = {
	[SeasonId.Gratitude]: SEASON_EMOJIS.Gratitude,
	[SeasonId.Lightseekers]: SEASON_EMOJIS.Lightseekers,
	[SeasonId.Belonging]: SEASON_EMOJIS.Belonging,
	[SeasonId.Rhythm]: SEASON_EMOJIS.Rhythm,
	[SeasonId.Enchantment]: SEASON_EMOJIS.Enchantment,
	[SeasonId.Sanctuary]: SEASON_EMOJIS.Sanctuary,
	[SeasonId.Prophecy]: SEASON_EMOJIS.Prophecy,
	[SeasonId.Dreams]: SEASON_EMOJIS.Dreams,
	[SeasonId.Assembly]: SEASON_EMOJIS.Assembly,
	[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrince,
	[SeasonId.Flight]: SEASON_EMOJIS.Flight,
	[SeasonId.Abyss]: SEASON_EMOJIS.Abyss,
	[SeasonId.Performance]: SEASON_EMOJIS.Performance,
	[SeasonId.Shattering]: SEASON_EMOJIS.Shattering,
	[SeasonId.AURORA]: SEASON_EMOJIS.Aurora,
	[SeasonId.Remembrance]: SEASON_EMOJIS.Remembrance,
	[SeasonId.Passage]: SEASON_EMOJIS.Passage,
	[SeasonId.Moments]: SEASON_EMOJIS.Moments,
	[SeasonId.Revival]: SEASON_EMOJIS.Revival,
	[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeer,
	[SeasonId.Nesting]: SEASON_EMOJIS.Nesting,
	[SeasonId.Duets]: SEASON_EMOJIS.Duets,
	[SeasonId.Moomin]: SEASON_EMOJIS.Moomin,
} as const satisfies Readonly<Record<SeasonId, SeasonEmojis>>;

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
	[SeasonName.Moomin]: SEASON_EMOJIS.MoominCandle,
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
	[SeasonName.Moomin]: SEASON_EMOJIS.MoominHeart,
} as const satisfies Readonly<
	Record<Exclude<SeasonName, SeasonName.Gratitude | SeasonName.Lightseekers>, SeasonEmojis>
>;

export const SeasonNameToSeasonId = {
	[SeasonName.Gratitude]: SeasonId.Gratitude,
	[SeasonName.Lightseekers]: SeasonId.Lightseekers,
	[SeasonName.Belonging]: SeasonId.Belonging,
	[SeasonName.Rhythm]: SeasonId.Rhythm,
	[SeasonName.Enchantment]: SeasonId.Enchantment,
	[SeasonName.Sanctuary]: SeasonId.Sanctuary,
	[SeasonName.Prophecy]: SeasonId.Prophecy,
	[SeasonName.Dreams]: SeasonId.Dreams,
	[SeasonName.Assembly]: SeasonId.Assembly,
	[SeasonName.LittlePrince]: SeasonId.LittlePrince,
	[SeasonName.Flight]: SeasonId.Flight,
	[SeasonName.Abyss]: SeasonId.Abyss,
	[SeasonName.Performance]: SeasonId.Performance,
	[SeasonName.Shattering]: SeasonId.Shattering,
	[SeasonName.AURORA]: SeasonId.AURORA,
	[SeasonName.Remembrance]: SeasonId.Remembrance,
	[SeasonName.Passage]: SeasonId.Passage,
	[SeasonName.Moments]: SeasonId.Moments,
	[SeasonName.Revival]: SeasonId.Revival,
	[SeasonName.NineColouredDeer]: SeasonId.NineColouredDeer,
	[SeasonName.Nesting]: SeasonId.Nesting,
	[SeasonName.Duets]: SeasonId.Duets,
	[SeasonName.Moomin]: SeasonId.Moomin,
} as const satisfies Readonly<Record<SeasonName, SeasonId>>;

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
	DaysOfMischief2024 = "Days of Mischief 2024",
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
	[EventNameUnique.DaysOfMischief2024]: EventName.DaysOfMischief,
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
		name: item.name,
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
	PermanentEventStore = 6,
	NestingWorkshop = 7,
}
