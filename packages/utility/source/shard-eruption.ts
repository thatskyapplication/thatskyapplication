import type { DateTime } from "luxon";
import { skyDate, skyToday } from "./dates.js";
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
			},
			{
				area: AreaName.SacredPond,
				url: resolveShardEruptionAreaURL(AreaName.SacredPond),
				reward: 2.5,
			},
			{
				area: AreaName.VillageOfDreams,
				url: resolveShardEruptionAreaURL(AreaName.VillageOfDreams),
				reward: 2.5,
			},
			{
				area: AreaName.TheGraveyard,
				url: resolveShardEruptionAreaURL(AreaName.TheGraveyard),
				reward: 2,
			},
			{
				area: AreaName.JellyfishCove,
				url: resolveShardEruptionAreaURL(AreaName.JellyfishCove),
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
			{ area: AreaName.BirdNest, url: resolveShardEruptionAreaURL(AreaName.BirdNest), reward: 2.5 },
			{
				area: AreaName.TheTreehouse,
				url: resolveShardEruptionAreaURL(AreaName.TheTreehouse),
				reward: 3.5,
			},
			{
				area: AreaName.VillageOfDreams,
				url: resolveShardEruptionAreaURL(AreaName.VillageOfDreams),
				reward: 2.5,
			},
			{
				area: AreaName.CrabFields,
				url: resolveShardEruptionAreaURL(AreaName.CrabFields),
				reward: 2.5,
			},
			{
				area: AreaName.JellyfishCove,
				url: resolveShardEruptionAreaURL(AreaName.JellyfishCove),
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
				url: resolveShardEruptionAreaURL(AreaName.SanctuaryIslands),
				reward: 3.5,
			},
			{
				area: AreaName.ElevatedClearing,
				url: resolveShardEruptionAreaURL(AreaName.ElevatedClearing),
				reward: 3.5,
			},
			{
				area: AreaName.HermitValley,
				url: resolveShardEruptionAreaURL(AreaName.HermitValley),
				reward: 3.5,
			},
			{
				area: AreaName.ForgottenArk,
				url: resolveShardEruptionAreaURL(AreaName.ForgottenArk),
				reward: 3.5,
			},
			{
				area: AreaName.JellyfishCove,
				url: resolveShardEruptionAreaURL(AreaName.JellyfishCove),
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
	area: AreaName;
	strong: boolean;
	reward: number;
	timestamps: readonly ShardEruptionTimestampsData[];
	url: string;
}

export function shardEruption(daysOffset = 0): ShardEruptionData | null {
	const date = skyToday().plus({ day: daysOffset });

	// No shard eruption during Days of Nature.
	if (date.equals(skyDate(2026, 4, 11))) {
		return null;
	}

	const dayOfMonth = date.day;
	const dayOfWeek = date.weekday;
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
	let { area, url, reward } = shardEruptionAreas[realmIndex]!;
	const currentEvents = skyCurrentEvents(date);

	// No shard eruption in Jellyfish Cove during Days of Love.
	if (
		area === AreaName.JellyfishCove &&
		currentEvents.some(
			(event) => event.id === EventId.DaysOfLove2024 || event.id === EventId.DaysOfLove2025,
		)
	) {
		return null;
	}

	// No shard eruption in the Forgotten Ark during Days of Bloom.
	if (
		area === AreaName.ForgottenArk &&
		currentEvents.some((event) => event.id === EventId.DaysOfBloom2025)
	) {
		return null;
	}

	// On 13/12/2025, this was moved to the Prairie Cave (clashed with event).
	if (
		area === AreaName.VillageOfDreams &&
		currentEvents.some((event) => event.id === EventId.DaysOfFeast2025)
	) {
		realmIndex = 0;
		({ area, url, reward } = shardEruptionAreas[realmIndex]!);
	}

	// On 13/02/2026, this was moved to the Graveyard (clashed with event).
	if (
		area === AreaName.VillageOfDreams &&
		currentEvents.some((event) => event.id === EventId.DaysOfFortune2026)
	) {
		realmIndex = 3;
		({ area, url, reward } = shardEruptionAreas[realmIndex]!);
	}

	// On 15/02/2026, this was moved to The Treehouse (clashed with event).
	if (
		area === AreaName.JellyfishCove &&
		currentEvents.some((event) => event.id === EventId.DaysOfLove2026)
	) {
		realmIndex = 1;
		({ area, url, reward } = shardEruptionAreas[realmIndex]!);
	}

	// On 26/03/2026, this was moved to the Boneyard (clashed with event).
	if (
		area === AreaName.TempleOfThePrairie &&
		currentEvents.some((event) => event.id === EventId.DaysOfBloom2026)
	) {
		realmIndex = 1;
		({ area, url, reward } = shardEruptionAreas[realmIndex]!);
	}

	// On 29/03/2026, this was moved to the Forgotten Ark (clashed with event).
	if (
		area === AreaName.ForgottenArk &&
		currentEvents.some((event) => event.id === EventId.DaysOfBloom2026)
	) {
		realmIndex = 0;
		({ area, url, reward } = shardEruptionAreas[realmIndex]!);
	}

	const timestamps: ShardEruptionTimestampsData[] = [];
	let timestampLengthCheck = 3;
	let shardPointer = date.plus({ milliseconds: offset });

	// Account for a shard eruption during DST change.
	if (date.isInDST !== shardPointer.isInDST) {
		const becameDST = shardPointer.isInDST;
		shardPointer = shardPointer.plus({ hours: shardPointer.isInDST ? -1 : 1 });

		if (becameDST && !shardPointer.isInDST && shardPointer.hour === 1) {
			// The shard eruption will be skipped as it seems the hour is most important rather than the duration.
			// This held true for 09/03/2025, where the first shard eruption did not happen as hour 2 was skipped.
			shardPointer = shardPointer.plus({ hours: interval });
			timestampLengthCheck--;
		}
	}

	for (
		;
		timestamps.length < timestampLengthCheck;
		shardPointer = shardPointer.plus({ hours: interval })
	) {
		timestamps.push({
			start: shardPointer.plus({ seconds: 520 }),
			end: shardPointer.plus({ hours: 4 }),
		});
	}

	return { realm: VALID_REALM_NAME[realmIndex]!, area, strong, reward, timestamps, url };
}
