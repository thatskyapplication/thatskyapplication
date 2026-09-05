import { isActive, skyDate, TIME_ZONE } from "../dates.js";
import { CDN_URL } from "../routes.js";
import { snakeCaseName } from "../utility/functions.js";
import { RealmName, VALID_REALM_NAME, type ValidRealmName } from "./geography.js";

type TreasureCandlesRotation = Readonly<{
	[RealmName.DaylightPrairie]: readonly [1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3];
	[RealmName.HiddenForest]: readonly [1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3];
	[RealmName.ValleyOfTriumph]: readonly [1 | 2, 1 | 2];
	[RealmName.GoldenWasteland]: readonly [1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3];
	[RealmName.VaultOfKnowledge]: readonly [1 | 2, 1 | 2];
}>;

/**
 * First observed date.
 */
const TREASURE_CANDLES_INITIAL_SEEK = skyDate(2025, 1, 1).toPlainDate();

interface TreasureCandlesConfiguration {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
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

const TREASURE_CANDLES_ROTATION = {
	[RealmName.DaylightPrairie]: [1, 3, 2],
	[RealmName.HiddenForest]: [2, 1, 3],
	[RealmName.ValleyOfTriumph]: [2, 1],
	[RealmName.GoldenWasteland]: [2, 1, 3],
	[RealmName.VaultOfKnowledge]: [1, 2],
} as const satisfies TreasureCandlesRotation;

const TREASURE_CANDLES_CONFIGURATIONS = [
	{
		start: skyDate(2025, 1, 1),
		end: skyDate(2025, 2, 1),
		// Historical Golden Wasteland exception.
		rotation: { ...TREASURE_CANDLES_ROTATION, [RealmName.GoldenWasteland]: [2, 3, 1] },
	},
	{
		start: skyDate(2025, 4, 1),
		end: skyDate(2025, 6, 1),
		// Historical Golden Wasteland exception.
		rotation: { ...TREASURE_CANDLES_ROTATION, [RealmName.GoldenWasteland]: [1, 3, 2] },
	},
] as const satisfies readonly TreasureCandlesConfiguration[];

/**
 * Default configuration for double treasure candles. Individual events can use different orders.
 *
 * @remarks Events before the observed 2025 are unverified.
 */
const TREASURE_CANDLES_DOUBLE_ROTATION = {
	[RealmName.DaylightPrairie]: [3, 2, 1],
	[RealmName.HiddenForest]: [1, 3, 2],
	[RealmName.ValleyOfTriumph]: [1, 2],
	[RealmName.GoldenWasteland]: [1, 3, 2],
	[RealmName.VaultOfKnowledge]: [2, 1],
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
		rotation: { ...TREASURE_CANDLES_DOUBLE_ROTATION, [RealmName.DaylightPrairie]: [3, 1, 2] },
	},
	{
		start: skyDate(2025, 4, 7),
		end: skyDate(2025, 4, 21),
		rotation: {
			...TREASURE_CANDLES_DOUBLE_ROTATION,
			[RealmName.DaylightPrairie]: [2, 1, 3],
			[RealmName.HiddenForest]: [3, 2, 1],
			[RealmName.GoldenWasteland]: [3, 2, 1],
		},
	},
	{
		start: skyDate(2025, 6, 9),
		end: skyDate(2025, 6, 23),
		rotation: {
			...TREASURE_CANDLES_DOUBLE_ROTATION,
			[RealmName.DaylightPrairie]: [2, 1, 3],
			[RealmName.GoldenWasteland]: [3, 2, 1],
		},
	},
	{
		start: skyDate(2025, 8, 19),
		end: skyDate(2025, 9, 2),
		rotation: {
			...TREASURE_CANDLES_DOUBLE_ROTATION,
			[RealmName.HiddenForest]: [3, 2, 1],
			[RealmName.GoldenWasteland]: [3, 2, 1],
		},
	},
	{
		start: skyDate(2025, 9, 22),
		end: skyDate(2025, 9, 29),
		rotation: {
			...TREASURE_CANDLES_DOUBLE_ROTATION,
			[RealmName.DaylightPrairie]: [2, 1, 3],
			[RealmName.GoldenWasteland]: [3, 2, 1],
		},
	},
	{
		start: skyDate(2025, 11, 17),
		end: skyDate(2025, 12, 1),
		rotation: { ...TREASURE_CANDLES_DOUBLE_ROTATION, [RealmName.GoldenWasteland]: [3, 2, 1] },
	},
	{
		start: skyDate(2025, 12, 31),
		end: skyDate(2026, 1, 16),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2026, 2, 27),
		end: skyDate(2026, 3, 13),
		rotation: {
			...TREASURE_CANDLES_DOUBLE_ROTATION,
			[RealmName.DaylightPrairie]: [3, 1, 2],
			[RealmName.HiddenForest]: [3, 2, 1],
		},
		rotationOverrides: [
			{
				start: skyDate(2026, 3, 4),
				end: skyDate(2026, 3, 5),
				rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
			},
		],
	},
	{
		start: skyDate(2026, 6, 19),
		end: skyDate(2026, 7, 3),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2026, 9, 1),
		end: skyDate(2026, 9, 2),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2026, 9, 11),
		end: skyDate(2026, 9, 25),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
] as const satisfies readonly TreasureCandlesDoubleConfiguration[];

function treasureCandleURL(realmName: ValidRealmName, index: number) {
	return String(
		new URL(`daily_guides/treasure_candles/${snakeCaseName(realmName)}/${index}.webp`, CDN_URL),
	);
}

function treasureCandleFromRotation(
	today: Temporal.ZonedDateTime,
	rotation: TreasureCandlesRotation,
) {
	const daysDiff = today.toPlainDate().since(TREASURE_CANDLES_INITIAL_SEEK).days;
	const realmIndex =
		(daysDiff + VALID_REALM_NAME.indexOf(RealmName.VaultOfKnowledge)) % VALID_REALM_NAME.length;
	const realmName = VALID_REALM_NAME.at(realmIndex)!;
	const realmRotation = rotation[realmName];

	// Each realm starts its sequence again on the first of each month.
	const rotationIndex = Math.floor((today.day - 1) / VALID_REALM_NAME.length);
	return treasureCandleURL(realmName, realmRotation.at(rotationIndex % realmRotation.length)!);
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
	const date = today.withTimeZone(TIME_ZONE);

	if (date.year === 2025 && date.month === 3 && date.day === 21) {
		// 3 were available on this date.
		return [
			treasureCandleURL(RealmName.GoldenWasteland, 1),
			treasureCandleURL(RealmName.GoldenWasteland, 2),
			treasureCandleURL(RealmName.GoldenWasteland, 3),
		];
	}

	const rotation =
		TREASURE_CANDLES_CONFIGURATIONS.findLast(({ start, end }) => isActive(start, end, date))
			?.rotation ?? TREASURE_CANDLES_ROTATION;

	const result: [string] = [treasureCandleFromRotation(date, rotation)];

	const doubleConfiguration = TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.findLast(({ start, end }) =>
		isActive(start, end, date),
	);

	if (doubleConfiguration !== undefined) {
		result.push(treasureCandleFromDoubleConfiguration(date, doubleConfiguration));
	}

	return result;
}
