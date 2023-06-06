import { URL } from "node:url";
import type { Dayjs } from "dayjs";
import type { BaseInteraction } from "discord.js";
import { Collection } from "discord.js";
import { type Realm, type Season, CDN_URL, WIKI_URL, Emoji } from "../../Utility/Constants.js";
import { resolveCurrencyEmoji } from "../../Utility/Utility.js";

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

	// Season of Gratitude
	SassyDrifter = "Sassy Drifter",
	StretchingGuru = "Stretching Guru",
	ProvokingPerformer = "Provoking Performer",
	LeapingDancer = "Leaping Dancer",
	SalutingProtector = "Saluting Protector",
	GreetingShaman = "Greeting Shaman",

	// Season of Lightseekers
	PiggybackLightseeker = "Piggyback Lightseeker",
	DoublefiveLightCatcher = "Doublefive Light Catcher",
	LaidbackPioneer = "Laidback Pioneer",
	TwirlingChampion = "Twirling Champion",
	CrabWhisperer = "Crab Whisperer",
	ShushingLightScholar = "Shushing Light Scholar",

	// Season of Belonging
	BoogieKid = "Boogie Kid",
	ConfettiCousin = "Confetti Cousin",
	HairtousleTeen = "Hairtousle Teen",
	SparklerParent = "Sparkler Parent",
	PleafulParent = "Pleaful Parent",
	WiseGrandparent = "Wise Grandparent",

	// Season of Rhythm
	TroupeGreeter = "Troupe Greeter",
	FestivalSpinDancer = "Festival Spin Dancer",
	AdmiringActor = "Admiring Actor",
	TroupeJuggler = "Troupe Juggler",
	RespectfulPianist = "Respectful Pianist",
	ThoughtfulDirector = "Thoughtful Director",

	// Season of Enchantment
	NoddingMuralist = "Nodding Muralist",
	IndifferentAlchemist = "Indifferent Alchemist",
	CrabWalker = "Crab Walker",
	ScarecrowFarmer = "Scarecrow Farmer",
	SnoozingCarpenter = "Snoozing Carpenter",
	PlayfightingHerbalist = "Playfighting Herbalist",

	// Season of Sanctuary
	JellyWhisperer = "Jelly Whisperer",
	TimidBookworm = "Timid Bookworm",
	RallyingThrillseeker = "Rallying Thrillseeker",
	HikingGrouch = "Hiking Grouch",
	GratefulShellCollector = "Grateful Shell Collector",
	ChillSunbather = "Chill Sunbather",

	// Season of Prophecy
	ProphetOfWater = "Prophet of Water",
	ProphetOfEarth = "Prophet of Earth",
	ProphetOfAir = "Prophet of Air",
	ProphetOfFire = "Prophet of Fire",

	// Season of Dreams
	SpinningMentor = "Spinning Mentor",
	DancingPerformer = "Dancing Performer",
	PeekingPostman = "Peeking Postman",
	BearhugHermit = "Bearhug Hermit",

	// Season of Assembly
	BaffledBotanist = "Baffled Botanist",
	ScoldingStudent = "Scolding Student",
	ScaredyCadet = "Scaredy Cadet",
	MarchingAdventurer = "Marching Adventurer",
	ChucklingScout = "Chuckling Scout",
	DaydreamForester = "Daydream Forester",

	// Season of Little Prince
	BeckoningRuler = "Beckoning Ruler",
	GloatingNarcissist = "Gloating Narcissist",
	StretchingLamplighter = "Stretching Lamplighter",
	SlouchingSoldier = "Slouching Soldier",
	SneezingGeographer = "Sneezing Geographer",
	StarCollector = "Star Collector",

	// Season of Flight
	LivelyNavigator = "Lively Navigator",
	LightWhisperer = "Light Whisperer",
	TinkeringChimesmith = "Tinkering Chimesmith",
	TalentedBuilder = "Talented Builder",

	// Season of Abyss
	AnxiousAngler = "Anxious Angler",
	CeasingCommodore = "Ceasing Commodore",
	BumblingBoatswain = "Bumbling Boatswain",
	CacklingCannoneer = "Cackling Cannoneer",

	// Season of Performance
	FranticStagehand = "Frantic Stagehand",
	ForgetfulStoryteller = "Forgetful Storyteller",
	MellowMusician = "Mellow Musician",
	ModestDancer = "Modest Dancer",

	// Season of Shattering
	AncientLight1 = "Ancient Light (Jellyfish)",
	AncientLight2 = "Ancient Light (Manta)",
	AncientDarkness1 = "Ancient Darkness (Plant)",
	AncientDarkness2 = "Ancient Darkness (Dragon)",

	// Season of AURORA
	RunningWayfarer = "Running Wayfarer",
	MindfulMiner = "Mindful Miner",
	WarriorOfLove = "Warrior of Love",
	SeedOfHope = "Seed of Hope",

	// Season of Remembrance
	BereftVeteran = "Bereft Veteran",
	PleadingChild = "Pleading Child",
	TiptoeingTeaBrewer = "Tiptoeing Tea-Brewer",
	WoundedWarrior = "Wounded Warrior",

	// Season of Passage
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

export const SPIRIT_TYPE = {
	// No standard spirits exist yet.
	// Standard: 0,
	Elder: 1,
	Seasonal: 2,
} as const;

export type SpiritType = (typeof SPIRIT_TYPE)[keyof typeof SPIRIT_TYPE];

export interface SpiritCost {
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
}

export interface ItemsData {
	item: string;
	cost: SpiritCost | null;
}

interface BaseSpiritDataBase {
	name: SpiritName;
	realm: Realm | null;
	offer: Collection<number, ItemsData>;
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

export function resolveSpiritTypeToString(spiritType: SpiritType) {
	switch (spiritType) {
		// case SPIRIT_TYPE.Standard:
		// return "Standard Spirit";
		case SPIRIT_TYPE.Elder:
			return "Elders";
		case SPIRIT_TYPE.Seasonal:
			return "Seasonal Spirits";
	}
}

export function resolveOfferToCurrency(interaction: BaseInteraction, cost: SpiritCost) {
	const totalCost = [];

	if (cost.candles) {
		totalCost.push(resolveCurrencyEmoji(interaction, { emoji: Emoji.Candle, number: cost.candles }));
	}

	if (cost.hearts) {
		totalCost.push(resolveCurrencyEmoji(interaction, { emoji: Emoji.Heart, number: cost.hearts }));
	}

	if (cost.ascendedCandles) {
		totalCost.push(resolveCurrencyEmoji(interaction, { emoji: Emoji.AscendedCandle, number: cost.ascendedCandles }));
	}

	if (cost.seasonalCandles) {
		totalCost.push(resolveCurrencyEmoji(interaction, { emoji: Emoji.SeasonalCandle, number: cost.seasonalCandles }));
	}

	return totalCost;
}

export abstract class BaseSpirit {
	public readonly name: BaseSpiritDataBase["name"];

	public readonly realm: BaseSpiritDataBase["realm"];

	public readonly offer: BaseSpiritDataBase["offer"];

	public readonly totalCost: SpiritCost;

	public readonly maxItemsBit: number;

	public readonly keywords: NonNullable<BaseSpiritDataBase["keywords"]>;

	public readonly imageURL: string;

	public readonly wikiURL: string;

	public constructor(spirit: BaseSpiritDataBase) {
		this.name = spirit.name;
		this.realm = spirit.realm;
		this.offer = spirit.offer;

		this.totalCost = this.offer.reduce<BaseSpirit["totalCost"]>((offer, { cost }) => {
			if (!cost) return offer;
			const { candles, hearts, ascendedCandles, seasonalCandles } = cost;

			if (candles) {
				if (offer.candles) {
					offer.candles += candles;
				} else {
					offer.candles = candles;
				}
			}

			if (hearts) {
				if (offer.hearts) {
					offer.hearts += hearts;
				} else {
					offer.hearts = hearts;
				}
			}

			if (ascendedCandles) {
				if (offer.ascendedCandles) {
					offer.ascendedCandles += ascendedCandles;
				} else {
					offer.ascendedCandles = ascendedCandles;
				}
			}

			if (seasonalCandles) {
				if (offer.seasonalCandles) {
					offer.seasonalCandles += seasonalCandles;
				} else {
					offer.seasonalCandles = seasonalCandles;
				}
			}

			return offer;
		}, {});

		this.maxItemsBit = this.offer.reduce((bits, _, bit) => bit | bits, 0);
		this.keywords = spirit.keywords ?? [];
		this.imageURL = String(new URL(`spirits/${this.cdnName}/friendship_tree.webp`, CDN_URL));
		this.wikiURL = new URL(this.wikiName, WIKI_URL).toString();
	}

	public isStandardSpirit(): this is StandardSpirit {
		return "expression" in this || "stance" in this || "call" in this;
	}

	public isSeasonalSpirit(): this is SeasonalSpirit {
		return "season" in this;
	}

	public get cdnName() {
		return this.wikiName.toLowerCase();
	}

	public get wikiName() {
		const { name } = this;
		return (name.includes("(") ? name.slice(0, name.indexOf("(") - 1) : name).replaceAll(" ", "_");
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
	public declare readonly imageURL: string;

	public readonly season: SpiritSeason;

	public readonly marketingVideoURL: string | null;

	public readonly visits: SeasonalSpiritVisit;

	public constructor(spirit: SeasonalSpiritData) {
		super(spirit);
		this.season = { name: spirit.season };

		if ([SpiritName.AncientLight1, SpiritName.AncientDarkness1].includes(this.name)) {
			this.imageURL = this.imageURL.replace("friendship_tree", "friendship_tree1");
		} else if ([SpiritName.AncientLight2, SpiritName.AncientDarkness2].includes(this.name)) {
			this.imageURL = this.imageURL.replace("friendship_tree", "friendship_tree2");
		}

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
