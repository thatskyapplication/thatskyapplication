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

const TREASURE_CANDLES_REALM_ANCHORS = [
	{
		start: skyDate(2024, 1, 1).toPlainDate(),
		realm: RealmName.VaultOfKnowledge,
	},
	{
		// Daylight Prairie appeared on both 30 June 2024 and 1 July 2024.
		start: skyDate(2024, 7, 1).toPlainDate(),
		realm: RealmName.DaylightPrairie,
	},
] as const;

interface TreasureCandlesConfiguration {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	rotation: TreasureCandlesRotation;
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
	// Eight treasure candles in each realm (40 total). Handled by an override.
	// Source: https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1308-patch-notes---april-10-2024---0-25-0-257483-android-huawei-256148-ios-playstation-257607-pc-255731-switch
	{
		start: skyDate(2024, 4, 10),
		end: skyDate(2024, 4, 17),
		rotation: TREASURE_CANDLES_DOUBLE_ROTATION,
	},
	{
		start: skyDate(2024, 9, 9),
		end: skyDate(2024, 9, 30),
		rotation: {
			...TREASURE_CANDLES_DOUBLE_ROTATION,
			[RealmName.DaylightPrairie]: [2, 1, 3],
			[RealmName.HiddenForest]: [3, 2, 1],
		},
	},
	{
		start: skyDate(2024, 12, 9),
		end: skyDate(2024, 12, 23),
		rotation: {
			...TREASURE_CANDLES_DOUBLE_ROTATION,
			[RealmName.DaylightPrairie]: [2, 1, 3],
			[RealmName.HiddenForest]: [3, 2, 1],
		},
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
			[RealmName.HiddenForest]: [1, 2, 1],
		},
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
] as const satisfies readonly TreasureCandlesConfiguration[];

function treasureCandleURL(realmName: ValidRealmName, index: number) {
	return String(
		new URL(`daily_guides/treasure_candles/${snakeCaseName(realmName)}/${index}.webp`, CDN_URL),
	);
}

/**
 * @see {@link https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1308-patch-notes---april-10-2024---0-25-0-257483-android-huawei-256148-ios-playstation-257607-pc-255731-switch}
 */
const TREASURE_CANDLES_BONANZA = [
	treasureCandleURL(RealmName.DaylightPrairie, 1),
	treasureCandleURL(RealmName.DaylightPrairie, 2),
	treasureCandleURL(RealmName.HiddenForest, 1),
	treasureCandleURL(RealmName.HiddenForest, 3),
	treasureCandleURL(RealmName.ValleyOfTriumph, 1),
	treasureCandleURL(RealmName.ValleyOfTriumph, 2),
	treasureCandleURL(RealmName.GoldenWasteland, 1),
	treasureCandleURL(RealmName.GoldenWasteland, 3),
	treasureCandleURL(RealmName.VaultOfKnowledge, 1),
	treasureCandleURL(RealmName.VaultOfKnowledge, 2),
] as const satisfies readonly string[];

function treasureCandleFromRotation(
	today: Temporal.ZonedDateTime,
	rotation: TreasureCandlesRotation,
) {
	const date = today.toPlainDate();
	const anchor =
		TREASURE_CANDLES_REALM_ANCHORS.findLast(
			({ start }) => Temporal.PlainDate.compare(date, start) >= 0,
		) ?? TREASURE_CANDLES_REALM_ANCHORS[0];
	const daysDiff = date.since(anchor.start).days;
	const realmIndex = (daysDiff + VALID_REALM_NAME.indexOf(anchor.realm)) % VALID_REALM_NAME.length;
	const realmName = VALID_REALM_NAME.at(realmIndex)!;
	const realmRotation = rotation[realmName];

	// Each realm starts its sequence again on the first of each month.
	const rotationIndex = Math.floor((today.day - 1) / VALID_REALM_NAME.length);
	return treasureCandleURL(realmName, realmRotation.at(rotationIndex % realmRotation.length)!);
}

export function treasureCandles(today: Temporal.ZonedDateTime): readonly [string, ...string[]] {
	const date = today.withTimeZone(TIME_ZONE);

	const rotation =
		TREASURE_CANDLES_CONFIGURATIONS.findLast(({ start, end }) => isActive(start, end, date))
			?.rotation ?? TREASURE_CANDLES_ROTATION;

	const result: [string] = [treasureCandleFromRotation(date, rotation)];

	if (date.year === 2024 && date.month === 4 && date.day >= 10 && date.day < 17) {
		// From 10 to 16 April 2024, 2 layouts per realm were available.
		return [result[0], ...TREASURE_CANDLES_BONANZA.filter((url) => url !== result[0])];
	}

	if (date.year === 2024 && date.month === 10 && date.day === 2) {
		// Valley of Triumph layout 2 was also available on 2 October 2024.
		return [result[0], treasureCandleURL(RealmName.ValleyOfTriumph, 2)];
	}

	if (date.year === 2025 && date.month === 3 && date.day === 21) {
		// All 3 layouts were available on 21 March 2025.
		return [
			result[0],
			treasureCandleURL(RealmName.GoldenWasteland, 2),
			treasureCandleURL(RealmName.GoldenWasteland, 3),
		];
	}

	const doubleConfiguration = TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.findLast(({ start, end }) =>
		isActive(start, end, date),
	);

	if (doubleConfiguration !== undefined) {
		result.push(treasureCandleFromRotation(date, doubleConfiguration.rotation));
	}

	return result;
}
