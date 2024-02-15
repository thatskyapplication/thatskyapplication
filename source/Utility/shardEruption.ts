import { URL } from "node:url";
import { hyperlink, TimestampStyles, type Locale, time } from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { type Realm, CDN_URL, Map, VALID_REALM } from "./Constants.js";
import { todayDate } from "./dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji, resolveCurrencyEmoji } from "./emojis.js";

export const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 7], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		area: [Map.ButterflyFields, Map.ForestBrook, Map.IceRink, Map.BrokenTemple, Map.StarlightDesert].map((map) => ({
			map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [7, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		area: [Map.KoiPond, Map.Boneyard, Map.IceRink, Map.Battlefield, Map.StarlightDesert].map((map) => ({
			map,
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
			{ map: Map.Cave, url: resolveShardEruptionMapURL(Map.Cave), reward: 2 },
			{ map: Map.ForestEnd, url: resolveShardEruptionMapURL(Map.ForestEnd), reward: 2.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.Graveyard, url: resolveShardEruptionMapURL(Map.Graveyard), reward: 2 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [2, 3], // Tuesday, Wednesday
		interval: 6,
		// 2 hours and 20 minutes.
		offset: 8_400_000,
		area: [
			{ map: Map.BirdNest, url: resolveShardEruptionMapURL(Map.BirdNest), reward: 2.5 },
			{ map: Map.Treehouse, url: resolveShardEruptionMapURL(Map.Treehouse), reward: 3.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.CrabFields, url: resolveShardEruptionMapURL(Map.CrabFields), reward: 2.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [3, 4], // Wednesday, Thursday
		interval: 6,
		// 3 hours and 30 minutes.
		offset: 12_600_000,
		area: [
			{ map: Map.SanctuaryIslands, url: resolveShardEruptionMapURL(Map.SanctuaryIslands), reward: 3.5 },
			{ map: Map.ElevatedClearing, url: resolveShardEruptionMapURL(Map.ElevatedClearing), reward: 3.5 },
			{ map: Map.HermitValley, url: resolveShardEruptionMapURL(Map.HermitValley), reward: 3.5 },
			{ map: Map.ForgottenArk, url: resolveShardEruptionMapURL(Map.ForgottenArk), reward: 3.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
] as const;

interface ShardEruptionTimestampsData {
	start: DateTime;
	end: DateTime;
}

export interface ShardEruptionData {
	realm: Realm;
	map: Map;
	strong: boolean;
	reward: number;
	timestamps: ShardEruptionTimestampsData[];
	url: URL;
}

export function shardEruption(daysOffset = 0): ShardEruptionData | null {
	const date = todayDate().plus({ day: daysOffset });
	const dayOfMonth = date.day;
	const dayOfWeek = date.weekday;
	const strong = dayOfMonth % 2 === 1;
	const infoIndex = strong ? (((dayOfMonth - 1) / 2) % 3) + 2 : (dayOfMonth / 2) % 2;
	const { noShardWeekDay, interval, offset, area } = SHARD_ERUPTION_PREDICTION_DATA[infoIndex]!;
	// @ts-expect-error Too narrow.
	const noShardDay = noShardWeekDay.includes(dayOfWeek);
	if (noShardDay) return null;
	const realmIndex = (dayOfMonth - 1) % 5;
	const { map, url, reward } = area[realmIndex]!;
	const timestamps = [];

	for (
		let startTime = date.plus({ millisecond: offset });
		timestamps.length < 3;
		startTime = startTime.plus({ millisecond: interval * 3_600_000 })
	) {
		timestamps.push({ start: startTime.plus({ second: 520 }), end: startTime.plus({ hour: 4 }) });
	}

	return { realm: VALID_REALM[realmIndex]!, map, strong, reward, timestamps, url };
}

export function resolveShardEruptionMapURL(map: Map) {
	return new URL(`daily_guides/shard_eruptions/${map.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL);
}

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, map, strong, reward, url }: ShardEruptionData,
	useHyperlink: boolean,
	locale: Locale,
) {
	let realmMap = `${t(`realms.${realm}`, { lng: locale, ns: "general" })} (${t(`maps.${map}`, {
		lng: locale,
		ns: "general",
	})})`;

	if (useHyperlink) realmMap = hyperlink(realmMap, url);

	return `${formatEmoji(resolveShardEruptionEmoji(strong))} ${realmMap}\n${
		reward === 200
			? `200 ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}`
			: resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.AscendedCandle, number: reward })
	}`;
}

export function shardEruptionTimestampsString({ timestamps }: ShardEruptionData) {
	return timestamps
		.map(
			({ start, end }) =>
				`${time(start.toUnixInteger(), TimestampStyles.LongTime)} - ${time(
					end.toUnixInteger(),
					TimestampStyles.LongTime,
				)}`,
		)
		.join("\n");
}
