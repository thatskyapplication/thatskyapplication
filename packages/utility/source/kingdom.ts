import { CDN_URL } from "./cdn.js";
import { skyDate } from "./dates.js";

export enum RealmName {
	IslesOfDawn = "Isles of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
}

export const REALM_NAME_VALUES = Object.values(RealmName);

export const VALID_REALM_NAME = [
	RealmName.DaylightPrairie,
	RealmName.HiddenForest,
	RealmName.ValleyOfTriumph,
	RealmName.GoldenWasteland,
	RealmName.VaultOfKnowledge,
] as const;

export type ValidRealmName = (typeof VALID_REALM_NAME)[number];
export const VALID_REALM_NAME_VALUES = Object.values(VALID_REALM_NAME);

export enum SkyMap {
	// Daylight Prairie.
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	Cave = "Cave",
	KoiPond = "Koi Pond",
	VillageIslands = "Village Islands",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest.
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	ForestClearing = "Forest Clearing",
	ForestEnd = "Forest End",
	Treehouse = "Treehouse",
	WindPaths = "Wind Paths",

	// Valley of Triumph.
	IceRink = "Ice Rink",
	Citadel = "Citadel",
	Coliseum = "Coliseum",
	HermitValley = "Hermit Valley",
	VillageOfDreams = "Village of Dreams",

	// Golden Wasteland.
	Battlefield = "Battlefield",
	Boat = "Boat",
	BrokenTemple = "Broken Temple",
	CrabFields = "Crab Fields",
	ForgottenArk = "Forgotten Ark",
	Graveyard = "Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge.
	VaultEntrance = "Vault Entrance",
	JellyfishCove = "Jellyfish Cove",
	StarlightDesert = "Starlight Desert",
	VaultSecondFloor = "Vault Second Floor",
	VaultSummit = "Vault Summit",

	// Orbit.
	Orbit = "Orbit",

	// Season of Shattering.
	AncientMemory = "Ancient Memory",

	// Season of the Nine-Coloured Deer.
	CrescentOasis = "Crescent Oasis",
}

export const SKY_MAP_VALUES = Object.values(SkyMap);

// 01/01/2025 failed and is thus the first day of the cycle.
export const TREASURE_CANDLES_INITIAL_SEEK = skyDate(2025, 1, 1);

export const TREASURE_CANDLES_DOUBLE_DATES = [
	{ start: skyDate(2_024, 12, 9), end: skyDate(2_024, 12, 23) },
	{ start: skyDate(2_025, 3, 17), end: skyDate(2_025, 3, 24) },
];

export const TREASURE_CANDLES_ROTATION = {
	[RealmName.DaylightPrairie]: [
		String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
	],
	[RealmName.HiddenForest]: [
		String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
	],
	[RealmName.ValleyOfTriumph]: [
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
	],
	[RealmName.GoldenWasteland]: [
		String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
	],
	[RealmName.VaultOfKnowledge]: [
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
	],
} as const;

export const TREASURE_CANDLES_DOUBLE_ROTATION = {
	[RealmName.DaylightPrairie]: [
		String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
	],
	[RealmName.HiddenForest]: [
		String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
	],
	[RealmName.ValleyOfTriumph]: [
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
	],
	[RealmName.GoldenWasteland]: [
		String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
	],
	[RealmName.VaultOfKnowledge]: [
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
	],
} as const;
