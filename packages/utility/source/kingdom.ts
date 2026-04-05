import type { DateTime } from "luxon";
import { WING_BUFFS } from "./cosmetics.js";
import { skyDate } from "./dates.js";
import { CDN_URL } from "./routes.js";

export enum RealmName {
	IsleOfDawn = "Isle of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
}

export const REALM_NAME_VALUES = Object.values(RealmName);

export function isRealm(realm: string): realm is RealmName {
	return REALM_NAME_VALUES.includes(realm as RealmName);
}

export const VALID_REALM_NAME = [
	RealmName.DaylightPrairie,
	RealmName.HiddenForest,
	RealmName.ValleyOfTriumph,
	RealmName.GoldenWasteland,
	RealmName.VaultOfKnowledge,
] as const;

export type ValidRealmName = (typeof VALID_REALM_NAME)[number];
export const VALID_REALM_NAME_VALUES = Object.values(VALID_REALM_NAME);
type TreasureCandlesRotation = Readonly<Record<ValidRealmName, readonly [string, string, string?]>>;

export enum SkyMap {
	// Daylight Prairie.
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	PrairieCave = "Prairie Cave",
	PrairiePeaks = "Prairie Peaks",
	KoiPond = "Koi Pond",
	PrairieVillage = "Prairie Village",
	TempleOfThePrairie = "Temple of the Prairie",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest.
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	SacredPond = "Sacred Pond",
	TheTreehouse = "The Treehouse",
	TheWindPaths = "The Wind Paths",

	// Valley of Triumph.
	FrozenLake = "Frozen Lake",
	HermitValley = "Hermit Valley",
	VillageOfDreams = "Village of Dreams",
	VillageTheatre = "Village Theatre",

	// Golden Wasteland.
	TheBattlefield = "The Battlefield",
	TheOuterBailey = "The Outer Bailey",
	CrabFields = "Crab Fields",
	ForgottenArk = "Forgotten Ark",
	TheGraveyard = "The Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge.
	JellyfishCove = "Jellyfish Cove",
	StarlightDesert = "Starlight Desert",
	RepositoryOfRefuge = "Repository of Refuge",

	// Eye of Eden.
	StormEnd = "Eye of Eden",

	// The Passage.
	ThePassage = "The Passage",

	// Season of Shattering.
	AncientMemory = "Ancient Memory",

	// Season of Revival.
	AviaryVillage = "Aviary Village",
}

export const SKY_MAP_VALUES = Object.values(SkyMap);
export const WINGED_LIGHT_AREAS = [...REALM_NAME_VALUES, SkyMap.AncientMemory] as const;
type WingedLightAreas = (typeof WINGED_LIGHT_AREAS)[number];

export const WINGED_LIGHT_THRESHOLDS = [
	1, 2, 5, 10, 20, 35, 55, 75, 100, 120, 150, 200, 250, 300,
] as const satisfies Readonly<number[]>;

export const AreaToWingedLight = {
	[RealmName.IsleOfDawn]: 10,
	[RealmName.DaylightPrairie]: 24,
	[RealmName.HiddenForest]: 21,
	[RealmName.ValleyOfTriumph]: 17,
	[RealmName.GoldenWasteland]: 18,
	[RealmName.VaultOfKnowledge]: 16,
	[RealmName.EyeOfEden]: 10,
	[SkyMap.AncientMemory]: 6,
	[SkyMap.ThePassage]: 1,
} as const satisfies Readonly<Record<WingedLightAreas | SkyMap.ThePassage, number>>;

export const WINGED_LIGHT_IN_AREAS = Object.values(AreaToWingedLight).reduce(
	(wingedLightCount, wingedLight) => wingedLightCount + wingedLight,
	0,
);

export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = WINGED_LIGHT_IN_AREAS + WING_BUFFS.length;

// 01/01/2025 failed and is thus the first day of the cycle.
const TREASURE_CANDLES_INITIAL_SEEK = skyDate(2025, 1, 1);

interface TreasureCandlesConfiguration {
	start: DateTime;
	rotation: TreasureCandlesRotation;
}

interface TreasureCandlesDoubleConfiguration {
	start: DateTime;
	end: DateTime;
	rotation: TreasureCandlesRotation;
}

const TREASURE_CANDLES_CONFIGURATIONS = [
	{
		start: skyDate(2025, 1, 1),
		rotation: {
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
				String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			],
			[RealmName.GoldenWasteland]: [
				String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			],
			[RealmName.VaultOfKnowledge]: [
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			],
		},
	},
	{
		start: skyDate(2026, 4, 5),
		rotation: {
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
				String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			],
			[RealmName.GoldenWasteland]: [
				String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			],
			[RealmName.VaultOfKnowledge]: [
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			],
		},
	},
] as const satisfies readonly TreasureCandlesConfiguration[];

const TREASURE_CANDLES_DOUBLE_ROTATION = {
	[RealmName.DaylightPrairie]: [
		String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
	],
	[RealmName.HiddenForest]: [
		String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
	],
	[RealmName.ValleyOfTriumph]: [
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
	],
	[RealmName.GoldenWasteland]: [
		String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
	],
	[RealmName.VaultOfKnowledge]: [
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
	],
} as const satisfies TreasureCandlesRotation;

const TREASURE_CANDLES_DOUBLE_CONFIGURATIONS = [
	{
		start: skyDate(2024, 12, 9),
		end: skyDate(2024, 12, 23),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2025, 3, 17),
		end: skyDate(2025, 3, 24),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2025, 4, 7),
		end: skyDate(2025, 4, 21),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2025, 6, 9),
		end: skyDate(2025, 6, 23),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2025, 8, 19),
		end: skyDate(2025, 9, 2),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2025, 9, 22),
		end: skyDate(2025, 9, 29),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2025, 11, 17),
		end: skyDate(2025, 12, 1),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2025, 12, 31),
		end: skyDate(2026, 1, 16),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2026, 2, 27),
		end: skyDate(2026, 3, 13),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
] as const satisfies readonly TreasureCandlesDoubleConfiguration[];

function treasureCandleFromConfiguration(
	today: DateTime,
	{ rotation }: TreasureCandlesConfiguration | TreasureCandlesDoubleConfiguration,
) {
	const daysDiff = today.diff(TREASURE_CANDLES_INITIAL_SEEK, "days").days;
	const realmIndex = VALID_REALM_NAME.at((daysDiff + 4) % 5)!;
	const realmRotation = rotation[realmIndex];
	return realmRotation[daysDiff % realmRotation.length]!;
}

export function treasureCandles(today: DateTime): readonly [string, ...string[]] {
	if (today.year === 2025 && today.month === 3 && today.day === 21) {
		// 3 were available on this date.
		return [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		];
	}

	const configuration =
		TREASURE_CANDLES_CONFIGURATIONS.findLast(({ start }) => today >= start) ??
		TREASURE_CANDLES_CONFIGURATIONS[0];

	const result: [string] = [treasureCandleFromConfiguration(today, configuration)];

	const doubleConfiguration = TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.findLast(
		({ start, end }) => today >= start && today < end,
	);

	if (doubleConfiguration !== undefined) {
		result.push(treasureCandleFromConfiguration(today, doubleConfiguration));
	}

	return result;
}
