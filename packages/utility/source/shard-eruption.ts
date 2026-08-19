import { skyDate, TIME_ZONE } from "./dates.js";
import { skyCurrentEvents } from "./events/index.js";
import { realmForArea } from "./kingdom/areas/index.js";
import { AreaName, type RealmName } from "./kingdom/geography.js";
import { CDN_URL } from "./routes.js";
import { EventId } from "./utility/event.js";

function resolveShardEruptionAreaURL(area: AreaName) {
	return `${CDN_URL}/daily_guides/shard_eruptions/${area.toLowerCase().replaceAll(" ", "_")}.webp`;
}

const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 7], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		area: [
			AreaName.ButterflyFields,
			AreaName.ForestBrook,
			AreaName.FrozenLake,
			AreaName.TheOuterBailey,
			AreaName.StarlightDesert,
		].map((area) => ({ area, reward: 200 })),
	},
	{
		noShardWeekDay: [7, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		area: [
			AreaName.TempleOfThePrairie,
			AreaName.Boneyard,
			AreaName.FrozenLake,
			AreaName.TheBattlefield,
			AreaName.StarlightDesert,
		].map((area) => ({ area, reward: 200 })),
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		area: [
			{
				area: AreaName.PrairieCave,
				reward: 2,
			},
			{
				area: AreaName.SacredPond,
				reward: 2.5,
			},
			{
				area: AreaName.VillageOfDreams,
				reward: 2.5,
			},
			{
				area: AreaName.TheGraveyard,
				reward: 2,
			},
			{
				area: AreaName.JellyfishCove,
				reward: 3.5,
			},
		],
	},
	{
		noShardWeekDay: [2, 3], // Tuesday, Wednesday
		interval: 6,
		// 2 hours and 20 minutes.
		offset: 8_400_000,
		area: [
			{
				area: AreaName.BirdNest,
				reward: 2.5,
			},
			{
				area: AreaName.TheTreehouse,
				reward: 3.5,
			},
			{
				area: AreaName.VillageOfDreams,
				reward: 2.5,
			},
			{
				area: AreaName.CrabFields,
				reward: 2.5,
			},
			{
				area: AreaName.JellyfishCove,
				reward: 3.5,
			},
		],
	},
	{
		noShardWeekDay: [3, 4], // Wednesday, Thursday
		interval: 6,
		// 3 hours and 30 minutes.
		offset: 12_600_000,
		area: [
			{
				area: AreaName.SanctuaryIslands,
				reward: 3.5,
			},
			{
				area: AreaName.ElevatedClearing,
				reward: 3.5,
			},
			{
				area: AreaName.HermitValley,
				reward: 3.5,
			},
			{
				area: AreaName.ForgottenArk,
				reward: 3.5,
			},
			{
				area: AreaName.JellyfishCove,
				reward: 3.5,
			},
		],
	},
] as const;

interface ShardEruptionTimestampsData {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
}

export interface ShardEruptionData {
	realm: RealmName;
	area: AreaName;
	strong: boolean;
	reward: number;
	timestamps: readonly ShardEruptionTimestampsData[];
	infographic: {
		url: string;
		acknowledgement: string;
	};
}

export const SHARD_ERUPTION_START_DATE = skyDate(2022, 7, 11);
export const SHARD_ERUPTION_PREDICTION_START_DATE = skyDate(2022, 10, 1);

type ShardEruptionTime = readonly [hour: number, minute: number, second: number];

interface RecordedShardEruptionOptions {
	starts?: readonly ShardEruptionTime[];
}

interface RecordedShardEruptionData {
	area: AreaName;
	reward: number;
	firstStart: ShardEruptionTime;
	starts?: readonly ShardEruptionTime[];
}

const NORMAL_DURATION_SECONDS = 3080 as const;

function recordedShardEruptionData(
	area: AreaName,
	reward: number,
	firstStart: ShardEruptionTime,
	options: RecordedShardEruptionOptions = {},
): RecordedShardEruptionData {
	return {
		area,
		reward,
		firstStart,
		...options,
	};
}

const RECORDED_SHARD_ERUPTIONS = {
	// July 2022.
	"2022-07-11": recordedShardEruptionData(AreaName.ForgottenArk, 3.5, [1, 30, 0]),
	"2022-07-12": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [1, 18, 40]),
	"2022-07-13": recordedShardEruptionData(AreaName.PrairieCave, 2, [1, 14, 40]),
	"2022-07-14": recordedShardEruptionData(AreaName.ForestBrook, 200, [1, 28, 40]),
	"2022-07-15": recordedShardEruptionData(AreaName.VillageOfDreams, 2.5, [1, 14, 40], {
		starts: [
			[1, 14, 40],
			[3, 14, 40],
			[5, 14, 40],
			[7, 14, 40],
			[9, 14, 40],
			[11, 14, 40],
			[13, 14, 40],
			[15, 14, 40],
			[17, 3, 40],
			[19, 3, 40],
			[21, 3, 40],
			[23, 3, 40],
		],
	}),
	"2022-07-16": recordedShardEruptionData(AreaName.CrabFields, 2.5, [1, 5, 40]),
	"2022-07-17": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [0, 52, 40]),
	"2022-07-18": recordedShardEruptionData(AreaName.ButterflyFields, 200, [0, 57, 40]),
	"2022-07-19": recordedShardEruptionData(AreaName.Boneyard, 2.5, [1, 3, 40]),
	"2022-07-20": recordedShardEruptionData(AreaName.HermitValley, 3.5, [0, 52, 40]),
	"2022-07-21": recordedShardEruptionData(AreaName.TheBattlefield, 200, [1, 0, 40]),
	"2022-07-22": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [1, 3, 40]),
	"2022-07-23": recordedShardEruptionData(AreaName.SanctuaryIslands, 3.5, [0, 52, 40]),
	"2022-07-24": recordedShardEruptionData(AreaName.SacredPond, 2.5, [1, 5, 40]),
	"2022-07-25": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 57, 40]),
	"2022-07-26": recordedShardEruptionData(AreaName.TheBattlefield, 200, [1, 0, 40]),
	"2022-07-27": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 57, 40]),
	"2022-07-28": recordedShardEruptionData(AreaName.TempleOfThePrairie, 200, [1, 0, 40]),
	"2022-07-29": recordedShardEruptionData(AreaName.Boneyard, 2.5, [1, 3, 40]),
	"2022-07-30": recordedShardEruptionData(AreaName.HermitValley, 3.5, [0, 52, 40]),
	"2022-07-31": recordedShardEruptionData(AreaName.CrabFields, 2.5, [1, 5, 40]),

	// August 2022.
	"2022-08-01": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 55, 40]),
	"2022-08-02": recordedShardEruptionData(AreaName.PrairieVillage, 200, [0, 41, 40]),
	"2022-08-03": recordedShardEruptionData(AreaName.ForestCourtyard, 200, [0, 55, 40]),
	"2022-08-04": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 41, 40]),
	"2022-08-05": recordedShardEruptionData(AreaName.TheGraveyard, 2, [0, 52, 40]),
	"2022-08-06": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [0, 47, 40]),
	"2022-08-07": recordedShardEruptionData(AreaName.BirdNest, 2.5, [0, 57, 40]),
	"2022-08-08": recordedShardEruptionData(AreaName.ForestCourtyard, 200, [0, 55, 40]),
	"2022-08-09": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 41, 40]),
	"2022-08-10": recordedShardEruptionData(AreaName.TheOuterBailey, 200, [0, 55, 40]),
	"2022-08-11": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 41, 40]),
	"2022-08-12": recordedShardEruptionData(AreaName.PrairieCave, 2, [0, 52, 40]),
	"2022-08-13": recordedShardEruptionData(AreaName.ElevatedClearing, 3.5, [0, 47, 40]),
	"2022-08-14": recordedShardEruptionData(AreaName.VillageOfDreams, 2.5, [0, 57, 40]),
	"2022-08-15": recordedShardEruptionData(AreaName.TheOuterBailey, 200, [0, 55, 40]),
	"2022-08-16": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 41, 40]),
	"2022-08-17": recordedShardEruptionData(AreaName.ButterflyFields, 200, [0, 55, 40]),
	"2022-08-18": recordedShardEruptionData(AreaName.Boneyard, 0, [0, 41, 40]),
	"2022-08-19": recordedShardEruptionData(AreaName.VillageOfDreams, 2.5, [0, 52, 40]),
	"2022-08-20": recordedShardEruptionData(AreaName.ForgottenArk, 3.5, [0, 47, 40]),
	"2022-08-21": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [0, 57, 40]),
	"2022-08-22": recordedShardEruptionData(AreaName.ButterflyFields, 200, [0, 55, 40]),
	"2022-08-23": recordedShardEruptionData(AreaName.TheBattlefield, 200, [0, 41, 40]),
	"2022-08-24": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 55, 40]),
	"2022-08-25": recordedShardEruptionData(AreaName.TheBattlefield, 200, [0, 41, 40]),
	"2022-08-26": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [0, 52, 40]),
	"2022-08-27": recordedShardEruptionData(AreaName.SanctuaryIslands, 3.5, [0, 47, 40]),
	"2022-08-28": recordedShardEruptionData(AreaName.TheTreehouse, 3.5, [0, 57, 40]),
	"2022-08-29": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 55, 40]),
	"2022-08-30": recordedShardEruptionData(AreaName.TheBattlefield, 200, [0, 41, 40]),
	"2022-08-31": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 55, 40]),

	// September 2022.
	"2022-09-01": recordedShardEruptionData(AreaName.TempleOfThePrairie, 200, [0, 58, 40]),
	"2022-09-02": recordedShardEruptionData(AreaName.SacredPond, 2.5, [0, 44, 40]),
	"2022-09-03": recordedShardEruptionData(AreaName.HermitValley, 3.5, [0, 59, 40]),
	"2022-09-04": recordedShardEruptionData(AreaName.CrabFields, 2.5, [1, 4, 40]),
	"2022-09-05": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 59, 40]),
	"2022-09-06": recordedShardEruptionData(AreaName.PrairieVillage, 200, [0, 58, 40]),
	"2022-09-07": recordedShardEruptionData(AreaName.ForestBrook, 200, [0, 59, 40]),
	"2022-09-08": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 58, 40]),
	"2022-09-09": recordedShardEruptionData(AreaName.TheGraveyard, 2, [0, 44, 40]),
	"2022-09-10": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [0, 59, 40]),
	"2022-09-11": recordedShardEruptionData(AreaName.BirdNest, 2.5, [1, 5, 40]),
	"2022-09-12": recordedShardEruptionData(AreaName.ForestBrook, 200, [0, 59, 40]),
	"2022-09-13": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 58, 40]),
	"2022-09-14": recordedShardEruptionData(AreaName.TheOuterBailey, 200, [0, 59, 40]),
	"2022-09-15": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 58, 40]),
	"2022-09-16": recordedShardEruptionData(AreaName.PrairieCave, 2, [0, 44, 40]),
	"2022-09-17": recordedShardEruptionData(AreaName.ElevatedClearing, 0, [0, 59, 40]),
	"2022-09-18": recordedShardEruptionData(AreaName.VillageOfDreams, 2.5, [1, 5, 40]),
	"2022-09-19": recordedShardEruptionData(AreaName.TheOuterBailey, 200, [0, 59, 40]),
	"2022-09-20": recordedShardEruptionData(AreaName.StarlightDesert, 200, [0, 58, 40]),
	"2022-09-21": recordedShardEruptionData(AreaName.ButterflyFields, 200, [0, 59, 40]),
	"2022-09-22": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 58, 40]),
	"2022-09-23": recordedShardEruptionData(AreaName.VillageOfDreams, 2.5, [0, 44, 40]),
	"2022-09-24": recordedShardEruptionData(AreaName.ForgottenArk, 3.5, [0, 59, 40]),
	"2022-09-25": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [1, 5, 40]),
	"2022-09-26": recordedShardEruptionData(AreaName.ButterflyFields, 200, [0, 59, 40]),
	"2022-09-27": recordedShardEruptionData(AreaName.TheBattlefield, 200, [0, 58, 40]),
	"2022-09-28": recordedShardEruptionData(AreaName.FrozenLake, 200, [0, 59, 40]),
	"2022-09-29": recordedShardEruptionData(AreaName.TheBattlefield, 200, [0, 58, 40]),
	"2022-09-30": recordedShardEruptionData(AreaName.JellyfishCove, 3.5, [0, 44, 40]),
} as const satisfies Readonly<Record<string, RecordedShardEruptionData>>;

type RecordedShardEruptionDate = keyof typeof RECORDED_SHARD_ERUPTIONS;

const EXTRA_STRONG_RECORDED_SHARD_ERUPTION_DATES: ReadonlySet<RecordedShardEruptionDate> =
	new Set<RecordedShardEruptionDate>([
		"2022-07-11",
		"2022-07-12",
		"2022-07-13",
		"2022-07-19",
		"2022-07-20",
	]);

function shardEruptionStart(
	date: Temporal.ZonedDateTime,
	[hour, minute, second]: ShardEruptionTime,
) {
	return date.with({ hour, minute, second });
}

function recordedShardEruption(date: Temporal.ZonedDateTime): ShardEruptionData {
	const key = date.toPlainDate().toString() as keyof typeof RECORDED_SHARD_ERUPTIONS;
	const data = RECORDED_SHARD_ERUPTIONS[key];
	const durationSeconds = key === "2022-07-14" ? 5780 : NORMAL_DURATION_SECONDS;

	const starts = data.starts
		? data.starts.map((time) => shardEruptionStart(date, time))
		: Array.from({ length: 12 }, (_, index) =>
				shardEruptionStart(date, data.firstStart).add({ hours: index * 2 }),
			);

	return {
		realm: realmForArea(data.area)!,
		area: data.area,
		strong: date.dayOfWeek >= 5 || EXTRA_STRONG_RECORDED_SHARD_ERUPTION_DATES.has(key),
		reward: data.reward,
		infographic: {
			url: resolveShardEruptionAreaURL(data.area),
			acknowledgement: "Clement",
		},
		timestamps: starts.map((start) => ({
			start,
			end: start.add({ seconds: durationSeconds }),
		})),
	};
}

export function shardEruption(input: Temporal.ZonedDateTime): ShardEruptionData | null {
	const date = input.withTimeZone(TIME_ZONE).startOfDay();

	if (Temporal.ZonedDateTime.compare(date, SHARD_ERUPTION_START_DATE) < 0) {
		throw new RangeError("Shard eruption dates cannot be before 2022-07-11.");
	}

	if (Temporal.ZonedDateTime.compare(date, SHARD_ERUPTION_PREDICTION_START_DATE) < 0) {
		return recordedShardEruption(date);
	}

	// No shard eruption in Jellyfish Cove during Days of Love 2024 and 2025.
	if (
		date.equals(skyDate(2024, 2, 15)) ||
		date.equals(skyDate(2024, 2, 25)) ||
		date.equals(skyDate(2025, 2, 15))
	) {
		return null;
	}

	// No shard eruption in the Forgotten Ark during Days of Bloom 2025.
	if (date.equals(skyDate(2025, 3, 29))) {
		return null;
	}

	// No shard eruption during Days of Nature 2026.
	if (date.equals(skyDate(2026, 4, 11))) {
		return null;
	}

	const dayOfMonth = date.day;
	const dayOfWeek = date.dayOfWeek;
	const strong = dayOfMonth % 2 === 1;
	const infoIndex = strong ? (((dayOfMonth - 1) / 2) % 3) + 2 : (dayOfMonth / 2) % 2;
	const {
		noShardWeekDay,
		interval,
		offset,
		area: shardEruptionAreas,
	} = SHARD_ERUPTION_PREDICTION_DATA[infoIndex]!;
	// @ts-expect-error Too narrow.
	const noShardDay = noShardWeekDay.includes(dayOfWeek);

	if (noShardDay) {
		return null;
	}

	const areaIndex = (dayOfMonth - 1) % 5;
	let { area, reward } = shardEruptionAreas[areaIndex]!;
	const currentEvents = skyCurrentEvents(date);

	// On 13/12/2025, this was moved to the Prairie Cave (clashed with event).
	if (
		area === AreaName.VillageOfDreams &&
		currentEvents.some((event) => event.id === EventId.DaysOfFeast2025)
	) {
		({ area, reward } = shardEruptionAreas[0]!);
	}

	// On 13/02/2026, this was moved to the Graveyard (clashed with event).
	if (
		area === AreaName.VillageOfDreams &&
		currentEvents.some((event) => event.id === EventId.DaysOfFortune2026)
	) {
		({ area, reward } = shardEruptionAreas[3]!);
	}

	// On 15/02/2026, this was moved to The Treehouse (clashed with event).
	if (
		area === AreaName.JellyfishCove &&
		currentEvents.some((event) => event.id === EventId.DaysOfLove2026)
	) {
		({ area, reward } = shardEruptionAreas[1]!);
	}

	// On 26/03/2026, this was moved to the Boneyard (clashed with event).
	if (
		area === AreaName.TempleOfThePrairie &&
		currentEvents.some((event) => event.id === EventId.DaysOfBloom2026)
	) {
		({ area, reward } = shardEruptionAreas[1]!);
	}

	// On 29/03/2026, this was moved to Sanctuary Islands (clashed with event).
	if (
		area === AreaName.ForgottenArk &&
		currentEvents.some((event) => event.id === EventId.DaysOfBloom2026)
	) {
		({ area, reward } = shardEruptionAreas[0]!);
	}

	// This was moved to the Forgotten Ark (clashed with Days of Sunlight 2026).
	if (date.equals(skyDate(2026, 8, 17))) {
		({ area, reward } = shardEruptionAreas[3]!);
	}

	const timestamps: ShardEruptionTimestampsData[] = [];
	let timestampLengthCheck = 3;
	let shardPointer = date.add({ milliseconds: offset });

	// Account for a shard eruption during DST change.
	if (date.offsetNanoseconds !== shardPointer.offsetNanoseconds) {
		const becameDST = shardPointer.offsetNanoseconds > date.offsetNanoseconds;
		shardPointer = shardPointer.add({ hours: becameDST ? -1 : 1 });

		if (
			becameDST &&
			shardPointer.offsetNanoseconds === date.offsetNanoseconds &&
			shardPointer.hour === 1
		) {
			// The shard eruption will be skipped as it seems the hour is most important rather than the duration.
			// This held true for 09/03/2025, where the first shard eruption did not happen as hour 2 was skipped.
			shardPointer = shardPointer.add({ hours: interval });
			timestampLengthCheck--;
		}
	}

	for (
		;
		timestamps.length < timestampLengthCheck;
		shardPointer = shardPointer.add({ hours: interval })
	) {
		timestamps.push({
			start: shardPointer.add({ seconds: 520 }),
			end: shardPointer.add({ hours: 4 }),
		});
	}

	return {
		realm: realmForArea(area)!,
		area,
		strong,
		reward,
		timestamps,
		infographic: {
			url: resolveShardEruptionAreaURL(area),
			acknowledgement: "Clement",
		},
	};
}
