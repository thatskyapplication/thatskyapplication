import { URL } from "node:url";
import { type Locale, TimestampStyles, hyperlink, time } from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { skyCurrentEvents } from "../data/events/index.js";
import { EventId } from "./catalogue.js";
import { CDN_URL, type RealmName, SkyMap, VALID_REALM_NAME } from "./constants.js";
import { skyToday } from "./dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji, resolveCurrencyEmoji } from "./emojis.js";

export const SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS = [
	"SHARD_ERUPTION_BROWSE_1_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_2_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_3_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_4_SELECT_MENU_CUSTOM_ID",
] as const;

export const SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH =
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.length;

export const MAXIMUM_OPTION_NUMBER = 25 as const;

function resolveShardEruptionMapURL(skyMap: SkyMap) {
	return new URL(
		`daily_guides/shard_eruptions/${skyMap.toLowerCase().replaceAll(" ", "_")}.webp`,
		CDN_URL,
	);
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

interface ShardEruptionData {
	realm: RealmName;
	skyMap: SkyMap;
	strong: boolean;
	reward: number;
	timestamps: ShardEruptionTimestampsData[];
	url: URL;
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

	// https://x.com/whirthun/status/1758229071216152597
	if (
		skyMap === SkyMap.JellyfishCove &&
		skyCurrentEvents(date).some((event) => event.id === EventId.DaysOfLove2024)
	) {
		return null;
	}

	const timestamps = [];

	for (
		let startTime = date.plus({ millisecond: offset });
		timestamps.length < 3;
		startTime = startTime.plus({ millisecond: interval * 3_600_000 })
	) {
		timestamps.push({ start: startTime.plus({ second: 520 }), end: startTime.plus({ hour: 4 }) });
	}

	return { realm: VALID_REALM_NAME[realmIndex]!, skyMap, strong, reward, timestamps, url };
}

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, skyMap, strong, reward, url }: ShardEruptionData,
	useHyperlink: boolean,
	locale: Locale,
) {
	let realmMap = `${t(`realms.${realm}`, { lng: locale, ns: "general" })} (${t(`maps.${skyMap}`, {
		lng: locale,
		ns: "general",
	})})`;

	if (useHyperlink) {
		realmMap = hyperlink(realmMap, url);
	}

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
