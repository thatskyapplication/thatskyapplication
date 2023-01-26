export const DEVELOPER_GUILD_ID = "1017993798170726411" as const;
export const LOG_CHANNEL_ID = "1040806599293407263" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki/" as const;
export const MAXIMUM_WINGED_LIGHT = 209 as const;
// 4 from quests and 1 from candle running.
export const SEASONAL_CANDLES_PER_DAY = 5;
// As well as the above but with an extra seaonal candle a day from the meditation shrine.
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;

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
	AncientMemory = "Ancient Memory",
}

export enum Map {
	// Daylight Prairie
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	Cave = "Cave",
	KoiPond = "Koi Pond",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	ForestClearing = "Forest Clearing",
	ForestEnd = "Forest End",
	WindPaths = "Wind Paths",

	// Valley of Triumph
	IceRink = "Ice Rink",
	Citadel = "Citadel",
	Coliseum = "Coliseum",
	HermitValley = "Hermit Valley",

	// Golden Wasteland
	Battlefield = "Battlefield",
	Boat = "Boat",
	BrokenTemple = "Broken Temple",
	ForgottenArk = "Forgotten Ark",
	Graveyard = "Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge
	SpiritMantas = "Spirit Mantas",
	StarlightDesert = "Starlight Desert",
	VaultSecondFloor = "Vault Second Floor",
	VaultSummit = "Vault Summit",
}

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
