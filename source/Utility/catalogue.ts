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

// TODO: Organise tier 2 capes.
// TODO: Organise new base hairs.
// TODO: Check spirit return errors.
// biome-ignore lint/style/useEnumInitializers: TODO.
export const enum Cosmetic {
	/**
	 * Unlocked by default.
	 */
	EmoteSit,
	/**
	 * Unlocked by default.
	 */
	BaseStance,
	/**
	 * Unlocked by default.
	 */
	BaseCall,
	/**
	 * Unlocked by default.
	 */
	BaseOutfit,
	/**
	 * Unlocked by default.
	 */
	BaseMask,
	/**
	 * Unlocked by default.
	 */
	BaseHair1,
	/**
	 * Unlocked by default.
	 */
	BaseCape,
	EmotePoint1,
	EmotePoint2,
	PointingCandlemakerHair,
	PointingCandlemakerBlessing1,
	PointingCandlemakerHeart,
	PointingCandlemakerWingBuff,
	EmotePoint3,
	EmotePoint4,
	PointingCandlemakerOutfit,
	PointingCandlemakerBlessing2,
	EmoteCome1,
	EmoteCome2,
	UsheringStargazerHair,
	UsheringStargazerBlessing1,
	UsheringStargazerHeart,
	UsheringStargazerWingBuff,
	EmoteCome3,
	EmoteCome4,
	UsheringStargazerOutfit,
	UsheringStargazerBlessing2,
	EmoteNoThanks1,
	EmoteNoThanks2,
	RejectingVoyagerBlessing1,
	RejectingVoyagerHair,
	RejectingVoyagerHeart,
	RejectingVoyagerWingBuff,
	EmoteNoThanks3,
	EmoteNoThanks4,
	RejectingVoyagerFaceAccessory,
	RejectingVoyagerBlessing2,
	EmoteButterfly1,
	EmoteButterfly2,
	ButterflyCharmerBlessing1,
	ButterflyCharmerCape1,
	ButterflyCharmerHeart,
	ButterflyCharmerWingBuff1,
	EmoteButterfly3,
	EmoteButterfly4,
	ButterflyCharmerOutfit,
	ButterflyCharmerBlessing2,
	ButterflyCharmerWingBuff2,
	ButterflyCharmerCape2,
	EmoteClap1,
	EmoteClap2,
	ApplaudingBellmakerBlessing1,
	ApplaudingBellmakerHair,
	ApplaudingBellmakerHeart,
	ApplaudingBellmakerWingBuff,
	EmoteClap3,
	EmoteClap4,
	ApplaudingBellmakerBlessing2,
	EmoteWave1,
	EmoteWave2,
	WavingBellmakerBlessing1,
	WavingBellmakerHair,
	WavingBellmakerHeart,
	WavingBellmakerWingBuff1,
	EmoteWave3,
	EmoteWave4,
	WavingBellmakerBlessing2,
	WavingBellmakerMask,
	WavingBellmakerWingBuff2,
	EmoteWave5,
	EmoteWave6,
	EmoteYawn1,
	EmoteYawn2,
	SlumberingShipwrightBlessing1,
	SlumberingShipwrightHair,
	SlumberingShipwrightHeart,
	SlumberingShipwrightWingBuff,
	EmoteYawn3,
	EmoteYawn4,
	SlumberingShipwrightBlessing2,
	EmoteLaugh1,
	EmoteLaugh2,
	LaughingLightCollectorBlessing1,
	LaughingLightCollectorHarp,
	LaughingLightCollectorHeart,
	LaughingLightCollectorWingBuff,
	EmoteLaugh3,
	EmoteLaugh4,
	LaughingLightCollectorHair,
	LaughingLightCollectorBlessing2,
	CallBird,
	BirdWhispererMusicSheet,
	BirdWhispererBlessing1,
	BirdWhispererHeart,
	BirdWhispererWingBuff,
	BirdWhispererBlessing2,
	BirdWhispererHair,
	EmoteWipeBrow1,
	EmoteWipeBrow2,
	ExhaustedDockWorkerBlessing1,
	ExhaustedDockWorkerHeart,
	ExhaustedDockWorkerWingBuff,
	EmoteWipeBrow3,
	EmoteWipeBrow4,
	ExhaustedDockWorkerBlessing2,
	ExhaustedDockWorkerFaceAccessory,
	EmoteTeamwork,
	CeremonialWorshipperBlessing1,
	CeremonialWorshipperHeart,
	CeremonialWorshipperWingBuff,
	CeremonialWorshipperBlessing2,
	EmoteShiver1,
	EmoteShiver2,
	ShiveringTrailblazerBlessing1,
	ShiveringTrailblazerOutfit,
	ShiveringTrailblazerHeart,
	ShiveringTrailblazerWingBuff,
	EmoteShiver3,
	EmoteShiver4,
	ShiveringTrailblazerBlessing2,
	ShiveringTrailblazerHair,
	EmoteBlush1,
	EmoteBlush2,
	BlushingProspectorBlessing1,
	BlushingProspectorHair,
	BlushingProspectorHeart,
	BlushingProspectorWingBuff,
	EmoteBlush3,
	EmoteBlush4,
	BlushingProspectorBlessing2,
	BlushingProspectorDrum,
	EmoteHideAndSeek,
	HideAndSeekPioneerHair,
	HideAndSeekPioneerBlessing1,
	HideAndSeekPioneerHeart,
	HideAndSeekPioneerWingBuff1,
	HideAndSeekPioneerBlessing2,
	HideAndSeekPioneerMask,
	HideAndSeekPioneerWingBuff2,
	HideAndSeekPioneerOutfit,
	EmoteAngry1,
	EmoteAngry2,
	PoutyPorterBlessing1,
	PoutyPorterHair,
	PoutyPorterHeart,
	PoutyPorterWingBuff1,
	EmoteAngry3,
	EmoteAngry4,
	PoutyPorterBlessing2,
	PoutyPorterCape1,
	PoutyPorterWingBuff2,
	PoutyPorterCape2,
	Shocked1,
	Shocked2,
	DismayedHunterBlessing1,
	DismayedHunterHair,
	DismayedHunterHeart,
	DismayedHunterWingBuff1,
	Shocked3,
	Shocked4,
	DismayedHunterBlessing2,
	DismayedHunterCape1,
	DismayedHunterWingBuff2,
	DismayedHunterCape2,
	EmoteApologise1,
	EmoteApologise2,
	ApologeticLumberjackBlessing1,
	ApologeticLumberjackHair,
	ApologeticLumberjackHeart,
	ApologeticLumberjackWingBuff,
	EmoteApologise3,
	EmoteApologise4,
	ApologeticLumberjackBlessing2,
	ApologeticLumberjackFaceAccessory,
	EmoteCrying1,
	EmoteCrying2,
	TearfulLightMinerBlessing1,
	TearfulLightMinerHair,
	TearfulLightMinerHeart,
	TearfulLightMinerWingBuff1,
	EmoteCrying3,
	EmoteCrying4,
	TearfulLightMinerBlessing2,
	TearfulLightMinerWingBuff2,
	EmoteCrying5,
	EmoteCrying6,
	CallWhale,
	WhaleWhispererBlessing1,
	WhaleWhispererHeart,
	WhaleWhispererWingBuff,
	WhaleWhispererBlessing2,
	WhaleWhispererMusicSheet,
	StanceConfident,
	ConfidentSightseerHair,
	ConfidentSightseerBlessing1,
	ConfidentSightseerHeart,
	ConfidentSightseerWingBuff,
	ConfidentSightseerBlessing2,
	ConfidentSightseerOutfit,
	EmoteHandstand1,
	EmoteHandstand2,
	HandstandingThrillseekerBlessing1,
	HandstandingThrillseekerHeart,
	HandstandingThrillseekerWingBuff1,
	EmoteHandstand3,
	EmoteHandstand4,
	HandstandingThrillseekerBlessing2,
	HandstandingThrillseekerCape1,
	HandstandingThrillseekerWingBuff2,
	HandstandingThrillseekerCape2,
	CallManta,
	MantaWhispererBlessing1,
	MantaWhispererHeart,
	MantaWhispererWingBuff,
	MantaWhispererBlessing2,
	MantaWhispererMusicSheet,
	EmoteBackflip1,
	EmoteBackflip2,
	BackflippingChampionBlessing1,
	BackflippingChampionHair,
	BackflippingChampionHeart,
	BackflippingChampionWingBuff,
	EmoteBackflip3,
	EmoteBackflip4,
	BackflippingChampionBlessing2,
	BackflippingChampionFaceAccessory,
	EmoteCheer1,
	EmoteCheer2,
	CheerfulSpectatorBlessing1,
	CheerfulSpectatorHair,
	CheerfulSpectatorHeart,
	CheerfulSpectatorWingBuff,
	EmoteCheer3,
	EmoteCheer4,
	CheerfulSpectatorBlessing2,
	CheerfulSpectatorPiano,
	EmoteBow1,
	EmoteBow2,
	BowingMedalistBlessing1,
	BowingMedalistHair,
	BowingMedalistHeart,
	BowingMedalistWingBuff,
	EmoteBow3,
	EmoteBow4,
	BowingMedalistBlessing2,
	BowingMedalistFaceAccessory,
	StanceProud,
	ProudVictorCape1,
	ProudVictorBlessing1,
	ProudVictorHeart,
	ProudVictorWingBuff1,
	ProudVictorBlessing2,
	ProudVictorMask,
	ProudVictorWingBuff2,
	ProudVictorCape2,
	EmoteDuck1,
	EmoteDuck2,
	FrightenedRefugeeBlessing1,
	FrightenedRefugeeHair,
	FrightenedRefugeeHeart,
	FrightenedRefugeeWingBuff,
	EmoteDuck3,
	EmoteDuck4,
	FrightenedRefugeeBlessing2,
	FrightenedRefugeeContrabass,
	EmoteFaint1,
	EmoteFaint2,
	FaintingWarriorBlessing1,
	FaintingWarriorHair,
	FaintingWarriorHeart,
	FaintingWarriorWingBuff,
	EmoteFaint3,
	EmoteFaint4,
	FaintingWarriorBlessing2,
	FaintingWarriorMask,
	StanceCourageous,
	CourageousSoldierHair,
	CourageousSoldierBlessing1,
	CourageousSoldierHeart,
	CourageousSoldierWingBuff1,
	CourageousSoldierBlessing2,
	CourageousSoldierCape1,
	CourageousSoldierWingBuff2,
	CourageousSoldierCape2,
	StanceSneaky,
	StealthySurvivorHair,
	StealthySurvivorBlessing1,
	StealthySurvivorHeart,
	StealthySurvivorWingBuff1,
	StealthySurvivorBlessing2,
	StealthySurvivorCape1,
	StealthySurvivorWingBuff2,
	StealthySurvivorCape2,
	EmoteSalute1,
	EmoteSalute2,
	SalutingCaptainBlessing1,
	SalutingCaptainHair,
	SalutingCaptainHeart,
	SalutingCaptainWingBuff,
	EmoteSalute3,
	EmoteSalute4,
	SalutingCaptainBlessing2,
	SalutingCaptainFireworksStaff,
	EmoteLookAround1,
	EmoteLookAround2,
	LookoutScoutBlessing1,
	LookoutScoutHorn,
	LookoutScoutHeart,
	LookoutScoutWingBuff,
	EmoteLookAround3,
	EmoteLookAround4,
	LookoutScoutBlessing2,
	LookoutScoutFaceAccessory,
	EmotePray1,
	EmotePray2,
	PrayingAcolyteBlessing1,
	PrayingAcolyteHair,
	PrayingAcolyteHeart,
	PrayingAcolyteWingBuff1,
	EmotePray3,
	EmotePray4,
	PrayingAcolyteBlessing2,
	PrayingAcolyteCape1,
	PrayingAcolyteWingBuff2,
	PrayingAcolyteCape2,
	EmoteTelekinesis1,
	EmoteTelekinesis2,
	LevitatingAdeptBlessing1,
	LevitatingAdeptHair,
	LevitatingAdeptHeart,
	LevitatingAdeptWingBuff,
	EmoteTelekinesis3,
	EmoteTelekinesis4,
	LevitatingAdeptBlessing2,
	LevitatingAdeptFaceAccessory,
	StancePolite,
	PoliteScholarOutfit,
	PoliteScholarBlessing1,
	PoliteScholarHeart,
	PoliteScholarWingBuff1,
	PoliteScholarBlessing2,
	PoliteScholarHair,
	CallCosmicManta,
	MemoryWhispererOutfit,
	MemoryWhispererBlessing1,
	MemoryWhispererHeart,
	MemoryWhispererWingBuff1,
	MemoryWhispererBlessing2,
	MemoryWhispererCape1,
	MemoryWhispererWingBuff2,
	MemoryWhispererCape2,
	EmoteFloat1,
	EmoteFloat2,
	MeditatingMonasticBlessing1,
	MeditatingMonasticHair,
	MeditatingMonasticHeart,
	MeditatingMonasticWingBuff,
	EmoteFloat3,
	EmoteFloat4,
	MeditatingMonasticBlessing2,
	MeditatingMonasticChair,

	ElderOfTheIsleHair,
	ElderOfThePrairieHair,
	ElderOfTheForestHair,
	ElderOfTheValleyHair1,
	ElderOfTheValleyHair2,
	ElderOfTheWastelandHair,
	ElderOfTheVaultHair,

	GratitudePendant,
	GratitudeUltimateMask,
	StanceSassy,
	SassyDrifterHair,
	SassyDrifterBlessing1,
	SassyDrifterBlessing2,
	SassyDrifterMask,
	EmoteYoga1,
	EmoteYoga2,
	StretchingGuruHair,
	StretchingGuruBlessing1,
	EmoteYoga3,
	EmoteYoga4,
	StretchingGuruBlessing2,
	StretchingGuruCape,
	EmoteKabuki1,
	EmoteKabuki2,
	ProvokingPerformerMusicSheet,
	ProvokingPerformerBlessing1,
	EmoteKabuki3,
	EmoteKabuki4,
	ProvokingPerformerHair,
	ProvokingPerformerMask,
	EmoteLeap1,
	EmoteLeap2,
	LeapingDancerSmallBell,
	LeapingDancerBlessing1,
	EmoteLeap3,
	EmoteLeap4,
	LeapingDancerBlessing2,
	LeapingDancerMask,
	EmoteAcknowledge1,
	EmoteAcknowledge2,
	SalutingProtectorMusicSheet,
	SalutingProtectorBlessing1,
	EmoteAcknowledge3,
	EmoteAcknowledge4,
	SalutingProtectorCape,
	SalutingProtectorMask,
	EmoteKungFu1,
	EmoteKungFu2,
	GreetingShamanBlessing1,
	GreetingShamanLargeBell,
	EmoteKungFu3,
	EmoteKungFu4,
	GreetingShamanBlessing2,
	GreetingShamanMask,

	LightseekerPendant,
	LightseekerUltimateProp,
	FriendActionCarry1,
	PiggybackLightseekerMask,
	PiggybackLightseekerBlessing1,
	PiggybackLightseekerBlessing2,
	FriendActionCarry2,
	PiggybackLightseekerHair,
	PiggybackLightseekerCape,
	FriendActionDoubleFive1,
	DoublefiveLightCatcherBlessing1,
	DoublefiveLightCatcherHair,
	DoublefiveLightCatcherMask,
	FriendActionDoubleFive2,
	DoublefiveLightCatcherBlessing2,
	DoublefiveLightCatcherFlute,
	StanceLaidback,
	LaidbackPioneerMask,
	LaidbackPioneerBlessing1,
	LaidbackPioneerBlessing2,
	LaidbackPioneerMusicSheet,
	LaidbackPioneerHair,
	LaidbackPioneerBlessing3,
	LaidbackPioneerBlessing4,
	LaidbackPioneerUmbrella,
	EmoteTripleAxel1,
	EmoteTripleAxel2,
	TwirlingChampionBlessing1,
	TwirlingChampionMask,
	EmoteTripleAxel3,
	EmoteTripleAxel4,
	TwirlingChampionHair,
	TwirlingChampionPanflute,
	CallCrab,
	CrabWhispererMask,
	CrabWhispererBlessing1,
	CrabWhispererBlessing2,
	CrabWhispererMusicSheet,
	CrabWhispererBlessing3,
	CrabWhispererBlessing4,
	CrabWhispererHair,
	CrabWhispererCape,
	EmoteShush1,
	EmoteShush2,
	ShushingLightScholarBlessing1,
	ShushingLightScholarMask,
	EmoteShush3,
	EmoteShush4,
	ShushingLightScholarBlessing2,
	ShushingLightScholarCape,

	FoundersPack,

	SpookyBatCape,
	HungryPumpkinHat,

	BelongingPendant,
	BelongingBonfire,
	EmoteBoogieDance1,
	EmoteBoogieDance2,
	BoogieKidBlessing1,
	BoogieKidBlessing2,
	EmoteBoogieDance3,
	EmoteBoogieDance4,
	BoogieKidMask,
	BoogieKidOutfit,
	BoogieKidSeasonalHeart,
	EmoteConfetti1,
	EmoteConfetti2,
	ConfettiCousinBlessing1,
	ConfettiCousinBlessing2,
	EmoteConfetti3,
	EmoteConfetti4,
	ConfettiCousinCape,
	ConfettiCousinHair,
	ConfettiCousinSeasonalHeart,
	FriendActionHairTousle1,
	HairtousleTeenBlessing1,
	HairtousleTeenBlessing2,
	HairtousleTeenMusicSheet,
	FriendActionHairTousle2,
	HairtousleTeenBlessing3,
	HairtousleTeenEarmuffs,
	HairtousleTeenUkulele,
	HairtousleTeenBlessing4,
	HairtousleTeenSeasonalHeart,
	EmoteSparkler1,
	EmoteSparkler2,
	SparklerParentBlessing1,
	SparklerParentMask,
	EmoteSparkler3,
	EmoteSparkler4,
	SparklerParentHair,
	SparklerParentBlessing2,
	SparklerParentSeasonalHeart,
	EmoteDontGo1,
	EmoteDontGo2,
	PleafulParentBlessing1,
	PleafulParentGuitar,
	EmoteDontGo3,
	EmoteDontGo4,
	PleafulParentMask,
	PleafulParentCape,
	PleafulParentSeasonalHeart,
	StanceWise,
	WiseGrandparentBlessing1,
	WiseGrandparentMusicSheet,
	WiseGrandparentBlessing2,
	WiseGrandparentBlessing3,
	WiseGrandparentMask,
	WiseGrandparentBlessing4,
	WiseGrandparentBlessing5,
	WiseGrandparentCape,
	WiseGrandparentSeasonalHeart,

	DaysOfFeastPack,

	RhythmPendant,
	RhythmUltimateMask,
	RhythmUltimateHair,
	EmoteWelcome1,
	EmoteWelcome2,
	TroupeGreeterMusicSheet,
	TroupeGreeterBlessing1,
	EmoteWelcome3,
	EmoteWelcome4,
	TroupeGreeterMask,
	TroupeGreeterOutfit,
	TroupeGreeterSeasonalHeart,
	EmoteSpinDance1,
	EmoteSpinDance2,
	FestivalSpinDancerBlessing1,
	FestivalSpinDancerMusicSheet,
	EmoteSpinDance3,
	EmoteSpinDance4,
	FestivalSpinDancerHair,
	FestivalSpinDancerOutfit,
	FestivalSpinDancerSeasonalHeart,
	EmoteBlowKiss1,
	EmoteBlowKiss2,
	AdmiringActorBlessing1,
	AdmiringActorMusicSheet,
	EmoteBlowKiss3,
	EmoteBlowKiss4,
	AdmiringActorOutfit,
	AdmiringActorMask,
	AdmiringActorSeasonalHeart,
	EmoteJuggle1,
	EmoteJuggle2,
	TroupeJugglerHair,
	TroupeJugglerBlessing1,
	EmoteJuggle3,
	EmoteJuggle4,
	TroupeJugglerBlessing2,
	TroupeJugglerCape,
	TroupeJugglerOutfit,
	TroupeJugglerBlessing3,
	TroupeJugglerSeasonalHeart,
	EmoteRespect1,
	EmoteRespect2,
	RespectfulPianistHair,
	RespectfulPianistBlessing1,
	EmoteRespect3,
	EmoteRespect4,
	RespectfulPianistBlessing2,
	RespectfulPianistWinterPiano,
	RespectfulPianistMask,
	RespectfulPianistBlessing3,
	RespectfulPianistSeasonalHeart,
	EmoteThinking1,
	EmoteThinking2,
	ThoughtfulDirectorBlessing1,
	ThoughtfulDirectorMask,
	EmoteThinking3,
	EmoteThinking4,
	ThoughtfulDirectorXylophone,
	ThoughtfulDirectorBlessing2,
	ThoughtfulDirectorBlessing3,
	ThoughtfulDirectorCape,
	ThoughtfulDirectorSeasonalHeart,

	// 31/01/2020 | Travelling spirit #1.
	SassyDrifterHeart,
	SassyDrifterWingBuff,

	// 12/02/2020 12:00 | Days of Love.
	DaysOfLovePack,

	// 14/02/2020 | Travelling spirit #2.
	DoublefiveLightCatcherHeart,
	DoublefiveLightCatcherWingBuff,

	// 27/02/2020 | Travelling spirit #3.
	LaidbackPioneerHeart,
	LaidbackPioneerWingBuff,

	// 12/03/2020 | Travelling spirit #4.
	ProvokingPerformerHeart,
	ProvokingPerformerWingBuff,
	ProvokingPerformerBlessing2,

	// 26/03/2020 | Travelling spirit #5.
	PleafulParentWingBuff,
	PleafulParentBlessing2,

	// 09/04/2020 | Travelling spirit #6.
	CrabWhispererHeart,
	CrabWhispererWingBuff,

	// 16/04/2020 | Travelling spirit #7.
	PiggybackLightseekerHeart,
	PiggybackLightseekerWingBuff,

	// 20/04/2020 | Season of Enchantment.
	EnchantmentGuideQuest1,
	EnchantmentGuideHeart1,
	EnchantmentPendant,
	EnchantmentUltimateFaceAccessory,
	EnchantmentTurban,
	EmoteNod1,
	EmoteNod2,
	NoddingMuralistMask,
	NoddingMuralistBlessing1,
	EmoteNod3,
	EmoteNod4,
	NoddingMuralistBlessing2,
	NoddingMuralistHair,
	NoddingMuralistSeasonalHeart,
	EmoteShrug1,
	EmoteShrug2,
	IndifferentAlchemistBlessing1,
	IndifferentAlchemistMask,
	EmoteShrug3,
	EmoteShrug4,
	IndifferentAlchemistHair,
	IndifferentAlchemistBlessing2,
	IndifferentAlchemistBlessing3,
	IndifferentAlchemistCape,
	IndifferentAlchemistSeasonalHeart,
	EmoteCrabWalk1,
	EmoteCrabWalk2,
	CrabWalkerHair,
	CrabWalkerBlessing1,
	EmoteCrabWalk3,
	EmoteCrabWalk4,
	CrabWalkerBlessing2,
	CrabWalkerCape,
	CrabWalkerSeasonalHeart,
	EmoteBoo1,
	EmoteBoo2,
	ScarecrowFarmerBlessing1,
	ScarecrowFarmerMask,
	EmoteBoo3,
	EmoteBoo4,
	ScarecrowFarmerHair,
	ScarecrowFarmerBlessing2,
	ScarecrowFarmerSeasonalHeart,
	EmoteDoze1,
	EmoteDoze2,
	SnoozingCarpenterBlessing1,
	SnoozingCarpenterHair,
	EmoteDoze3,
	EmoteDoze4,
	SnoozingCarpenterCape,
	SnoozingCarpenterBlessing2,
	SnoozingCarpenterSeasonalHeart,
	FriendActionPlayFight1,
	PlayfightingHerbalistBlessing1,
	PlayfightingHerbalistMask,
	PlayfightingHerbalistBlessing2,
	PlayfightingHerbalistBlessing3,
	FriendActionPlayFight2,
	PlayfightingHerbalistMusicSheet,
	PlayfightingHerbalistHair,
	PlayfightingHerbalistCape,
	PlayfightingHerbalistBlessing4,
	PlayfightingHerbalistSeasonalHeart,

	// 20/04/2020 | Days of Nature.
	EarthCape,

	// 27/04/2020 | Season of Enchantment Quest 2.
	EnchantmentGuideQuest2,
	EnchantmentGuideHeart2,

	// 30/04/2020 | Travelling spirit #8.
	StretchingGuruHeart,
	StretchingGuruWingBuff,

	// 04/05/2020 | Season of Enchantment Quest 3.
	EnchantmentGuideQuest3,
	EnchantmentGuideHeart3,

	// 11/05/2020 | Season of Enchantment Quest 4.
	EnchantmentGuideQuest4,
	EnchantmentGuideHeart4,

	// 14/05/2020 | Travelling spirit #9.
	SparklerParentWingBuff,

	// 18/05/2020 | Season of Enchantment Quest 5.
	EnchantmentGuideQuest5,
	EnchantmentGuideHeart5,

	// 18/05/2020 12:00 | Days of Healing.
	HealingPack,

	// 11/06/2020 | Season of Enchantment Quest 6.
	EnchantmentGuideQuest6,
	EnchantmentGuideHeart6,
	EnchantmentGuideHug,

	// 11/06/2020 | Travelling spirit #11.
	HairtousleTeenWingBuff,

	// 25/06/2020 | Travelling spirit #12.
	LeapingDancingHeart,
	LeapingDancingWingBuff,

	// 09/07/2020 | Travelling spirit #13.
	ConfettiCousinWingBuff,

	// 13/07/2020 | Season of Sanctuary.
	SanctuaryGuideQuest1,
	SanctuaryGuideHeart1,
	SanctuaryPendant,
	SanctuaryHandpan,
	SanctuaryGuideMantaCape,
	CallJellyfish,
	JellyWhispererMusicSheet,
	JellyWhispererBlessing1,
	JellyWhispererHair,
	JellyWhispererBlessing2,
	JellyWhispererBlessing3,
	JellyWhispererOutfit,
	JellyWhispererSeasonalHeart,
	StanceTimid,
	TimidBookwormBlessing1,
	TimidBookwormMusicSheet,
	TimidBookwormHair,
	TimidBookwormBlessing2,
	TimidBookwormBlessing3,
	TimidBookwormCape,
	TimidBookwormSeasonalHeart,
	EmoteRallyCheer1,
	EmoteRallyCheer2,
	RallyingThrillseekerHair,
	RallyingThrillseekerBlessing1,
	EmoteRallyCheer3,
	EmoteRallyCheer4,
	RallyingThrillseekerOutfit,
	RallyingThrillseekerBlessing2,
	RallyingThrillseekerSeasonalHeart,
	EmoteGrumpy1,
	EmoteGrumpy2,
	HikingGrouchBlessing1,
	HikingGrouchMask,
	EmoteGrumpy3,
	EmoteGrumpy4,
	HikingGrouchHair,
	HikingGrouchBlessing2,
	HikingGrouchBlessing3,
	HikingGrouchBowTie,
	HikingGrouchSeasonalHeart,
	EmoteGrateful1,
	EmoteGrateful2,
	GratefulShellCollectorBlessing1,
	GratefulShellCollectorHair,
	EmoteGrateful3,
	EmoteGrateful4,
	GratefulShellCollectorCape,
	GratefulShellCollectorBlessing2,
	GratefulShellCollectorSeasonalHeart,
	EmoteBellyScratch1,
	EmoteBellyScratch2,
	ChillSunbatherBlessing1,
	ChillSunbatherFaceAccessory,
	EmoteBellyScratch3,
	EmoteBellyScratch4,
	ChillSunbatherHairAccessory,
	ChillSunbatherBlessing2,
	ChillSunbatherCape,
	ChillSunbatherBlessing3,
	ChillSunbatherSeasonalHeart,

	// 13/07/2020 | Sky Anniversary.
	SkyAnniversaryHairAccessory,

	// 20/07/2020 | Season of Sanctuary Quest 2.
	SanctuaryGuideQuest2,
	SanctuaryGuideHeart2,

	// 23/07/2020 | Travelling spirit #14.
	GreetingShamanHeart,
	GreetingShamanWingBuff,

	// 27/07/2020 | Season of Sanctuary Quest 3.
	SanctuaryGuideQuest3,
	SanctuaryGuideHeart3,

	// 04/08/2020 | Season of Sanctuary Quest 4.
	SanctuaryGuideQuest4,
	SanctuaryGuideHeart4,

	// 06/08/2020 | Travelling spirit #15.
	WiseGrandparentWingBuff,

	// 10/08/2020 | Season of Sanctuary Quest 5.
	SanctuaryGuideQuest5,
	SanctuaryGuideHeart5,

	// 20/08/2020 | Travelling spirit #16.
	ShushingLightScholarHeart,
	ShushingLightScholarWingBuff,

	// 03/09/2020 | Travelling spirit #17.
	FestivalSpinDancerWingBuff,
	FestivalSpinDancerBlessing2,

	// 08/09/2020 | Season of Sanctuary Quest 6.
	SanctuaryGuideQuest6,
	SanctuaryGuideHeart6,
	SanctuaryGuideFriendActionHug,

	// 08/09/2020 | Days of Summer Lights.
	DaysOfSummerLightsLantern,

	// 17/09/2020 | Travelling spirit #18.
	TwirlingChampionHeart,
	TwirlingChampionWingBuff,
	TwirlingChampionBlessing2,

	// 05/10/2020 | Season of Prophecy.
	ProphecyGuideQuest1,
	ProphecyGuideHeart1,
	ProphecyPendant,
	ProphecyGuideDunun,
	ProphecyGuideAnubisMask,
	ProphecyGuideQuest2,
	ProphecyGuideHeart2,
	ProphecyGuideQuest3,
	ProphecyGuideHeart3,
	ProphecyGuideQuest4,
	ProphecyGuideHeart4,
	ProphecyGuideFriendActionHug,
	EmoteDeepBreath1,
	EmoteDeepBreath2,
	ProphetOfWaterBlessing1,
	ProphetOfWaterHair,
	EmoteDeepBreath3,
	EmoteDeepBreath4,
	ProphetOfWaterBlessing2,
	ProphetOfWaterCape,
	ProphetOfWaterMask,
	ProphetOfWaterBlessing3,
	ProphetOfWaterSeasonalHeart,
	EmoteDustOff1,
	EmoteDustOff2,
	ProphetOfEarthHair,
	ProphetOfEarthBlessing1,
	EmoteDustOff3,
	EmoteDustOff4,
	ProphetOfEarthMusicSheet,
	ProphetOfEarthBlessing2,
	ProphetOfEarthCape,
	ProphetOfEarthMask,
	ProphetOfEarthSeasonalHeart,
	EmoteBalance1,
	EmoteBalance2,
	ProphetOfAirHair,
	ProphetOfAirBlessing1,
	EmoteBalance3,
	EmoteBalance4,
	ProphetOfAirBlessing2,
	ProphetOfAirMask,
	ProphetOfAirCape,
	ProphetOfAirBlessing3,
	ProphetOfAirSeasonalHeart,
	EmoteChestPound1,
	EmoteChestPound2,
	ProphetOfFireBlessing1,
	ProphetOfFireHair,
	EmoteChestPound3,
	EmoteChestPound4,
	ProphetOfFireBlessing2,
	ProphetOfFireMusicSheet,
	ProphetOfFireMask,
	ProphetOfFireOutfit,
	ProphetOfFireSeasonalHeart,

	// 15/10/2020 | Travelling spirit #20.
	AdmiringActorWingBuff,
	AdmiringActorBlessing2,

	// 22/10/2020 | Days of Mischief.
	MischiefWebCape,
	MischiefWitchHat,

	// 29/10/2020 | Travelling Spirit #21.
	IndifferentAlchemistWingBuff,

	// 12/11/2020 | Travelling Spirit #22.
	BoogieKidWingBuff,

	// 21/12/2020 | Days of Feast.
	FeastNeckTie,
	DaysOfFeastCape,
	DaysOfFeastTable,
	DaysOfFeastHorns,
	SnowflakeCape,

	// 24/12/2020 | Travelling Spirit #25.
	TroupeGreeterWingBuff,
	TroupeGreeterBlessing2,

	// 04/01/2021 | Season of Dreams.
	DreamsPendant,
	DreamsGuideQuest1,
	DreamsGuideHeart1,
	DreamsGuidePhoenixMask,
	DreamsGuideUltimateCape,
	DreamsGuideQuest2,
	DreamsGuideHeart2,
	DreamsGuideQuest3,
	DreamsGuideHeart3,
	DreamsGuideQuest4,
	DreamsGuideHeart4,
	DreamsGuideQuest5,
	DreamsGuideHeart5,
	DreamsGuideFriendActionHug,
	EmoteSpinTrick1,
	EmoteSpinTrick2,
	SpinningMentorHair,
	SpinningMentorBlessing1,
	EmoteSpinTrick3,
	EmoteSpinTrick4,
	SpinningMentorMask,
	SpinningMentorBlessing2,
	SpinningMentorBlessing3,
	SpinningMentorCape,
	SpinningMentorSeasonalHeart,
	EmoteShowDance1,
	EmoteShowDance2,
	DancingPerformerBlessing1,
	DancingPerformerHair,
	EmoteShowDance3,
	EmoteShowDance4,
	DancingPerformerBlessing2,
	DancingPerformerMask,
	DancingPerformerCape,
	DancingPerformerLute,
	DancingPerformerSeasonalHeart,
	EmotePeek1,
	EmotePeek2,
	PeekingPostmanMusicSheet,
	PeekingPostmanBlessing1,
	EmotePeek3,
	EmotePeek4,
	PeekingPostmanOutfit,
	PeekingPostmanBlessing2,
	PeekingPostmanCape,
	PeekingPostmanRabbitMask,
	PeekingPostmanSeasonalHeart,
	FriendActionBearhug1,
	BearhugHermitBlessing1,
	BearhugHermitRedHorns,
	BearhugHermitBlessing2,
	BearhugHermitMusicSheet,
	BearhugHermitBlessing3,
	FriendActionBearhug2,
	BearhugHermitHair,
	BearhugHermitOutfit,
	BearhugHermitSeasonalHeart,

	// 07/01/2021 | Travelling Spirit #26.
	NoddingMuralistWingBuff,

	// 28/02/2021 | Travelling Spirit #28.
	RespectfulPianistWingBuff,

	// 04/02/2021 | Travelling Spirit Error.
	CrabWalkerWingBuff,

	// 08/02/2021 12:00 | Days of Fortune.
	DaysOfFortuneMask,
	DaysOfFortuneHeaddress,
	DaysOfFortuneOrange,
	DaysOfFortuneCape,
	FortuneBlushingMask,
	FortuneBunHair,
	DaysOfFortuneWoolHat, // 21/02/2021 12:00.

	// 12/02/2021 12:00 | Days of Love.
	DaysOfLoveMask,
	DaysOfLoveSeesaw, // 12/02/2021 12:00.

	// 22/03/2021 | Days of Bloom.
	BloomHair,
	BloomCape,
	PinkBloomTeaset,

	// 05/04/2021 | Season of Assembly.
	AssemblyGuideQuest1,
	AssemblyGuideHeart1,
	AssemblyGuidePendant,
	AssemblyGuideUltimateMask,
	AssemblyGuideUltimateHair,
	AssemblyGuideBugle,
	AssemblyGuideUltimateCape,
	AssemblyGuideHighFive,
	AssemblyGuideQuest2,
	AssemblyGuidePillow,
	AssemblyGuideQuest3,
	AssemblyGuideHeart2,
	AssemblyGuideFriendActionHug,
	AssemblyGuideQuest4,
	AssemblyGuideJar,
	AssemblyGuideQuest5,
	AssemblyGuideBrazier,
	AssemblyGuideDoubleFive,
	AssemblyGuideQuest6,
	AssemblyGuideHeart3,
	AssemblyGuideBookcase,
	AssemblyGuideTarpaulin,
	EmoteFacepalm1,
	EmoteFacepalm2,
	BaffledBotanistBlessing1,
	BaffledBotanistHair,
	EmoteFacepalm3,
	EmoteFacepalm4,
	BaffledBotanistMask,
	BaffledBotanistBlessing2,
	BaffledBotanistBlessing3,
	BaffledBotanistProp,
	BaffledBotanistSeasonalHeart,
	EmoteScold1,
	EmoteScold2,
	ScoldingStudentMask,
	ScoldingStudentBlessing1,
	EmoteScold3,
	EmoteScold4,
	ScoldingStudentHair,
	ScoldingStudentBlessing2,
	ScoldingStudentBlessing3,
	ScoldingStudentCape,
	ScoldingStudentSeasonalHeart,
	EmoteEww1,
	EmoteEww2,
	ScaredyCadetMask,
	ScaredyCadetBlessing1,
	EmoteEww3,
	EmoteEww4,
	ScaredyCadetMusicSheet,
	ScaredyCadetHair,
	ScaredyCadetHammock,
	ScaredyCadetBlessing2,
	ScaredyCadetSeasonalHeart,
	EmoteMarching1,
	EmoteMarching2,
	MarchingAdventurerHair,
	MarchingAdventurerBlessing1,
	EmoteMarching3,
	EmoteMarching4,
	MarchingAdventurerBlessing2,
	MarchingAdventurerMask,
	MarchingAdventurerTikiTorch,
	MarchingAdventurerBlessing3,
	MarchingAdventurerSeasonalHeart,
	EmoteChuckle1,
	EmoteChuckle2,
	ChucklingScoutMask,
	ChucklingScoutBlessing1,
	EmoteChuckle3,
	EmoteChuckle4,
	ChucklingScoutBlessing2,
	ChucklingScoutOutfit,
	ChucklingScoutProp,
	ChucklingScoutBlessing3,
	ChucklingScoutSeasonalHeart,
	EmoteBubbles1,
	EmoteBubbles2,
	DaydreamForesterMask,
	DaydreamForesterBlessing1,
	EmoteBubbles3,
	EmoteBubbles4,
	DaydreamForesterMusicSheet,
	DaydreamForesterBlessing2,
	DaydreamForesterBlessing3,
	DaydreamForesterHair,
	DaydreamForesterSeasonalHeart,

	// 19/04/2021 | Days of Nature.
	OceanNecklace,
	OceanCape,

	// 29/04/2021 | Travelling Spirit #34.
	RallyingThrillseekerWingBuff,

	// 13/05/2021 | Travelling Spirit #35.
	ThoughtfulDirectorWingBuff,

	// 27/05/2021 | Travelling Spirit #36.
	SnoozingCarpenterWingBuff,

	// 10/06/2021 | Travelling Spirit #37.
	TimidBookwormWingBuff,

	// 14/06/2021 | Days of Rainbow.
	RainbowBraid,
	RainbowCape,
	RainbowHat,
	RainbowFlower,

	// TODO SECTION
	CrabWhispererPipe, // 02/09/2021
	PlayfightingHerbalistOrb, // 28/10/2021
	AssemblyGuideSharedSpaceSpell, // Move this to Season of Remembrance.

	/**
	 * Unlocked by default.
	 */
	BaseHair2,
	/**
	 * Unlocked by default.
	 */
	BaseHair3,
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
