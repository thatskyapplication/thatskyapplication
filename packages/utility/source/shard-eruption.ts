import { skyDate, TIME_ZONE } from "./dates.js";
import { skyCurrentEvents } from "./events/index.js";
import { AreaName, type RealmName, VALID_REALM_NAME } from "./kingdom/geography.js";
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
		].map((map) => ({
			area: map,
			url: resolveShardEruptionAreaURL(map),
			reward: 200,
			acknowledgement: "Clement",
		})),
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
		].map((map) => ({
			area: map,
			url: resolveShardEruptionAreaURL(map),
			reward: 200,
			acknowledgement: "Clement",
		})),
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		area: [
			{
				area: AreaName.PrairieCave,
				url: resolveShardEruptionAreaURL(AreaName.PrairieCave),
				reward: 2,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.SacredPond,
				url: resolveShardEruptionAreaURL(AreaName.SacredPond),
				reward: 2.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.VillageOfDreams,
				url: resolveShardEruptionAreaURL(AreaName.VillageOfDreams),
				reward: 2.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.TheGraveyard,
				url: resolveShardEruptionAreaURL(AreaName.TheGraveyard),
				reward: 2,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.JellyfishCove,
				url: resolveShardEruptionAreaURL(AreaName.JellyfishCove),
				reward: 3.5,
				acknowledgement: "Clement",
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
				url: resolveShardEruptionAreaURL(AreaName.BirdNest),
				reward: 2.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.TheTreehouse,
				url: resolveShardEruptionAreaURL(AreaName.TheTreehouse),
				reward: 3.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.VillageOfDreams,
				url: resolveShardEruptionAreaURL(AreaName.VillageOfDreams),
				reward: 2.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.CrabFields,
				url: resolveShardEruptionAreaURL(AreaName.CrabFields),
				reward: 2.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.JellyfishCove,
				url: resolveShardEruptionAreaURL(AreaName.JellyfishCove),
				reward: 3.5,
				acknowledgement: "Clement",
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
				url: resolveShardEruptionAreaURL(AreaName.SanctuaryIslands),
				reward: 3.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.ElevatedClearing,
				url: resolveShardEruptionAreaURL(AreaName.ElevatedClearing),
				reward: 3.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.HermitValley,
				url: resolveShardEruptionAreaURL(AreaName.HermitValley),
				reward: 3.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.ForgottenArk,
				url: resolveShardEruptionAreaURL(AreaName.ForgottenArk),
				reward: 3.5,
				acknowledgement: "Clement",
			},
			{
				area: AreaName.JellyfishCove,
				url: resolveShardEruptionAreaURL(AreaName.JellyfishCove),
				reward: 3.5,
				acknowledgement: "Clement",
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
	url: string;
	acknowledgement: string;
}

export const SHARD_ERUPTION_START_DATE = skyDate(2022, 7, 11);
export const SHARD_ERUPTION_PREDICTION_START_DATE = skyDate(2022, 10, 1);
export type ShardEruptionResult = ShardEruptionData | null | undefined;

export function shardEruption(input: Temporal.ZonedDateTime): ShardEruptionResult {
	const date = input.withTimeZone(TIME_ZONE).startOfDay();

	if (Temporal.ZonedDateTime.compare(date, SHARD_ERUPTION_START_DATE) < 0) {
		throw new RangeError("Shard eruption dates cannot be before 2022-07-11.");
	}

	if (Temporal.ZonedDateTime.compare(date, SHARD_ERUPTION_PREDICTION_START_DATE) < 0) {
		return undefined;
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

	let realmIndex = (dayOfMonth - 1) % 5;
	let { area, url, reward, acknowledgement } = shardEruptionAreas[realmIndex]!;
	const currentEvents = skyCurrentEvents(date);

	// On 13/12/2025, this was moved to the Prairie Cave (clashed with event).
	if (
		area === AreaName.VillageOfDreams &&
		currentEvents.some((event) => event.id === EventId.DaysOfFeast2025)
	) {
		realmIndex = 0;
		({ area, url, reward, acknowledgement } = shardEruptionAreas[realmIndex]!);
	}

	// On 13/02/2026, this was moved to the Graveyard (clashed with event).
	if (
		area === AreaName.VillageOfDreams &&
		currentEvents.some((event) => event.id === EventId.DaysOfFortune2026)
	) {
		realmIndex = 3;
		({ area, url, reward, acknowledgement } = shardEruptionAreas[realmIndex]!);
	}

	// On 15/02/2026, this was moved to The Treehouse (clashed with event).
	if (
		area === AreaName.JellyfishCove &&
		currentEvents.some((event) => event.id === EventId.DaysOfLove2026)
	) {
		realmIndex = 1;
		({ area, url, reward, acknowledgement } = shardEruptionAreas[realmIndex]!);
	}

	// On 26/03/2026, this was moved to the Boneyard (clashed with event).
	if (
		area === AreaName.TempleOfThePrairie &&
		currentEvents.some((event) => event.id === EventId.DaysOfBloom2026)
	) {
		realmIndex = 1;
		({ area, url, reward, acknowledgement } = shardEruptionAreas[realmIndex]!);
	}

	// On 29/03/2026, this was moved to Sanctuary Islands (clashed with event).
	if (
		area === AreaName.ForgottenArk &&
		currentEvents.some((event) => event.id === EventId.DaysOfBloom2026)
	) {
		realmIndex = 0;
		({ area, url, reward, acknowledgement } = shardEruptionAreas[realmIndex]!);
	}

	// This was moved to the Forgotten Ark (clashed with Days of Sunlight 2026).
	if (date.equals(skyDate(2026, 8, 17))) {
		realmIndex = 3;
		({ area, url, reward, acknowledgement } = shardEruptionAreas[realmIndex]!);
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
		realm: VALID_REALM_NAME[realmIndex]!,
		area,
		strong,
		reward,
		timestamps,
		url,
		acknowledgement,
	};
}
