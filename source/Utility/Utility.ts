import { URL } from "node:url";
import { inspect } from "node:util";
import dayjs, { type Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import {
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	type InteractionReplyOptions,
	type InteractionUpdateOptions,
	type ModalSubmitInteraction,
	type Snowflake,
	type StringSelectMenuInteraction,
	type TimestampStylesString,
	type User,
	type UserContextMenuCommandInteraction,
	CDN,
	formatEmoji,
	PermissionFlagsBits,
	time as discordTime,
	TimestampStyles,
	hyperlink,
} from "discord.js";
import { DAILY_GUIDE_EVENT_ROTATION } from "../Structures/DailyGuides.js";
import type { SeasonalSpirit, StandardSpirit } from "../Structures/Spirits/Base.js";
import type Spirits from "../Structures/Spirits/index.js";
import {
	type MeditationMaps,
	type RainbowAdmireMaps,
	type SocialLightAreaMaps,
	CDN_URL,
	CURRENT_SEASON,
	CURRENT_SEASONAL_CANDLE_EMOJI,
	CURRENT_SEASONAL_EMOJI,
	DOUBLE_SEASONAL_LIGHT_EVENT_DURATION,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	Emoji,
	EVENT_START_DATE,
	INCONSISTENT_MAP,
	inconsistentMapKeys,
	INITIAL_TREASURE_CANDLE_REALM_SEEK,
	Map,
	MEDITATION_MAPS,
	RAINBOW_ADMIRE_MAPS,
	Realm,
	REALM_VALUES,
	Season,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SEASONAL_CANDLES_ROTATION,
	SEASON_END_DATE,
	SEASON_DURATION,
	SEASON_START_DATE,
	SHARD_ERUPTION_PREDICTION_DATA,
	SOCIAL_LIGHT_AREA_MAPS,
	VALID_REALM,
	type ValidRealm,
	type QuestSpiritSeasons,
	QUEST_SPIRITS_SEASONS,
} from "./Constants.js";

const cdn = new CDN();
dayjs.extend(timezone);
dayjs.extend(utc);

export function consoleLog(consoleLog: any, stamp = new Date().toISOString()): void {
	console.log(`- - - - - ${stamp} - - - - -`);
	console.log(inspect(consoleLog, false, Number.POSITIVE_INFINITY, true));
}

export function notNull<T>(value: T | null): value is T {
	return value !== null;
}

export function dayjsDate(timestamp: number) {
	return dayjs.tz(timestamp, "America/Los_Angeles");
}

export function todayDate() {
	const now = dayjs().tz("America/Los_Angeles");
	return skyDate(now.year(), now.month() + 1, now.date());
}

export function skyDate(year: number, month: number, date: number, hour = 0, minute = 0, second = 0) {
	// https://github.com/iamkun/dayjs/issues/1827
	return dayjs.tz(`${year}-${month}-${date} ${hour}:${minute}:${second}`, "America/Los_Angeles");
}

export function isDuring(start: Dayjs, end: Dayjs, date = todayDate()) {
	return (date.isSame(start) || date.isAfter(start)) && (date.isBefore(end) || date.isSame(end));
}

export function treasureCandleRealm() {
	return VALID_REALM[
		dayjs()
			.tz("America/Los_Angeles")
			.hour(0)
			.minute(0)
			.second(0)
			.millisecond(0)
			.diff(INITIAL_TREASURE_CANDLE_REALM_SEEK, "day") % 5
	]!;
}

export function seasonalCandlesRotation() {
	return SEASONAL_CANDLES_ROTATION[todayDate().diff(SEASON_START_DATE, "days") % 10]!;
}

export function seasonalCandlesRotationURL(realm: Realm, rotation: 1 | 2 | 3) {
	return String(
		new URL(
			`daily_guides/seasonal_candles/${fullSeasonName(resolveCurrentSeason()!)
				.toLowerCase()
				.replaceAll(" ", "_")}/${realm.toLowerCase().replaceAll(" ", "_")}/rotation_${rotation}.webp`,
			CDN_URL,
		),
	);
}

export function eventRotationLetter() {
	return DAILY_GUIDE_EVENT_ROTATION[todayDate().diff(EVENT_START_DATE, "day") % 3]!;
}

export async function cannotUseCustomEmojis(
	interaction:
		| ButtonInteraction
		| ChatInputCommandInteraction
		| ModalSubmitInteraction
		| StringSelectMenuInteraction
		| UserContextMenuCommandInteraction,
	options?: InteractionReplyOptions | InteractionUpdateOptions,
) {
	if (!interaction.inGuild() || interaction.appPermissions.has(PermissionFlagsBits.UseExternalEmojis)) return false;

	const response = {
		content: "Missing the `Use External Emojis` permission. Someone needs to adjust the permissions!",
		ephemeral: true,
		...options,
	};

	if (interaction.isMessageComponent()) {
		// @ts-expect-error Too generic.
		await interaction.update(response);
	} else {
		// @ts-expect-error Too generic.
		await interaction.reply(response);
	}

	return true;
}

export interface CurrencyEmojiOptions {
	emoji: Emoji;
	animated?: boolean;
	number: number;
	includeSpaceInEmoji?: boolean;
}

export function resolveCurrencyEmoji({
	emoji,
	animated = false,
	number,
	includeSpaceInEmoji = false,
}: CurrencyEmojiOptions) {
	return `${number}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji, animated)}`;
}

export function inSeason() {
	return isDuring(SEASON_START_DATE, SEASON_END_DATE);
}

export function isSeason(season: string): season is Season {
	return Object.values(Season).includes(season as Season);
}

export function resolveSeasonToSeasonalEmoji(season: Season) {
	switch (season) {
		case Season.Gratitude:
			return Emoji.SeasonGratitude;
		case Season.Lightseekers:
			return Emoji.SeasonLightseekers;
		case Season.Belonging:
			return Emoji.SeasonBelonging;
		case Season.Rhythm:
			return Emoji.SeasonRhythm;
		case Season.Enchantment:
			return Emoji.SeasonEnchantment;
		case Season.Sanctuary:
			return Emoji.SeasonSanctuary;
		case Season.Prophecy:
			return Emoji.SeasonProphecy;
		case Season.Dreams:
			return Emoji.SeasonDreams;
		case Season.Assembly:
			return Emoji.SeasonAssembly;
		case Season.LittlePrince:
			return Emoji.SeasonLittlePrince;
		case Season.Flight:
			return Emoji.SeasonFlight;
		case Season.Abyss:
			return Emoji.SeasonAbyss;
		case Season.Performance:
			return Emoji.SeasonPerformance;
		case Season.Shattering:
			return Emoji.SeasonShattering;
		case Season.Aurora:
			return Emoji.SeasonAurora;
		case Season.Remembrance:
			return Emoji.SeasonRemembrance;
		case Season.Passage:
			return Emoji.SeasonPassage;
		case Season.Moments:
			return Emoji.SeasonMoments;
		case Season.Revival:
			return Emoji.SeasonRevival;
	}
}

export function resolveSeasonToCandleEmoji(season: Season) {
	switch (season) {
		case Season.Gratitude:
			return Emoji.CandleGratitude;
		case Season.Lightseekers:
			return Emoji.CandleLightseekers;
		case Season.Belonging:
			return Emoji.CandleBelonging;
		case Season.Rhythm:
			return Emoji.CandleRhythm;
		case Season.Enchantment:
			return Emoji.CandleEnchantment;
		case Season.Sanctuary:
			return Emoji.CandleSanctuary;
		case Season.Prophecy:
			return Emoji.CandleProphecy;
		case Season.Dreams:
			return Emoji.CandleDreams;
		case Season.Assembly:
			return Emoji.CandleAssembly;
		case Season.LittlePrince:
			return Emoji.CandleLittlePrince;
		case Season.Flight:
			return Emoji.CandleFlight;
		case Season.Abyss:
			return Emoji.CandleAbyss;
		case Season.Performance:
			return Emoji.CandlePerformance;
		case Season.Shattering:
			return Emoji.CandleShattering;
		case Season.Aurora:
			return Emoji.CandleAurora;
		case Season.Remembrance:
			return Emoji.CandleRemembrance;
		case Season.Passage:
			return Emoji.CandlePassage;
		case Season.Moments:
			return Emoji.CandleMoments;
		case Season.Revival:
			return Emoji.CandleRevival;
	}
}

export function resolveSeasonToHeartEmoji(season: Exclude<Season, Season.Gratitude | Season.Lightseekers>) {
	switch (season) {
		case Season.Belonging:
			return Emoji.HeartBelonging;
		case Season.Rhythm:
			return Emoji.HeartRhythm;
		case Season.Enchantment:
			return Emoji.HeartEnchantment;
		case Season.Sanctuary:
			return Emoji.HeartSanctuary;
		case Season.Prophecy:
			return Emoji.HeartProphecy;
		case Season.Dreams:
			return Emoji.HeartDreams;
		case Season.Assembly:
			return Emoji.HeartAssembly;
		case Season.LittlePrince:
			return Emoji.HeartLittlePrince;
		case Season.Flight:
			return Emoji.HeartFlight;
		case Season.Abyss:
			return Emoji.HeartAbyss;
		case Season.Performance:
			return Emoji.HeartPerformance;
		case Season.Shattering:
			return Emoji.HeartShattering;
		case Season.Aurora:
			return Emoji.HeartAurora;
		case Season.Remembrance:
			return Emoji.HeartRemembrance;
		case Season.Passage:
			return Emoji.HeartPassage;
		case Season.Moments:
			return Emoji.HeartMoments;
		case Season.Revival:
			return Emoji.HeartRevival;
	}
}

export function resolveCurrentSeason() {
	return inSeason() ? CURRENT_SEASON : null;
}

export function resolveCurrentSeasonalEmoji() {
	return inSeason() ? CURRENT_SEASONAL_EMOJI : null;
}

export function resolveCurrentSeasonalCandleEmoji() {
	return inSeason() ? CURRENT_SEASONAL_CANDLE_EMOJI : Emoji.SeasonalCandle;
}

export function fullSeasonName(season: Season) {
	return `Season of ${season === Season.LittlePrince ? "the " : ""}${season}`;
}

export function remainingSeasonalCandles() {
	if (!inSeason()) return null;
	const today = todayDate();

	const seasonalDoubleLightEvent =
		(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE.isSame(SEASON_START_DATE) ||
			DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE.isAfter(SEASON_START_DATE)) &&
		(DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.isSame(SEASON_END_DATE) ||
			DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.isBefore(SEASON_END_DATE));

	// Calculate the total amount of seasonal candles.
	let seasonalCandlesTotal = SEASON_DURATION * SEASONAL_CANDLES_PER_DAY;

	let seasonalCandlesTotalWithSeasonPass =
		SEASON_DURATION * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

	if (seasonalDoubleLightEvent) {
		seasonalCandlesTotal += DOUBLE_SEASONAL_LIGHT_EVENT_DURATION;
		seasonalCandlesTotalWithSeasonPass += DOUBLE_SEASONAL_LIGHT_EVENT_DURATION;
	}

	// Calculate the amount of seasonal candles so far.
	const daysSoFar = today.diff(SEASON_START_DATE, "days") + 1;
	let seasonalCandlesSoFar = daysSoFar * SEASONAL_CANDLES_PER_DAY;

	let seasonalCandlesSoFarWithSeasonPass =
		daysSoFar * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

	if (seasonalDoubleLightEvent && today.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days") >= 0) {
		const difference = today.diff(DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE, "days");

		const extraSeasonalCandles =
			// The difference will be a negative number if the event is still ongoing.
			difference > 0 ? DOUBLE_SEASONAL_LIGHT_EVENT_DURATION : DOUBLE_SEASONAL_LIGHT_EVENT_DURATION + difference;

		seasonalCandlesSoFar += extraSeasonalCandles;
		seasonalCandlesSoFarWithSeasonPass += extraSeasonalCandles;
	}

	// Calculate the amount of seasonal candles left.
	return {
		seasonalCandlesLeft: seasonalCandlesTotal - seasonalCandlesSoFar,
		seasonalCandlesLeftWithSeasonPass: seasonalCandlesTotalWithSeasonPass - seasonalCandlesSoFarWithSeasonPass,
	};
}

/**
 * @privateRemarks Defines a spirit that may be encountered in a daily quest. So far, that includes:
 *
 * - Standard spirits.
 * - Seasonal spirits from ({@link QuestSpiritSeasons}).
 *
 * Spirits must not be in the {@link Realm.IslesOfDawn | Isles of Dawn}.
 *
 * These spirits must have an associated infographic.
 */
export type QuestSpirit = (StandardSpirit | (SeasonalSpirit & { season: QuestSpiritSeasons })) & { realm: ValidRealm };

export function isQuestSpiritsSeason(season: Season): season is QuestSpiritSeasons {
	return QUEST_SPIRITS_SEASONS.includes(season as QuestSpiritSeasons);
}

export function isQuestSpirit(spirit: (typeof Spirits)[number]): spirit is QuestSpirit {
	if (spirit.realm === Realm.IslesOfDawn) return false;
	if (spirit.isStandardSpirit()) return true;

	if (spirit.isSeasonalSpirit() && isQuestSpiritsSeason(spirit.season)) {
		return QUEST_SPIRITS_SEASONS.includes(spirit.season);
	}

	return false;
}

export function isRealm(realm: string): realm is Realm {
	return REALM_VALUES.includes(realm as Realm);
}

export function isWingedLightArea(area: string): area is Realm | Map.AncientMemory {
	return isRealm(area) || area === Map.AncientMemory;
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
	start: Dayjs;
	end: Dayjs;
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
	const date = todayDate().add(daysOffset, "days");
	const dayOfMonth = date.date();
	const dayOfWeek = date.day();
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
		let startTime = date.add(offset, "milliseconds");
		timestamps.length < 3;
		startTime = startTime.add(interval * 3_600_000, "milliseconds")
	) {
		timestamps.push({ start: startTime.add(520, "seconds"), end: startTime.add(4, "hours") });
	}

	return { realm: VALID_REALM[realmIndex]!, map, strong, reward, timestamps, url };
}

export function resolveShardEruptionEmoji(dangerous: boolean) {
	return dangerous ? Emoji.ShardStrong : Emoji.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, map, strong, reward, url }: ShardEruptionData,
	useHyperlink: boolean,
) {
	let realmMap = `${realm} (${map})`;
	if (useHyperlink) realmMap = hyperlink(realmMap, url);

	return `${formatEmoji(resolveShardEruptionEmoji(strong))} ${realmMap}\n${
		reward === 200
			? `200 ${formatEmoji(Emoji.Light)}`
			: resolveCurrencyEmoji({ emoji: Emoji.AscendedCandle, number: reward })
	}`;
}

export function shardEruptionTimestampsString({ timestamps }: ShardEruptionData) {
	return timestamps
		.map(
			({ start, end }) =>
				`${discordTime(start.unix(), TimestampStyles.LongTime)} - ${discordTime(end.unix(), TimestampStyles.LongTime)}`,
		)
		.join("\n");
}

export function dateString(date: Dayjs) {
	return date.format("dddd, D MMMM YYYY");
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

export function formatEmojiURL(id: Snowflake) {
	return cdn.emoji(id);
}
