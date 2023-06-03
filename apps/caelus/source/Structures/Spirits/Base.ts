import { URL } from "node:url";
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { type Realm, type Season, CDN_URL, WIKI_URL } from "../../Utility/Constants.js";

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
	CeremonialWorshipper = "Ceremonial Worshipper",
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

	// Seasonal Spirits
	SassyDrifter = "Sassy Drifter",
	StretchingGuru = "Stretching Guru",
	ProvokingPerformer = "Provoking Performer",
	LeapingDancer = "Leaping Dancer",
	SalutingProtector = "Saluting Protector",
	GreetingShaman = "Greeting Shaman",
	PiggybackLightseeker = "Piggyback Lightseeker",
	DoublefiveLightCatcher = "Doublefive Light Catcher",
	LaidbackPioneer = "Laidback Pioneer",
	TwirlingChampion = "Twirling Champion",
	CrabWhisperer = "Crab Whisperer",
	ShushingLightScholar = "Shushing Light Scholar",
	BoogieKid = "Boogie Kid",
	ConfettiCousin = "Confetti Cousin",
	HairtousleTeen = "Hairtousle Teen",
	SparklerParent = "Sparkler Parent",
	PleafulParent = "Pleaful Parent",
	WiseGrandparent = "Wise Grandparent",
	TroupeGreeter = "Troupe Greeter",
	FestivalSpinDancer = "Festival Spin Dancer",
	AdmiringActor = "Admiring Actor",
	TroupeJuggler = "Troupe Juggler",
	RespectfulPianist = "Respectful Pianist",
	ThoughtfulDirector = "Thoughtful Director",
	NoddingMuralist = "Nodding Muralist",
	IndifferentAlchemist = "Indifferent Alchemist",
	CrabWalker = "Crab Walker",
	ScarecrowFarmer = "Scarecrow Farmer",
	SnoozingCarpenter = "Snoozing Carpenter",
	PlayfightingHerbalist = "Playfighting Herbalist",
	JellyWhisperer = "Jelly Whisperer",
	TimidBookworm = "Timid Bookworm",
	RallyingThrillseeker = "Rallying Thrillseeker",
	HikingGrouch = "Hiking Grouch",
	GratefulShellCollector = "Grateful Shell Collector",
	ChillSunbather = "Chill Sunbather",
	ProphetOfWater = "Prophet of Water",
	ProphetOfEarth = "Prophet of Earth",
	ProphetOfAir = "Prophet of Air",
	ProphetOfFire = "Prophet of Fire",
	SpinningMentor = "Spinning Mentor",
	DancingPerformer = "Dancing Performer",
	PeekingPostman = "Peeking Postman",
	BearhugHermit = "Bearhug Hermit",
	BaffledBotanist = "Baffled Botanist",
	ScoldingStudent = "Scolding Student",
	ScaredyCadet = "Scaredy Cadet",
	MarchingAdventurer = "Marching Adventurer",
	ChucklingScout = "Chuckling Scout",
	DaydreamForester = "Daydream Forester",
	BeckoningRuler = "Beckoning Ruler",
	GloatingNarcissist = "Gloating Narcissist",
	StretchingLamplighter = "Stretching Lamplighter",
	SlouchingSoldier = "Slouching Soldier",
	SneezingGeographer = "Sneezing Geographer",
	StarCollector = "Star Collector",
	LivelyNavigator = "Lively Navigator",
	LightWhisperer = "Light Whisperer",
	TinkeringChimesmith = "Tinkering Chimesmith",
	TalentedBuilder = "Talented Builder",
	AnxiousAngler = "Anxious Angler",
	CeasingCommodore = "Ceasing Commodore",
	BumblingBoatswain = "Bumbling Boatswain",
	CacklingCannoneer = "Cackling Cannoneer",
	FranticStagehand = "Frantic Stagehand",
	ForgetfulStoryteller = "Forgetful Storyteller",
	MellowMusician = "Mellow Musician",
	ModestDancer = "Modest Dancer",
	// Season of Shattering - not sure how to add this.
	RunningWayfarer = "Running Wayfarer",
	MindfulMiner = "Mindful Miner",
	WarriorOfLove = "Warrior of Love",
	SeedOfHope = "Seed of Hope",
	BereftVeteran = "Bereft Veteran",
	PleadingChild = "Pleading Child",
	TiptoeingTeaBrewer = "Tiptoeing Tea-Brewer",
	WoundedWarrior = "Wounded Warrior",
	OddballOutcast = "Oddball Outcast",
	TumblingTroublemaker = "Tumbling Troublemaker",
	MelancholyMope = "Melancholy Mope",
	OveractiveOverachiever = "Overactive Overachiever",
}

export const enum Call {
	Crab = "Crab",
	Jellyfish = "Jellyfish",
	BabyManta = "Baby manta",
}

export const enum Expression {
	// Friend expressions
	DoubleFive = "Double-Five",
	HairTousle = "Hair tousle",
	Carry = "Carry",
	PlayFight = "Play fight",
	Bearhug = "Bearhug",
	Handshake = "Handshake",
	DuetDance = "Duet dance",
	// Regular expressions
	Point = "Point",
	Welcome = "Welcome",
	Nod = "Nod",
	Scold = "Scold",
	BlowKiss = "Blow kiss",
	Grateful = "Grateful",
	BellyScratch = "Belly scratch",
	Chuckle = "Chuckle",
	Karate = "Karate",
	Shrug = "Shrug",
	Grouchy = "Grouchy",
	Peek = "Peek",
	Eww = "Eww",
	Facepalm = "Facepalm",
	Leap = "Leap",
	TripleAxel = "Triple axel",
	Confetti = "Confetti",
	Boogie = "Boogie",
	Dance = "Dance",
	Juggle = "Juggle",
	CrabWalk = "Crab walk",
	Rally = "Rally",
	SpinTrick = "Spin trick",
	ShowDance = "Show dance",
	Respect = "Respect",
	Dismiss = "Dismiss",
	Greeting = "Greeting",
	DontGo = "Don't go!",
	Scare = "Scare",
	DustOff = "Dust off",
	ChestPound = "Chest pound",
	March = "March",
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
	Awww = "Awww",
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
}

export const enum Stance {
	Sassy = "Sassy",
	Laidback = "Laidback",
	Wise = "Wise",
	Timid = "Timid",
	Tinker = "Tinker",
	Injured = "Injured",
}

interface SpiritOffer {
	candles: number;
	hearts: number;
	ascendedCandles: number;
}

interface BaseSpiritDataBase {
	name: SpiritName;
	realm: Realm;
	itemsData: Readonly<Readonly<[number, string, string]>[]>;
	offer?: SpiritOffer;
	keywords?: string[];
}

interface StandardSpiritData extends BaseSpiritDataBase {
	expression?: Expression;
	stance?: Stance;
	call?: Call;
}

export type SeasonalSpiritVisitCollectionKey = number | "Error";

export interface SeasonalSpiritVisit {
	travelling: Collection<SeasonalSpiritVisitCollectionKey, Dayjs>;
	returning: Collection<SeasonalSpiritVisitCollectionKey, Dayjs>;
}

interface SeasonalSpiritData extends StandardSpiritData {
	season: Season;
	hasMarketingVideo?: boolean;
	visits?: SeasonalSpiritVisit;
}

interface SpiritSeason {
	name: Season;
}

abstract class BaseSpirit {
	public readonly name: BaseSpiritDataBase["name"];

	public readonly realm: BaseSpiritDataBase["realm"];

	public readonly flags: Record<string, number>;

	public readonly flagsToItems: Record<number, string>;

	public readonly maxItemBit = 0;

	public readonly offer: Exclude<BaseSpiritDataBase["offer"], undefined> | null;

	public readonly keywords: NonNullable<BaseSpiritDataBase["keywords"]>;

	public readonly imageURL: string;

	public readonly wikiURL: string;

	public constructor(spirit: BaseSpiritDataBase) {
		this.name = spirit.name;
		this.realm = spirit.realm;

		const flags: Record<(typeof spirit.itemsData)[number][1], (typeof spirit.itemsData)[number][0]> = {};
		const flagsToItems: Record<(typeof spirit.itemsData)[number][0], (typeof spirit.itemsData)[number][2]> = {};

		for (const [bit, key, item] of spirit.itemsData ?? []) {
			this.maxItemBit |= bit;
			flags[key] = bit;
			flagsToItems[bit] = item;
		}

		this.flags = flags;
		this.flagsToItems = flagsToItems;
		this.offer = spirit.offer ?? null;
		this.keywords = spirit.keywords ?? [];
		this.imageURL = String(new URL(`spirits/${this.cdnName}/friendship_tree.webp`, CDN_URL));
		this.wikiURL = new URL(spirit.name.replaceAll(" ", "_"), WIKI_URL).toString();
	}

	public resolveBitsToOffer(bits: number) {
		const offer = [];

		for (const [bit, item] of Object.entries(this.flagsToItems)) {
			const _bit = Number(bit);
			if ((bits & _bit) === _bit) offer.push(item);
		}

		return offer;
	}

	public isStandardSpirit(): this is StandardSpirit {
		return "expression" in this || "stance" in this || "call" in this;
	}

	public isSeasonalSpirit(): this is SeasonalSpirit {
		return "season" in this;
	}

	public get cdnName() {
		return this.name.replaceAll(" ", "_").toLowerCase();
	}
}

export class StandardSpirit extends BaseSpirit {
	public readonly expression: StandardSpiritData["expression"] | null;

	public readonly stance: StandardSpiritData["stance"] | null;

	public readonly call: StandardSpiritData["call"] | null;

	public constructor(spirit: StandardSpiritData) {
		super(spirit);
		this.expression = "expression" in spirit ? spirit.expression : null;
		this.stance = "stance" in spirit ? spirit.stance : null;
		this.call = "call" in spirit ? spirit.call : null;
	}
}

export class ElderSpirit extends BaseSpirit {}

export class SeasonalSpirit extends StandardSpirit {
	public readonly season: SpiritSeason;

	public readonly marketingVideoURL: string | null;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		this.season = { name: spirit.season };

		this.marketingVideoURL = spirit.hasMarketingVideo
			? String(new URL(`spirits/${this.cdnName}/marketing_video.mp4`, CDN_URL))
			: null;

		this.visits =
			"visits" in spirit
				? spirit.visits
				: {
						travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
						returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
				  };
	}

	public get notVisited() {
		return this.visits.travelling.size === 0 && this.visits.returning.size === 0;
	}
}
