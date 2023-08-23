import { inspect } from "node:util";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import {
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	type Guild,
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
} from "discord.js";
import { DAILY_GUIDE_EVENT_ROTATION } from "../Structures/DailyGuides.js";
import {
	AURORA_ENCORE_END_DATE,
	AURORA_ENCORE_START_DATE,
	CURRENT_SEASONAL_CANDLE_EMOJI,
	CURRENT_SEASONAL_EMOJI,
	DEFAULT_EMBED_COLOR,
	doubleSeasonalLightEventDuration,
	doubleSeasonalLightEventEndDate,
	doubleSeasonalLightEventStartDate,
	Emoji,
	eventStartDate,
	INCONSISTENT_MAP,
	inconsistentMapKeys,
	initialTreasureCandleRealmSeek,
	Map,
	Realm,
	Season,
	SEASON_PASS_SEASONAL_CANDLES_BONUS,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	SEASONAL_CANDLES_ROTATION,
	seasonEndDate,
	seasonEventDuration,
	seasonStartDate,
	VALID_REALM,
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

export function todayDate() {
	const now = dayjs().tz("America/Los_Angeles");
	return skyDate(now.year(), now.month() + 1, now.date());
}

export function skyDate(year: number, month: number, date: number, hour = 0, minute = 0, second = 0) {
	// https://github.com/iamkun/dayjs/issues/1827
	return dayjs.tz(`${year}-${month}-${date} ${hour}:${minute}:${second}`, "America/Los_Angeles");
}

export function treasureCandleRealm() {
	return VALID_REALM[
		dayjs()
			.tz("America/Los_Angeles")
			.hour(0)
			.minute(0)
			.second(0)
			.millisecond(0)
			.diff(initialTreasureCandleRealmSeek, "day") % 5
	]!;
}

export function seasonalCandlesRotation() {
	return SEASONAL_CANDLES_ROTATION[todayDate().diff(seasonStartDate, "days") % 10]!;
}

export function eventRotationLetter() {
	return DAILY_GUIDE_EVENT_ROTATION[todayDate().diff(eventStartDate, "day") % 3]!;
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

export async function resolveEmbedColor(guild: Guild | null) {
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	return (await guild?.members.fetchMe())?.displayColor || DEFAULT_EMBED_COLOR;
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
	return `${number === undefined ? "" : number}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji, animated)}`;
}

export function inSeason() {
	const today = todayDate();

	return (
		(today.isSame(seasonStartDate) || today.isAfter(seasonStartDate)) &&
		(today.isSame(seasonEndDate) || today.isBefore(seasonEndDate))
	);
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
	}
}

export function resolveCurrentSeasonalEmoji() {
	return inSeason() ? CURRENT_SEASONAL_EMOJI : null;
}

export function resolveCurrentSeasonalCandleEmoji() {
	return inSeason() ? CURRENT_SEASONAL_CANDLE_EMOJI : Emoji.SeasonalCandle;
}

export function remainingSeasonalCandles() {
	if (!inSeason()) return null;
	const today = todayDate();

	const seasonalDoubleLightEvent =
		(doubleSeasonalLightEventStartDate.isSame(seasonStartDate) ||
			doubleSeasonalLightEventStartDate.isAfter(seasonStartDate)) &&
		(doubleSeasonalLightEventEndDate.isSame(seasonEndDate) || doubleSeasonalLightEventEndDate.isBefore(seasonEndDate));

	// Calculate the total amount of seasonal candles.
	let seasonalCandlesTotal = seasonEventDuration * SEASONAL_CANDLES_PER_DAY;

	let seasonalCandlesTotalWithSeasonPass =
		seasonEventDuration * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

	if (seasonalDoubleLightEvent) {
		seasonalCandlesTotal += doubleSeasonalLightEventDuration;
		seasonalCandlesTotalWithSeasonPass += doubleSeasonalLightEventDuration;
	}

	// Calculate the amount of seasonal candles so far.
	const daysSoFar = today.diff(seasonStartDate, "days") + 1;
	let seasonalCandlesSoFar = daysSoFar * SEASONAL_CANDLES_PER_DAY;

	let seasonalCandlesSoFarWithSeasonPass =
		daysSoFar * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

	if (seasonalDoubleLightEvent && today.diff(doubleSeasonalLightEventStartDate, "days") >= 0) {
		const difference = today.diff(doubleSeasonalLightEventEndDate, "days");

		const extraSeasonalCandles =
			// The difference will be a negative number if the event is still ongoing.
			difference > 0 ? doubleSeasonalLightEventDuration : doubleSeasonalLightEventDuration + difference;

		seasonalCandlesSoFar += extraSeasonalCandles;
		seasonalCandlesSoFarWithSeasonPass += extraSeasonalCandles;
	}

	// Calculate the amount of seasonal candles left.
	return {
		seasonalCandlesLeft: seasonalCandlesTotal - seasonalCandlesSoFar,
		seasonalCandlesLeftWithSeasonPass: seasonalCandlesTotalWithSeasonPass - seasonalCandlesSoFarWithSeasonPass,
	};
}

export function isRealm(realm: string): realm is Realm {
	return Object.values(Realm).includes(realm as Realm);
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

export function inAURORAEncore(today = todayDate()) {
	return (
		(today.isSame(AURORA_ENCORE_START_DATE) || today.isAfter(AURORA_ENCORE_START_DATE)) &&
		(today.isSame(AURORA_ENCORE_END_DATE) || today.isBefore(AURORA_ENCORE_END_DATE))
	);
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
