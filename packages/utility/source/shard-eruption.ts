import type { DateTime } from "luxon";
import { CDN_URL } from "./cdn.js";
import { skyToday } from "./dates.js";
import { type RealmName, SkyMap, VALID_REALM_NAME } from "./kingdom.js";

function resolveShardEruptionMapURL(skyMap: SkyMap) {
	return `${CDN_URL}/daily_guides/shard_eruptions/${skyMap.toLowerCase().replaceAll(" ", "_")}.webp`;
}

const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 7], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		area: [
			SkyMap.ButterflyFields,
			SkyMap.ForestBrook,
			SkyMap.IceRink,
			SkyMap.BrokenTemple,
			SkyMap.StarlightDesert,
		].map((map) => ({
			skyMap: map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [7, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		area: [
			SkyMap.KoiPond,
			SkyMap.Boneyard,
			SkyMap.IceRink,
			SkyMap.Battlefield,
			SkyMap.StarlightDesert,
		].map((map) => ({
			skyMap: map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		area: [
			{ skyMap: SkyMap.Cave, url: resolveShardEruptionMapURL(SkyMap.Cave), reward: 2 },
			{ skyMap: SkyMap.ForestEnd, url: resolveShardEruptionMapURL(SkyMap.ForestEnd), reward: 2.5 },
			{
				skyMap: SkyMap.VillageOfDreams,
				url: resolveShardEruptionMapURL(SkyMap.VillageOfDreams),
				reward: 2.5,
			},
			{ skyMap: SkyMap.Graveyard, url: resolveShardEruptionMapURL(SkyMap.Graveyard), reward: 2 },
			{
				skyMap: SkyMap.JellyfishCove,
				url: resolveShardEruptionMapURL(SkyMap.JellyfishCove),
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
			{ skyMap: SkyMap.BirdNest, url: resolveShardEruptionMapURL(SkyMap.BirdNest), reward: 2.5 },
			{ skyMap: SkyMap.Treehouse, url: resolveShardEruptionMapURL(SkyMap.Treehouse), reward: 3.5 },
			{
				skyMap: SkyMap.VillageOfDreams,
				url: resolveShardEruptionMapURL(SkyMap.VillageOfDreams),
				reward: 2.5,
			},
			{
				skyMap: SkyMap.CrabFields,
				url: resolveShardEruptionMapURL(SkyMap.CrabFields),
				reward: 2.5,
			},
			{
				skyMap: SkyMap.JellyfishCove,
				url: resolveShardEruptionMapURL(SkyMap.JellyfishCove),
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
				skyMap: SkyMap.SanctuaryIslands,
				url: resolveShardEruptionMapURL(SkyMap.SanctuaryIslands),
				reward: 3.5,
			},
			{
				skyMap: SkyMap.ElevatedClearing,
				url: resolveShardEruptionMapURL(SkyMap.ElevatedClearing),
				reward: 3.5,
			},
			{
				skyMap: SkyMap.HermitValley,
				url: resolveShardEruptionMapURL(SkyMap.HermitValley),
				reward: 3.5,
			},
			{
				skyMap: SkyMap.ForgottenArk,
				url: resolveShardEruptionMapURL(SkyMap.ForgottenArk),
				reward: 3.5,
			},
			{
				skyMap: SkyMap.JellyfishCove,
				url: resolveShardEruptionMapURL(SkyMap.JellyfishCove),
				reward: 3.5,
			},
		],
	},
] as const;

interface ShardEruptionTimestampsData {
	start: DateTime;
	end: DateTime;
}

export interface ShardEruptionData {
	realm: RealmName;
	skyMap: SkyMap;
	strong: boolean;
	reward: number;
	timestamps: ShardEruptionTimestampsData[];
	url: string;
}

export function shardEruption(daysOffset = 0): ShardEruptionData | null {
	const date = skyToday().plus({ day: daysOffset });
	const dayOfMonth = date.day;
	const dayOfWeek = date.weekday;
	const strong = dayOfMonth % 2 === 1;
	const infoIndex = strong ? (((dayOfMonth - 1) / 2) % 3) + 2 : (dayOfMonth / 2) % 2;
	const { noShardWeekDay, interval, offset, area } = SHARD_ERUPTION_PREDICTION_DATA[infoIndex]!;
	// @ts-expect-error Too narrow.
	const noShardDay = noShardWeekDay.includes(dayOfWeek);

	if (noShardDay) {
		return null;
	}

	const realmIndex = (dayOfMonth - 1) % 5;
	const { skyMap, url, reward } = area[realmIndex]!;

	// No shard eruption in Jellyfish Cove during Days of Love.
	if (
		date.year === 2025 &&
		date.month === 2 &&
		dayOfMonth === 15 &&
		skyMap === SkyMap.JellyfishCove
	) {
		return null;
	}

	const timestamps: ShardEruptionTimestampsData[] = [];

	for (
		let startTime = date.plus({ milliseconds: offset });
		timestamps.length < 3;
		startTime = startTime.plus({ hours: interval })
	) {
		timestamps.push({ start: startTime.plus({ seconds: 520 }), end: startTime.plus({ hours: 4 }) });
	}

	return { realm: VALID_REALM_NAME[realmIndex]!, skyMap, strong, reward, timestamps, url };
}
