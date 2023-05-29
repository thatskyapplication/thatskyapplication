import process from "node:process";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(timezone);
dayjs.extend(utc);

// Log channels.
export const ERROR_LOG_CHANNEL_ID = "1040806599293407263" as const;
export const GUILD_LOG_CHANNEL_ID = "1107804841813749780" as const;

export const production = process.env.NODE_ENV === "production";
export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const CDN_URL = "https://cdn.thatskyapplication.com" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 215 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const MAX_HUG_NO = 16 as const;
export const doubleSeasonalLightEventStartTimestamp = dayjs.tz("2023-05-15 00:00:00", "America/Los_Angeles");
export const doubleSeasonalLightEventEndTimestamp = dayjs.tz("2023-05-21 00:00:00", "America/Los_Angeles");
export const initialTreasureCandleRealmSeek = dayjs.tz("2023-01-03 00:00:00", "America/Los_Angeles"); // Daylight Prairie.
export const ISS_DATES_ACCESSIBLE = [6, 13, 20, 27] as const;

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
	AncientMemory = "Ancient Memory",
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
}

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

export const WingedLightCount = {
	IslesOfDawn: 9,
	DaylightPrairie: 21,
	HiddenForest: 19,
	ValleyOfTriumph: 17,
	GoldenWasteland: 18,
	VaultOfKnowledge: 12,
	EyeOfEden: 10,
	AncientMemory: 6,
	Orbit: 1,
} as const;

export const enum Season {
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
}
