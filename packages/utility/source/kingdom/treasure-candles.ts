import { isActive, skyDate } from "../dates.js";
import { CDN_URL } from "../routes.js";
import { RealmName, VALID_REALM_NAME, type ValidRealmName } from "./geography.js";

type TreasureCandlesRotation = Readonly<Record<ValidRealmName, readonly [string, string, string?]>>;

// 01/01/2025 failed and is thus the first day of the cycle.
const TREASURE_CANDLES_INITIAL_SEEK = skyDate(2025, 1, 1);

interface TreasureCandlesConfiguration {
	start: Temporal.ZonedDateTime;
	rotation: TreasureCandlesRotation;
}

interface TreasureCandlesDoubleRotationOverride {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	rotation: TreasureCandlesRotation;
}

interface TreasureCandlesDoubleConfiguration {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	rotation: TreasureCandlesRotation;
	rotationOverrides?: readonly TreasureCandlesDoubleRotationOverride[];
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
	{
		start: skyDate(2026, 6, 5),
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
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			],
		},
	},
	{
		start: skyDate(2026, 8, 5),
		rotation: {
			[RealmName.DaylightPrairie]: [
				String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
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
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
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

export const TREASURE_CANDLES_DOUBLE_CONFIGURATIONS = [
	{
		start: skyDate(2020, 6, 22),
		end: skyDate(2020, 7, 20),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2020, 8, 17),
		end: skyDate(2020, 8, 24),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2020, 12, 21),
		end: skyDate(2021, 1, 4),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2021, 11, 23),
		end: skyDate(2021, 11, 30),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2022, 2, 25),
		end: skyDate(2022, 3, 11),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2022, 6, 20),
		end: skyDate(2022, 6, 27),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2022, 11, 22),
		end: skyDate(2022, 11, 29),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2023, 3, 6),
		end: skyDate(2023, 3, 20),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2023, 4, 10),
		end: skyDate(2023, 4, 17),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2023, 5, 15),
		end: skyDate(2023, 5, 22),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2023, 11, 20),
		end: skyDate(2023, 11, 27),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	// This event placed eight treasure candles in each realm (40 total). Not yet handled.
	// Source: https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1308-patch-notes---april-10-2024---0-25-0-257483-android-huawei-256148-ios-playstation-257607-pc-255731-switch
	{
		start: skyDate(2024, 4, 10),
		end: skyDate(2024, 4, 17),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2024, 9, 9),
		end: skyDate(2024, 9, 30),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
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
		rotationOverrides: [
			{
				start: skyDate(2026, 3, 3),
				end: skyDate(2026, 3, 5),
				rotation: {
					[RealmName.DaylightPrairie]: [
						String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
						String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
						String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
					],
					[RealmName.HiddenForest]: [
						String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
						String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
						String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
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
				},
			},
		],
	},
	{
		start: skyDate(2026, 6, 19),
		end: skyDate(2026, 7, 3),
		rotation: {
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
				String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
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
		} as const,
	},
	{
		start: skyDate(2026, 9, 11),
		end: skyDate(2026, 9, 25),
		rotation: {
			[RealmName.DaylightPrairie]: [
				String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
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
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
				String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			],
		} as const,
	},
] as const satisfies readonly TreasureCandlesDoubleConfiguration[];

function treasureCandleFromRotation(
	today: Temporal.ZonedDateTime,
	rotation: TreasureCandlesRotation,
) {
	const daysDiff = today
		.since(TREASURE_CANDLES_INITIAL_SEEK)
		.total({ unit: "days", relativeTo: TREASURE_CANDLES_INITIAL_SEEK });
	const realmIndex = VALID_REALM_NAME.at((daysDiff + 4) % 5)!;
	const realmRotation = rotation[realmIndex];
	return realmRotation.at(daysDiff % realmRotation.length)!;
}

function treasureCandleFromConfiguration(
	today: Temporal.ZonedDateTime,
	{ rotation }: TreasureCandlesConfiguration | TreasureCandlesDoubleConfiguration,
) {
	return treasureCandleFromRotation(today, rotation);
}

function treasureCandleFromDoubleConfiguration(
	today: Temporal.ZonedDateTime,
	{ rotation, rotationOverrides }: TreasureCandlesDoubleConfiguration,
) {
	const doubleRotation =
		rotationOverrides?.findLast(({ start, end }) => isActive(start, end, today))?.rotation ??
		rotation;

	return treasureCandleFromRotation(today, doubleRotation);
}

export function treasureCandles(today: Temporal.ZonedDateTime): readonly [string, ...string[]] {
	if (today.year === 2025 && today.month === 3 && today.day === 21) {
		// 3 were available on this date.
		return [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		];
	}

	const configuration =
		TREASURE_CANDLES_CONFIGURATIONS.findLast(
			({ start }) => Temporal.ZonedDateTime.compare(today, start) >= 0,
		) ?? TREASURE_CANDLES_CONFIGURATIONS[0];

	const result: [string] = [treasureCandleFromConfiguration(today, configuration)];

	const doubleConfiguration = TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.findLast(({ start, end }) =>
		isActive(start, end, today),
	);

	if (doubleConfiguration !== undefined) {
		result.push(treasureCandleFromDoubleConfiguration(today, doubleConfiguration));
	}

	return result;
}
