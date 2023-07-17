import process from "node:process";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { skyDate } from "./Utility.js";

dayjs.extend(timezone);
dayjs.extend(utc);

// Log channels.
export const ERROR_LOG_CHANNEL_ID = "1040806599293407263" as const;
export const GUILD_LOG_CHANNEL_ID = "1107804841813749780" as const;
export const COMMAND_LOG_CHANNEL_ID = "1114135883604566057" as const;

// Infographic URLs.
export const EVENT_CURRENCY_INFOGRAPHIC_URL =
	"https://cdn.discordapp.com/attachments/739444631963435008/1114345385696170085/DaysOfColorTicketsRotations.jpg" as const;

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
export const MAXIMUM_WINGED_LIGHT = 218 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const MAX_HUG_NO = 17 as const;
export const seasonStartDate = skyDate(2_023, 7, 17); // Season of Moments.
export const seasonEndDate = skyDate(2_023, 10, 1); // Season of Moments.
export const doubleSeasonalLightEventStartTimestamp = dayjs.tz("2023-05-15 00:00:00", "America/Los_Angeles");
export const doubleSeasonalLightEventEndTimestamp = dayjs.tz("2023-05-21 00:00:00", "America/Los_Angeles");
export const initialTravellingSpiritSeek = dayjs.tz("2023-05-25 00:00:00", "America/Los_Angeles"); // #88 Grateful Shell Collector.
export const initialTreasureCandleRealmSeek = skyDate(2_023, 7, 12); // Daylight Prairie.
export const seasonalCandlesRotationStartDate = dayjs.tz("2023-06-05 00:00:00", "America/Los_Angeles"); // Valley of Triumph (2).
export const initialEventCurrencySeek = dayjs.tz("2023-06-01 00:00:00", "America/Los_Angeles"); // Rotation A.
export const ISS_DATES_ACCESSIBLE = [6, 14, 22, 30] as const;
export const eventEndDate = dayjs.tz("2023-06-14 00:00:00", "America/Los_Angeles"); // Days of Color (2023).
export const DEFAULT_EMBED_COLOR = 0xa5b5f1 as const;

export const enum Channel {
	dailyGuides = "1041420071614042152",
}

export const enum Emoji {
	Candle = "1074399446537879685",
	Heart = "1074399455043932240",
	AscendedCandle = "1074399464627912755",
	WingedLight = "1075042577776136313",
	Yes = "1111792276394475580",
	No = "1111792367104708699",
	iOS = "1112935921197789304",
	Android = "1112936417182621727",
	Mac = "1112936431464235058",
	Switch = "1112936564004237392",
	PlayStation = "1112937466312278036",
	Gratitude = "1113247310114193458",
	Lightseekers = "1113247330221707314",
	Belonging = "1113247355932778598",
	Rhythm = "1113247376908496916",
	Enchantment = "1113247405454921859",
	Sanctuary = "1113247420080463902",
	Prophecy = "1113247443857985547",
	Dreams = "1113247473230676008",
	Assembly = "1113247484001652817",
	LittlePrince = "1113247526812921856",
	Flight = "1113247537399332926",
	Abyss = "1113247546219974726",
	Performance = "1113247572069457951",
	Shattering = "1113247601081471136",
	Aurora = "1113247614138322984",
	Remembrance = "1113247635885793330",
	Passage = "1113247650259677254",
	SeasonalCandle = "1115305105642758145",
	SeasonalHeart = "1115841397493346325",
	Moments = "1130091541151629332",
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
	JellyfishCove = "Jellyfish Cove",
	SpiritMantas = "Spirit Mantas",
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
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b4/Valley-of-Triump-Seasonal-Candles-locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/56/Golden-Wasteland-Seasonal-candles-Locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9d/Vault-of-knowledge-Seasonal-candles-Locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5f/Daylight-Prairie-Seasonal-Candles-locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d8/Hidden-Forest-Seasonal-Candles-locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b4/Valley-of-Triump-Seasonal-Candles-locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/56/Golden-Wasteland-Seasonal-candles-Locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 2, // This was rotation 1 on 2nd July 2023.
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9d/Vault-of-knowledge-Seasonal-candles-Locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 1,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5f/Daylight-Prairie-Seasonal-Candles-locations-Pattern-A.png/revision/latest",
	},
	{
		rotation: 2,
		url: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d8/Hidden-Forest-Seasonal-Candles-locations-Pattern-A.png/revision/latest",
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
