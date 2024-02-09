import { URL } from "node:url";
import { inspect } from "node:util";
import {
	type Snowflake,
	type TimestampStylesString,
	type User,
	time as discordTime,
	TimestampStyles,
	hyperlink,
} from "discord.js";
import type { DateTime } from "luxon";
import {
	type MeditationMaps,
	type RainbowAdmireMaps,
	type Realm,
	type SocialLightAreaMaps,
	CDN_URL,
	INCONSISTENT_MAP,
	inconsistentMapKeys,
	Map,
	MEDITATION_MAPS,
	RAINBOW_ADMIRE_MAPS,
	REALM_VALUES,
	SOCIAL_LIGHT_AREA_MAPS,
	VALID_REALM,
} from "./Constants.js";
import { INITIAL_TREASURE_CANDLE_REALM_SEEK, todayDate } from "./dates.js";
import { formatEmoji, MISCELLANEOUS_EMOJIS, resolveCurrencyEmoji } from "./emojis.js";
import { SHARD_ERUPTION_PREDICTION_DATA } from "./shardEruption.js";

export function consoleLog(consoleLog: any, stamp = new Date().toISOString()): void {
	console.log(`- - - - - ${stamp} - - - - -`);
	console.log(inspect(consoleLog, false, Number.POSITIVE_INFINITY, true));
}

export function treasureCandleRealm(date: DateTime) {
	return VALID_REALM[date.diff(INITIAL_TREASURE_CANDLE_REALM_SEEK, "day").days % 5]!;
}

export function isRealm(realm: string): realm is Realm {
	return REALM_VALUES.includes(realm as Realm);
}

export function resolveValidRealm(realm: string) {
	const upperRealm = realm.toUpperCase();
	return Object.values(VALID_REALM).find((validRealm) => validRealm.toUpperCase() === upperRealm) ?? null;
}

export function resolveMap(rawMap: string) {
	const upperRawMap = rawMap.toUpperCase();

	const inconsistentResult = inconsistentMapKeys.find(
		(inconsistentMapKey): inconsistentMapKey is keyof typeof INCONSISTENT_MAP =>
			inconsistentMapKey.toUpperCase() === upperRawMap,
	);

	return inconsistentResult
		? INCONSISTENT_MAP[inconsistentResult]
		: Object.values(Map).find((map) => map.toUpperCase() === upperRawMap) ?? null;
}

export function resolveMeditationMap(map: MeditationMaps) {
	switch (map) {
		case Map.ForestBrook:
		case Map.Citadel:
			return `above the ${map}`;
		case Map.SanctuaryIslands:
		case Map.Boneyard:
		case Map.ForestClearing:
		case Map.Coliseum:
		case Map.VaultEntrance:
		case Map.VaultSummit:
			return `at the ${map}`;
		case Map.KoiPond:
		case Map.IceRink:
			return `by the ${map}`;
		case Map.ButterflyFields:
		case Map.Cave:
		case Map.ElevatedClearing:
		case Map.BrokenTemple:
		case Map.ForgottenArk:
		case Map.Graveyard:
		case Map.VaultSecondFloor:
			return `in the ${map}`;
		case Map.Battlefield:
		case Map.Boat:
			return `on the ${map}`;
	}
}

export function isMeditationMap(map: Map): map is MeditationMaps {
	return MEDITATION_MAPS.includes(map as MeditationMaps);
}

export function resolveSocialLightAreaMap(map: SocialLightAreaMaps) {
	switch (map) {
		case Map.Cave:
			return `cosy hideout in the ${map}`;
		case Map.ElevatedClearing:
			return `ancestor's table of belonging in the ${map}`;
		case Map.VillageOfDreams:
			return `hot spring in the ${map}`;
		case Map.Graveyard:
			return `bonfire at the ${map}`;
	}
}

export function isSocialLightAreaMap(map: Map): map is SocialLightAreaMaps {
	return SOCIAL_LIGHT_AREA_MAPS.includes(map as SocialLightAreaMaps);
}

export function isRainbowAdmireMap(map: Map): map is RainbowAdmireMaps {
	return RAINBOW_ADMIRE_MAPS.includes(map as RainbowAdmireMaps);
}

export function resolveShardEruptionMapURL(map: Map) {
	return new URL(`daily_guides/shard_eruptions/${map.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL);
}

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

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, map, strong, reward, url }: ShardEruptionData,
	useHyperlink: boolean,
) {
	let realmMap = `${realm} (${map})`;
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
				`${discordTime(start.toUnixInteger(), TimestampStyles.LongTime)} - ${discordTime(
					end.toUnixInteger(),
					TimestampStyles.LongTime,
				)}`,
		)
		.join("\n");
}

export function dateString(date: DateTime) {
	return date.toFormat("cccc, d MMMM y");
}

export function time(timestamp: number, style: TimestampStylesString, relative = false) {
	const resolvedTimestamp = Math.floor(timestamp / 1_000);

	return `${discordTime(resolvedTimestamp, style)}${
		relative ? ` (${discordTime(resolvedTimestamp, TimestampStyles.RelativeTime)})` : ""
	}`;
}

export function guildLink(guildId: Snowflake) {
	return `https://discord.com/channels/${guildId}`;
}

export function chatInputApplicationCommandMention(
	id: Snowflake,
	commandName: string,
	subcommandName?: string | null | undefined,
	subcommandGroupName?: string | null | undefined,
) {
	return `</${commandName}${subcommandGroupName ? ` ${subcommandGroupName}` : ""}${
		subcommandName ? ` ${subcommandName}` : ""
	}:${id}>`;
}

export function userLogFormat(user: User) {
	return `${user} (${user.tag})`;
}
