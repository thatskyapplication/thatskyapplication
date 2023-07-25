import process from "node:process";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { skyDate } from "./Utility.js";

dayjs.extend(timezone);
dayjs.extend(utc);

export const enum Emoji {
	AscendedCandle = "1074399464627912755",
	WingedLight = "1075042577776136313",
	Yes = "1111792276394475580",
	No = "1111792367104708699",
	iOS = "1112935921197789304",
	Android = "1112936417182621727",
	Mac = "1112936431464235058",
	Switch = "1112936564004237392",
	PlayStation = "1112937466312278036",
	SeasonGratitude = "1113247310114193458",
	SeasonLightseekers = "1113247330221707314",
	SeasonBelonging = "1113247355932778598",
	SeasonRhythm = "1113247376908496916",
	SeasonEnchantment = "1113247405454921859",
	SeasonSanctuary = "1113247420080463902",
	SeasonProphecy = "1113247443857985547",
	SeasonDreams = "1113247473230676008",
	SeasonAssembly = "1113247484001652817",
	SeasonLittlePrince = "1113247526812921856",
	SeasonFlight = "1113247537399332926",
	SeasonAbyss = "1113247546219974726",
	SeasonPerformance = "1113247572069457951",
	SeasonShattering = "1113247601081471136",
	SeasonAurora = "1113247614138322984",
	SeasonRemembrance = "1113247635885793330",
	SeasonPassage = "1113247650259677254",
	SeasonalCandle = "1115305105642758145",
	SeasonalHeart = "1115841397493346325",
	SeasonMoments = "1130091541151629332",
	Candle = "1134669696822689882",
	Heart = "1134669722353401977",
	CandleGratitude = "1135233671255830619",
	CandleLightseekers = "1135233695343718411",
	CandleBelonging = "1135302561088409741",
	CandleRhythm = "1135302602121298060",
	CandleEnchantment = "1135302620181970944",
	CandleSanctuary = "1135302635189182614",
	CandleProphecy = "1135302685080432660",
	CandleDreams = "1135302699655630849",
	CandleAssembly = "1135302713366810685",
	CandleLittlePrince = "1135302724880175134",
	CandleFlight = "1135302737962221608",
	CandleAbyss = "1135302746787029144",
	CandlePerformance = "1135302762029138040",
	CandleShattering = "1135302774205186048",
	CandleAurora = "1135302785714360390",
	CandleRemembrance = "1135302796397256755",
	CandlePassage = "1135302811819708569",
	CandleMoments = "1135302823593119804",
	HeartBelonging = "1135304922997465168",
	HeartRhythm = "1135304943302082760",
	HeartEnchantment = "1135304955104862279",
	HeartSanctuary = "1135304967679389868",
	HeartProphecy = "1135304979532496906",
	HeartDreams = "1135305001149935696",
	HeartAssembly = "1135305017449001091",
	HeartLittlePrince = "1135305036113649724",
	HeartFlight = "1135305050084880484",
	HeartAbyss = "1135305058838384670",
	HeartPerformance = "1135305071509377085",
	HeartShattering = "1135305088043327578",
	HeartAurora = "1135305121153159311",
	HeartRemembrance = "1135305133614432266",
	HeartPassage = "1135305161498181765",
	HeartMoments = "1135305178027933899",
}

// Log channels.
export const ERROR_LOG_CHANNEL_ID = "1040806599293407263" as const;
export const GUILD_LOG_CHANNEL_ID = "1107804841813749780" as const;
export const COMMAND_LOG_CHANNEL_ID = "1114135883604566057" as const;
export const MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID = "1131896865378549832" as const;

// Infographic URLs.
export const EVENT_CURRENCY_INFOGRAPHIC_URL =
	"https://media.discordapp.net/attachments/739444631963435008/1130395560122273843/IMG_1867.jpg" as const;

// Dates.
export const doubleSeasonalLightEventStartDate = skyDate(2_023, 5, 15);
export const doubleSeasonalLightEventEndDate = skyDate(2_023, 5, 21);

export const doubleSeasonalLightEventDuration =
	doubleSeasonalLightEventEndDate.diff(doubleSeasonalLightEventStartDate, "days") + 1;

export const seasonStartDate = skyDate(2_023, 7, 17); // Season of Moments.
export const seasonEndDate = skyDate(2_023, 10, 1); // Season of Moments.
export const seasonEventDuration = seasonEndDate.diff(seasonStartDate, "days") + 1;

// Current seasonal information.
export const CURRENT_SEASONAL_EMOJI = Emoji.SeasonMoments;
export const CURRENT_SEASONAL_CANDLE_EMOJI = Emoji.CandleMoments;

// Miscellaneous constants.
export const production = process.env.NODE_ENV === "production";
export const CDN_BUCKET = "thatskyapplication" as const;
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const CDN_URL = "https://cdn.thatskyapplication.com" as const;
export const THATSKYGAME_URL = "https://thatskygame.com" as const;
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
export const PATREON_URL = "https://patreon.com/Jiralite" as const;
export const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 220 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const MAX_HUG_NO = 21 as const;
export const initialTravellingSpiritSeek = dayjs.tz("2023-05-25 00:00:00", "America/Los_Angeles"); // #88 Grateful Shell Collector.
export const initialTreasureCandleRealmSeek = skyDate(2_023, 7, 12); // Daylight Prairie.
export const initialEventCurrencySeek = dayjs.tz("2023-06-01 00:00:00", "America/Los_Angeles"); // Rotation A.
export const ISS_DATES_ACCESSIBLE = [6, 14, 22, 30] as const;
export const eventEndDate = skyDate(2_023, 7, 30); // Sky Anniversary (2023).
export const DEFAULT_EMBED_COLOR = 0xa5b5f1 as const;
export const MAXIMUM_EMBED_FIELD_NAME_LENGTH = 256 as const;
export const MAXIMUM_EMBED_FIELD_VALUE_LENGTH = 1_024 as const;

export const enum Channel {
	dailyGuides = "1041420071614042152",
}

export const enum User {
	Jiralite = "618976181026422814",
}

export enum Realm {
	IslesOfDawn = "Isles of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
}

export enum Map {
	// Daylight Prairie
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	Cave = "Cave",
	KoiPond = "Koi Pond",
	VillageIslands = "Village Islands",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	ForestClearing = "Forest Clearing",
	ForestEnd = "Forest End",
	Treehouse = "Treehouse",
	WindPaths = "Wind Paths",

	// Valley of Triumph
	IceRink = "Ice Rink",
	Citadel = "Citadel",
	Coliseum = "Coliseum",
	HermitValley = "Hermit Valley",
	VillageOfDreams = "Village of Dreams",

	// Golden Wasteland
	Battlefield = "Battlefield",
	Boat = "Boat",
	BrokenTemple = "Broken Temple",
	CrabFields = "Crab Fields",
	ForgottenArk = "Forgotten Ark",
	Graveyard = "Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge
	VaultEntrance = "Vault Entrance",
	JellyfishCove = "Jellyfish Cove",
	StarlightDesert = "Starlight Desert",
	VaultSecondFloor = "Vault Second Floor",
	VaultSummit = "Vault Summit",

	// Season of Shattering
	AncientMemory = "Ancient Memory",
}

export const WINGED_LIGHT_AREAS = [...Object.values(Realm), Map.AncientMemory] as const;

// This exists due to the Infographics server's inconsistencies and faults alongside no desire to fix them.
export const INCONSISTENT_MAP = {
	// Daylight Prairie
	"Sanctuary Island": Map.SanctuaryIslands,

	// Hidden Forest
	"Forest's Brook": Map.ForestBrook,

	// Valley of Triumph
	"Race End": Map.Coliseum,
} as const;

export const inconsistentMapKeys = Object.keys(INCONSISTENT_MAP);

export const VALID_REALM = [
	Realm.DaylightPrairie,
	Realm.HiddenForest,
	Realm.ValleyOfTriumph,
	Realm.GoldenWasteland,
	Realm.VaultOfKnowledge,
] as const;

export type ValidRealm = (typeof VALID_REALM)[number];

export const SEASONAL_CANDLES_ROTATION = [
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ec/Vault-of-knowledge-Seasonal-candles-Locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/54/Daylight-Prairie-Seasonal-Candles-locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8f/Hidden-Forest-Seasonal-Candles-locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/66/Valley-of-Triump-Seasonal-Candles-locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a3/Golden-Wasteland-Seasonal-candles-Locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ec/Vault-of-knowledge-Seasonal-candles-Locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/54/Daylight-Prairie-Seasonal-Candles-locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8f/Hidden-Forest-Seasonal-Candles-locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/66/Valley-of-Triump-Seasonal-Candles-locations-Pattern-B.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a3/Golden-Wasteland-Seasonal-candles-Locations-Pattern-B.png/revision/latest",
	},
] as const satisfies Readonly<{ rotation: 1 | 2; url: string }[]>;

export const WingedLightCount = {
	IslesOfDawn: 9,
	DaylightPrairie: 24,
	HiddenForest: 19,
	ValleyOfTriumph: 17,
	GoldenWasteland: 18,
	VaultOfKnowledge: 12,
	EyeOfEden: 10,
	AncientMemory: 6,
	Orbit: 1,
} as const;

export enum Season {
	Gratitude = "Gratitude",
	Lightseekers = "Lightseekers",
	Belonging = "Belonging",
	Rhythm = "Rhythm",
	Enchantment = "Enchantment",
	Sanctuary = "Sanctuary",
	Prophecy = "Prophecy",
	Dreams = "Dreams",
	Assembly = "Assembly",
	LittlePrince = "Little Prince",
	Flight = "Flight",
	Abyss = "Abyss",
	Performance = "Performance",
	Shattering = "Shattering",
	Aurora = "AURORA",
	Remembrance = "Remembrance",
	Passage = "Passage",
	Moments = "Moments",
}
