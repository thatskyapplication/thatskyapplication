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
	type UserContextMenuCommandInteraction,
	formatEmoji,
	PermissionFlagsBits,
	time as discordTime,
	TimestampStyles,
} from "discord.js";
import { DAILY_GUIDE_EVENT_ROTATION } from "../Structures/DailyGuides.js";
import {
	DEFAULT_EMBED_COLOR,
	Emoji,
	INCONSISTENT_MAP,
	inconsistentMapKeys,
	initialEventCurrencySeek,
	initialTreasureCandleRealmSeek,
	Map,
	Realm,
	Season,
	SEASONAL_CANDLES_ROTATION,
	seasonStartDate,
	VALID_REALM,
} from "./Constants.js";

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
	return DAILY_GUIDE_EVENT_ROTATION[todayDate().diff(initialEventCurrencySeek, "day") % 3]!;
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
	if (
		!interaction.inGuild() ||
		// This is always present.
		interaction.appPermissions!.has(PermissionFlagsBits.UseExternalEmojis)
	) {
		return false;
	}

	const response = {
		content: `Missing the \`Use External Emojis\` permission. ${
			interaction.memberPermissions.has(PermissionFlagsBits.ManageGuildExpressions)
				? "Change this in"
				: "Ask someone with permission to change this in"
		} server settings!`,
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

export function isSeason(season: string): season is Season {
	return Object.values(Season).includes(season as Season);
}

export function resolveSeasonsToEmoji(seasons: Season) {
	switch (seasons) {
		case Season.Gratitude:
			return Emoji.Gratitude;
		case Season.Lightseekers:
			return Emoji.Lightseekers;
		case Season.Belonging:
			return Emoji.Belonging;
		case Season.Rhythm:
			return Emoji.Rhythm;
		case Season.Enchantment:
			return Emoji.Enchantment;
		case Season.Sanctuary:
			return Emoji.Sanctuary;
		case Season.Prophecy:
			return Emoji.Prophecy;
		case Season.Dreams:
			return Emoji.Dreams;
		case Season.Assembly:
			return Emoji.Assembly;
		case Season.LittlePrince:
			return Emoji.LittlePrince;
		case Season.Flight:
			return Emoji.Flight;
		case Season.Abyss:
			return Emoji.Abyss;
		case Season.Performance:
			return Emoji.Performance;
		case Season.Shattering:
			return Emoji.Shattering;
		case Season.Aurora:
			return Emoji.Aurora;
		case Season.Remembrance:
			return Emoji.Remembrance;
		case Season.Passage:
			return Emoji.Passage;
		case Season.Moments:
			return Emoji.Moments;
	}
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
