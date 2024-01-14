import { URL } from "node:url";
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Mixin } from "ts-mixer";
import { type Realm, CDN_URL, WIKI_URL } from "../../Utility/Constants.js";
import { todayDate } from "../../Utility/dates.js";
import {
	type CallsEmojis,
	type EmojiData,
	type EmotesEmojis,
	type FriendActionsEmojis,
	type StancesEmojis,
	CALL_EMOJIS,
	EMOTE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	resolveCurrencyEmoji,
	STANCE_EMOJIS,
} from "../../Utility/emojis.js";
import { SeasonName, SeasonNameToSeasonalCandleEmoji, SeasonNameToSeasonalHeartEmoji } from "../Season.js";

export enum SpiritName {
	// Isles of Dawn
	PointingCandlemaker = "Pointing Candlemaker",
	UsheringStargazer = "Ushering Stargazer",
	RejectingVoyager = "Rejecting Voyager",
	ElderOfTheIsle = "Elder of the Isle",

	// Daylight Prairie
	ButterflyCharmer = "Butterfly Charmer",
	ApplaudingBellmaker = "Applauding Bellmaker",
	WavingBellmaker = "Waving Bellmaker",
	SlumberingShipwright = "Slumbering Shipwright",
	LaughingLightCatcher = "Laughing Light Catcher",
	BirdWhisperer = "Bird Whisperer",
	ExhaustedDockWorker = "Exhausted Dock Worker",
	CeremonialWorshiper = "Ceremonial Worshiper",
	ElderOfThePrairie = "Elder of the Prairie",

	// Hidden Forest
	ShiveringTrailblazer = "Shivering Trailblazer",
	BlushingProspector = "Blushing Prospector",
	HideNSeekPioneer = "Hide'n'Seek Pioneer",
	PoutyPorter = "Pouty Porter",
	DismayedHunter = "Dismayed Hunter",
	ApologeticLumberjack = "Apologetic Lumberjack",
	TearfulLightMiner = "Tearful Light Miner",
	WhaleWhisperer = "Whale Whisperer",
	ElderOfTheForest = "Elder of the Forest",

	// Valley of Triumph
	ConfidentSightseer = "Confident Sightseer",
	HandstandingThrillseeker = "Handstanding Thrillseeker",
	MantaWhisperer = "Manta Whisperer",
	BackflippingChampion = "Backflipping Champion",
	CheerfulSpectator = "Cheerful Spectator",
	BowingMedalist = "Bowing Medalist",
	ProudVictor = "Proud Victor",
	ElderOfTheValley = "Elder of the Valley",

	// Golden Wasteland
	FrightenedRefugee = "Frightened Refugee",
	FaintingWarrior = "Fainting Warrior",
	CourageousSoldier = "Courageous Soldier",
	StealthySurvivor = "Stealthy Survivor",
	SalutingCaptain = "Saluting Captain",
	LookoutScout = "Lookout Scout",
	ElderOfTheWasteland = "Elder of the Wasteland",

	// Vault of Knowledge
	PrayingAcolyte = "Praying Acolyte",
	LevitatingAdept = "Levitating Adept",
	PoliteScholar = "Polite Scholar",
	MemoryWhisperer = "Memory Whisperer",
	MeditatingMonastic = "Meditating Monastic",
	ElderOfTheVault = "Elder of the Vault",

	// Season of Gratitude
	GratitudeGuide = "Gratitude Guide",
	SassyDrifter = "Sassy Drifter",
	StretchingGuru = "Stretching Guru",
	ProvokingPerformer = "Provoking Performer",
	LeapingDancer = "Leaping Dancer",
	SalutingProtector = "Saluting Protector",
	GreetingShaman = "Greeting Shaman",

	// Season of Lightseekers
	LightseekersGuide = "Lightseekers Guide",
	PiggybackLightseeker = "Piggyback Lightseeker",
	DoublefiveLightCatcher = "Doublefive Light Catcher",
	LaidbackPioneer = "Laidback Pioneer",
	TwirlingChampion = "Twirling Champion",
	CrabWhisperer = "Crab Whisperer",
	ShushingLightScholar = "Shushing Light Scholar",

	// Season of Belonging
	BelongingGuide = "Belonging Guide",
	BoogieKid = "Boogie Kid",
	ConfettiCousin = "Confetti Cousin",
	HairtousleTeen = "Hairtousle Teen",
	SparklerParent = "Sparkler Parent",
	PleafulParent = "Pleaful Parent",
	WiseGrandparent = "Wise Grandparent",

	// Season of Rhythm
	RhythmGuide = "Rhythm Guide",
	TroupeGreeter = "Troupe Greeter",
	FestivalSpinDancer = "Festival Spin Dancer",
	AdmiringActor = "Admiring Actor",
	TroupeJuggler = "Troupe Juggler",
	RespectfulPianist = "Respectful Pianist",
	ThoughtfulDirector = "Thoughtful Director",

	// Season of Enchantment
	EnchantmentGuide = "Enchantment Guide",
	NoddingMuralist = "Nodding Muralist",
	IndifferentAlchemist = "Indifferent Alchemist",
	CrabWalker = "Crab Walker",
	ScarecrowFarmer = "Scarecrow Farmer",
	SnoozingCarpenter = "Snoozing Carpenter",
	PlayfightingHerbalist = "Playfighting Herbalist",

	// Season of Sanctuary
	SanctuaryGuide = "Sanctuary Guide",
	JellyWhisperer = "Jelly Whisperer",
	TimidBookworm = "Timid Bookworm",
	RallyingThrillseeker = "Rallying Thrillseeker",
	HikingGrouch = "Hiking Grouch",
	GratefulShellCollector = "Grateful Shell Collector",
	ChillSunbather = "Chill Sunbather",

	// Season of Prophecy
	ProphecyGuide = "Prophecy Guide",
	ProphetOfWater = "Prophet of Water",
	ProphetOfEarth = "Prophet of Earth",
	ProphetOfAir = "Prophet of Air",
	ProphetOfFire = "Prophet of Fire",

	// Season of Dreams
	DreamsGuide = "Dreams Guide",
	SpinningMentor = "Spinning Mentor",
	DancingPerformer = "Dancing Performer",
	PeekingPostman = "Peeking Postman",
	BearhugHermit = "Bearhug Hermit",

	// Season of Assembly
	AssemblyGuide = "Assembly Guide",
	BaffledBotanist = "Baffled Botanist",
	ScoldingStudent = "Scolding Student",
	ScaredyCadet = "Scaredy Cadet",
	MarchingAdventurer = "Marching Adventurer",
	ChucklingScout = "Chuckling Scout",
	DaydreamForester = "Daydream Forester",

	// Season of Little Prince
	TheRose = "The Rose",
	BeckoningRuler = "Beckoning Ruler",
	GloatingNarcissist = "Gloating Narcissist",
	StretchingLamplighter = "Stretching Lamplighter",
	SlouchingSoldier = "Slouching Soldier",
	SneezingGeographer = "Sneezing Geographer",
	StarCollector = "Star Collector",

	// Season of Flight
	FlightGuide = "Flight Guide",
	LivelyNavigator = "Lively Navigator",
	LightWhisperer = "Light Whisperer",
	TinkeringChimesmith = "Tinkering Chimesmith",
	TalentedBuilder = "Talented Builder",

	// Season of Abyss
	AbyssGuide = "Abyss Guide",
	AnxiousAngler = "Anxious Angler",
	CeasingCommodore = "Ceasing Commodore",
	BumblingBoatswain = "Bumbling Boatswain",
	CacklingCannoneer = "Cackling Cannoneer",

	// Season of Performance
	PerformanceGuide = "Performance Guide",
	FranticStagehand = "Frantic Stagehand",
	ForgetfulStoryteller = "Forgetful Storyteller",
	MellowMusician = "Mellow Musician",
	ModestDancer = "Modest Dancer",

	// Season of Shattering
	TheVoidOfShattering = "The Void of Shattering",
	AncientLight1 = "Ancient Light (Jellyfish)",
	AncientLight2 = "Ancient Light (Manta)",
	AncientDarkness1 = "Ancient Darkness (Plant)",
	AncientDarkness2 = "Ancient Darkness (Dragon)",

	// Season of AURORA
	AURORAGuide = "AURORA Guide",
	RunningWayfarer = "Running Wayfarer",
	MindfulMiner = "Mindful Miner",
	WarriorOfLove = "Warrior of Love",
	SeedOfHope = "Seed of Hope",

	// Season of Remembrance
	RemembranceGuide = "Remembrance Guide",
	BereftVeteran = "Bereft Veteran",
	PleadingChild = "Pleading Child",
	TiptoeingTeaBrewer = "Tiptoeing Tea-Brewer",
	WoundedWarrior = "Wounded Warrior",

	// Season of Passage
	PassageGuide = "Passage Guide",
	OddballOutcast = "Oddball Outcast",
	TumblingTroublemaker = "Tumbling Troublemaker",
	MelancholyMope = "Melancholy Mope",
	OveractiveOverachiever = "Overactive Overachiever",

	// Season of Moments
	MomentsGuide = "Moments Guide",
	ReassuringRanger = "Reassuring Ranger",
	NightbirdWhisperer = "Nightbird Whisperer",
	JollyGeologist = "Jolly Geologist",
	AsceticMonk = "Ascetic Monk",

	// Season of Revival
	HopefulSteward = "Hopeful Steward",
	VestigeOfADesertedOasis = "Vestige of a Deserted Oasis",
	MemoryOfALostVillage = "Memory of a Lost Village",
	EchoOfAnAbandonedRefuge = "Echo of an Abandoned Refuge",
	RemnantOfAForgottenHaven = "Remnant of a Forgotten Haven",

	// Season of the Nine-Colored Deer
	SpiritOfMural = "Spirit of Mural",
	HerbGatherer = "Herb Gatherer",
	Hunter = "Hunter",
	FeudalLord = "Feudal Lord",
}

export const enum Emote {
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
}

export const enum Stance {
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

export const enum Call {
	Base = "Base",
	Bird = "Bird",
	Whale = "Whale",
	Manta = "Manta",
	CosmicManta = "Cosmic manta",
	Crab = "Crab",
	Jellyfish = "Jellyfish",
	BabyManta = "Baby manta",
	Nightbird = "Nightbird",

	// From the Kizuna-AI pin.
	KizunaAI = "Kizuna-AI",

	// From the PlayStation starter pack.
	Journey = "Journey",
}

export const enum FriendAction {
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
}

export const EmoteToEmoji = {
	[Emote.Sit]: EMOTE_EMOJIS.Sit,
	[Emote.Point]: EMOTE_EMOJIS.Point,
	[Emote.Come]: EMOTE_EMOJIS.Come,
	[Emote.NoThanks]: EMOTE_EMOJIS.NoThanks,
	[Emote.Welcome]: EMOTE_EMOJIS.Welcome,
	[Emote.Nod]: EMOTE_EMOJIS.Nod,
	[Emote.Scold]: EMOTE_EMOJIS.Scold,
	[Emote.Butterfly]: EMOTE_EMOJIS.Butterfly,
	[Emote.Clap]: EMOTE_EMOJIS.Clap,
	[Emote.Wave]: EMOTE_EMOJIS.Wave,
	[Emote.Laugh]: EMOTE_EMOJIS.Laugh,
	[Emote.Yawn]: EMOTE_EMOJIS.Yawn,
	[Emote.WipeBrow]: EMOTE_EMOJIS.WipeBrow,
	[Emote.Teamwork]: EMOTE_EMOJIS.Teamwork,
	[Emote.BlowKiss]: EMOTE_EMOJIS.BlowKiss,
	[Emote.Grateful]: EMOTE_EMOJIS.Grateful,
	[Emote.BellyScratch]: EMOTE_EMOJIS.BellyScratch,
	[Emote.Chuckle]: EMOTE_EMOJIS.Chuckle,
	[Emote.Shiver]: EMOTE_EMOJIS.Shiver,
	[Emote.HideAndSeek]: EMOTE_EMOJIS.HideAndSeek,
	[Emote.Angry]: EMOTE_EMOJIS.Angry,
	[Emote.Shy]: EMOTE_EMOJIS.Shy,
	[Emote.Shocked]: EMOTE_EMOJIS.Shocked,
	[Emote.Apologise]: EMOTE_EMOJIS.Apologise,
	[Emote.Crying]: EMOTE_EMOJIS.Crying,
	[Emote.Kabuki]: EMOTE_EMOJIS.Kabuki,
	[Emote.Shrug]: EMOTE_EMOJIS.Shrug,
	[Emote.Grumpy]: EMOTE_EMOJIS.Grumpy,
	[Emote.Peek]: EMOTE_EMOJIS.Peek,
	[Emote.Eww]: EMOTE_EMOJIS.Eww,
	[Emote.Facepalm]: EMOTE_EMOJIS.Facepalm,
	[Emote.Handstand]: EMOTE_EMOJIS.Handstand,
	[Emote.Backflip]: EMOTE_EMOJIS.Backflip,
	[Emote.Bow]: EMOTE_EMOJIS.Bow,
	[Emote.Cheer]: EMOTE_EMOJIS.Cheer,
	[Emote.Leap]: EMOTE_EMOJIS.Leap,
	[Emote.TripleAxel]: EMOTE_EMOJIS.TripleAxel,
	[Emote.Confetti]: EMOTE_EMOJIS.Confetti,
	[Emote.BoogieDance]: EMOTE_EMOJIS.BoogieDance,
	[Emote.SpinDance]: EMOTE_EMOJIS.SpinDance,
	[Emote.Juggle]: EMOTE_EMOJIS.Juggle,
	[Emote.CrabWalk]: EMOTE_EMOJIS.CrabWalk,
	[Emote.RallyCheer]: EMOTE_EMOJIS.RallyCheer,
	[Emote.SpinTrick]: EMOTE_EMOJIS.SpinTrick,
	[Emote.ShowDance]: EMOTE_EMOJIS.ShowDance,
	[Emote.Duck]: EMOTE_EMOJIS.Duck,
	[Emote.Faint]: EMOTE_EMOJIS.Faint,
	[Emote.Respect]: EMOTE_EMOJIS.Respect,
	[Emote.LookAround]: EMOTE_EMOJIS.LookAround,
	[Emote.Salute]: EMOTE_EMOJIS.Salute,
	[Emote.Acknowledge]: EMOTE_EMOJIS.Acknowledge,
	[Emote.KungFu]: EMOTE_EMOJIS.KungFu,
	[Emote.DontGo]: EMOTE_EMOJIS.DontGo,
	[Emote.Boo]: EMOTE_EMOJIS.Boo,
	[Emote.DustOff]: EMOTE_EMOJIS.DustOff,
	[Emote.ChestPound]: EMOTE_EMOJIS.ChestPound,
	[Emote.Marching]: EMOTE_EMOJIS.Marching,
	[Emote.Telekinesis]: EMOTE_EMOJIS.Telekinesis,
	[Emote.Float]: EMOTE_EMOJIS.Float,
	[Emote.Pray]: EMOTE_EMOJIS.Pray,
	[Emote.Yoga]: EMOTE_EMOJIS.Yoga,
	[Emote.Shush]: EMOTE_EMOJIS.Shush,
	[Emote.Sparkler]: EMOTE_EMOJIS.Sparkler,
	[Emote.Thinking]: EMOTE_EMOJIS.Thinking,
	[Emote.Doze]: EMOTE_EMOJIS.Doze,
	[Emote.Balance]: EMOTE_EMOJIS.Balance,
	[Emote.DeepBreath]: EMOTE_EMOJIS.DeepBreath,
	[Emote.Bubbles]: EMOTE_EMOJIS.Bubbles,
	[Emote.Beckon]: EMOTE_EMOJIS.Beckon,
	[Emote.Gloat]: EMOTE_EMOJIS.Gloat,
	[Emote.Stretch]: EMOTE_EMOJIS.Stretch,
	[Emote.Slouch]: EMOTE_EMOJIS.Slouch,
	[Emote.Sneeze]: EMOTE_EMOJIS.Sneeze,
	[Emote.HandRub]: EMOTE_EMOJIS.HandRub,
	[Emote.Voilà]: EMOTE_EMOJIS.Voilà,
	[Emote.Navigate]: EMOTE_EMOJIS.Navigate,
	[Emote.CalmDown]: EMOTE_EMOJIS.CalmDown,
	[Emote.EvilLaugh]: EMOTE_EMOJIS.EvilLaugh,
	[Emote.Ouch]: EMOTE_EMOJIS.Ouch,
	[Emote.Anxious]: EMOTE_EMOJIS.Anxious,
	[Emote.Headbob]: EMOTE_EMOJIS.Headbob,
	[Emote.Aww]: EMOTE_EMOJIS.Aww,
	[Emote.WavingLight]: EMOTE_EMOJIS.WavingLight,
	[Emote.RaiseTheRoof]: EMOTE_EMOJIS.RaiseTheRoof,
	[Emote.Twirl]: EMOTE_EMOJIS.Twirl,
	[Emote.RhythmicClap]: EMOTE_EMOJIS.RhythmicClap,
	[Emote.Conduct]: EMOTE_EMOJIS.Conduct,
	[Emote.SilentClap]: EMOTE_EMOJIS.SilentClap,
	[Emote.Skipping]: EMOTE_EMOJIS.Skipping,
	[Emote.Pleading]: EMOTE_EMOJIS.Pleading,
	[Emote.Tiptoeing]: EMOTE_EMOJIS.Tiptoeing,
	[Emote.Grieving]: EMOTE_EMOJIS.Grieving,
	[Emote.HackySack]: EMOTE_EMOJIS.HackySack,
	[Emote.Somersault]: EMOTE_EMOJIS.Somersault,
	[Emote.Moping]: EMOTE_EMOJIS.Moping,
	[Emote.PullUp]: EMOTE_EMOJIS.PullUp,
	[Emote.JollyDance]: EMOTE_EMOJIS.JollyDance,
	[Emote.BlindfoldBalancePose]: EMOTE_EMOJIS.BlindfoldBalancePose,
	[Emote.CureForMeDance]: EMOTE_EMOJIS.CureForMeDance,
	[Emote.Whistle]: EMOTE_EMOJIS.Whistle,
	[Emote.Flex]: EMOTE_EMOJIS.Flex,
} as const satisfies Readonly<Record<Emote, EmotesEmojis>>;

export const StanceToEmoji = {
	[Stance.Base]: STANCE_EMOJIS.Base,
	[Stance.Courageous]: STANCE_EMOJIS.Courageous,
	[Stance.Confident]: STANCE_EMOJIS.Confident,
	[Stance.Sneaky]: STANCE_EMOJIS.Sneaky,
	[Stance.Proud]: STANCE_EMOJIS.Proud,
	[Stance.Polite]: STANCE_EMOJIS.Polite,
	[Stance.Sassy]: STANCE_EMOJIS.Sassy,
	[Stance.Laidback]: STANCE_EMOJIS.Laidback,
	[Stance.Wise]: STANCE_EMOJIS.Wise,
	[Stance.Timid]: STANCE_EMOJIS.Timid,
	[Stance.Tinker]: STANCE_EMOJIS.Tinker,
	[Stance.Injured]: STANCE_EMOJIS.Injured,
} as const satisfies Readonly<Record<Stance, StancesEmojis>>;

export const CallToEmoji = {
	[Call.Base]: CALL_EMOJIS.Base,
	[Call.Bird]: CALL_EMOJIS.Bird,
	[Call.Whale]: CALL_EMOJIS.Whale,
	[Call.Manta]: CALL_EMOJIS.Manta,
	[Call.CosmicManta]: CALL_EMOJIS.CosmicManta,
	[Call.Crab]: CALL_EMOJIS.Crab,
	[Call.Jellyfish]: CALL_EMOJIS.Jellyfish,
	[Call.BabyManta]: CALL_EMOJIS.BabyManta,
	[Call.Nightbird]: CALL_EMOJIS.Nightbird,
} as const satisfies Readonly<Record<Exclude<Call, Call.KizunaAI | Call.Journey>, CallsEmojis>>;

export const FriendActionToEmoji = {
	[FriendAction.HoldHand]: FRIEND_ACTION_EMOJIS.HoldHand,
	[FriendAction.HighFive]: FRIEND_ACTION_EMOJIS.HighFive,
	[FriendAction.Hug]: FRIEND_ACTION_EMOJIS.Hug,
	[FriendAction.FistBump]: FRIEND_ACTION_EMOJIS.FistBump,
	[FriendAction.DoubleFive]: FRIEND_ACTION_EMOJIS.DoubleFive,
	[FriendAction.HairTousle]: FRIEND_ACTION_EMOJIS.HairTousle,
	[FriendAction.Carry]: FRIEND_ACTION_EMOJIS.Carry,
	[FriendAction.PlayFight]: FRIEND_ACTION_EMOJIS.PlayFight,
	[FriendAction.Bearhug]: FRIEND_ACTION_EMOJIS.Bearhug,
	[FriendAction.Handshake]: FRIEND_ACTION_EMOJIS.Handshake,
	[FriendAction.DuetDance]: FRIEND_ACTION_EMOJIS.DuetDance,
	[FriendAction.SideHug]: FRIEND_ACTION_EMOJIS.SideHug,
	[FriendAction.CradleCarry]: FRIEND_ACTION_EMOJIS.CradleCarry,
} as const satisfies Readonly<Record<FriendAction, FriendActionsEmojis>>;

export const SPIRIT_TYPE = {
	Standard: 0,
	Elder: 1,
	Seasonal: 2,
	Guide: 3,
} as const;

export type SpiritType = (typeof SPIRIT_TYPE)[keyof typeof SPIRIT_TYPE];

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
	emoji: EmojiData;
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
	emote?: Emote;
	stance?: Stance;
	call?: Exclude<Call, Call.KizunaAI | Call.Journey>;
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

export type SeasonalSpiritVisitCollectionKey = number | "Error";
export type SeasonalSpiritVisitData = Collection<SeasonalSpiritVisitCollectionKey, DateTime>;

export interface SeasonalSpiritVisit {
	travelling?: SeasonalSpiritVisitData;
	returning?: SeasonalSpiritVisitData;
}

interface SeasonalSpiritData extends BaseSpiritData, SeasonalFriendshipTreeData, ExpressiveSpiritData {
	season: SeasonName;
	hasMarketingVideo?: boolean;
	visits?: SeasonalSpiritVisit;
}

interface GuideSpiritData extends BaseSpiritData, GuideFriendshipTreeData {
	season: SeasonName;
}

export const NO_FRIENDSHIP_TREE_TEXT = "This spirit does not have a friendship tree." as const;
export const NO_FRIENDSHIP_TREE_YET_TEXT = "This spirit does not have a friendship tree. Maybe it should?" as const;
export const GUIDE_SPIRIT_IN_PROGRESS_TEXT = "This spirit's friendship tree has not been fully revealed." as const;

export function resolveSpiritTypeToString(spiritType: SpiritType) {
	switch (spiritType) {
		case SPIRIT_TYPE.Standard:
			return "Standard Spirits";
		case SPIRIT_TYPE.Elder:
			return "Elders";
		case SPIRIT_TYPE.Seasonal:
			return "Seasonal Spirits";
		case SPIRIT_TYPE.Guide:
			return "Guide Spirits";
	}
}

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
	public readonly emote: Emote | null;

	public readonly stance: Stance | null;

	public readonly call: Exclude<Call, Call.KizunaAI | Call.Journey> | null;

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

	public readonly visits: Required<SeasonalSpiritVisit>;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		this.season = spirit.season;

		this.marketingVideoURL = spirit.hasMarketingVideo
			? String(new URL(`spirits/${this.cdnName}/marketing_video.mp4`, CDN_URL))
			: null;

		this.visits = {
			travelling: spirit.visits?.travelling ?? new Collection<SeasonalSpiritVisitCollectionKey, DateTime>(),
			returning: spirit.visits?.returning ?? new Collection<SeasonalSpiritVisitCollectionKey, DateTime>(),
		};
	}

	public get visited() {
		const { travelling, returning } = this.visits;
		const firstTravelling = travelling.first();
		const firstReturning = returning.first();
		const today = todayDate();
		return (firstTravelling && firstTravelling <= today) || (firstReturning && firstReturning <= today);
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
