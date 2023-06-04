import { inspect } from "node:util";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import {
	type GuildMember,
	type Snowflake,
	type TimestampStylesString,
	BaseInteraction,
	formatEmoji,
	PermissionFlagsBits,
	time as discordTime,
	TimestampStyles,
} from "discord.js";
import {
	Emoji,
	INCONSISTENT_MAP,
	inconsistentMapKeys,
	initialTreasureCandleRealmSeek,
	Map,
	Realm,
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

export function canUseCustomEmoji(interactionOrMember: BaseInteraction | GuildMember) {
	return interactionOrMember instanceof BaseInteraction
		? !interactionOrMember.inGuild() ||
				// This is always present.
				interactionOrMember.appPermissions!.has(PermissionFlagsBits.UseExternalEmojis)
		: interactionOrMember.permissions.has(PermissionFlagsBits.UseExternalEmojis);
}

function resolveEmojiToNonCustomEmoji(emoji: Emoji) {
	switch (emoji) {
		case Emoji.Candle:
			return "🕯️";
		case Emoji.Heart:
			return "🩵";
		case Emoji.AscendedCandle:
			return "🪔";
		case Emoji.WingedLight:
			return "🪽";
		case Emoji.Yes:
			return "✅";
		case Emoji.No:
			return "❌";
		case Emoji.iOS:
			return "📱";
		case Emoji.Android:
			return "🤖";
		case Emoji.Mac:
			return "💻";
		case Emoji.Switch:
			return "🎮";
		case Emoji.PlayStation:
			return "👾";
		default:
			return "";
	}
}

export function resolveEmoji(interactionOrMember: BaseInteraction | GuildMember, emoji: Emoji, animated = false) {
	return canUseCustomEmoji(interactionOrMember) ? formatEmoji(emoji, animated) : resolveEmojiToNonCustomEmoji(emoji);
}

export interface CurrencyEmojiOptions {
	emoji: Emoji.Candle | Emoji.Heart | Emoji.AscendedCandle | Emoji.WingedLight;
	animated?: boolean;
	number?: number;
	forceEmojiOnLeft?: boolean;
	includeSpaceInEmoji?: boolean;
}

export function resolveCurrencyEmoji(
	interactionOrMember: BaseInteraction | GuildMember,
	{ emoji, animated = false, number, forceEmojiOnLeft = false, includeSpaceInEmoji = false }: CurrencyEmojiOptions,
) {
	let resolvedEmojiString = number === undefined ? "" : String(number);

	if (canUseCustomEmoji(interactionOrMember)) {
		return forceEmojiOnLeft
			? `${formatEmoji(emoji, animated)}${includeSpaceInEmoji ? " " : ""}${resolvedEmojiString}`
			: `${resolvedEmojiString}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji, animated)}`;
	}

	if (typeof number === "number") resolvedEmojiString += " ";
	resolvedEmojiString += resolveEmojiToNonCustomEmoji(emoji);
	return resolvedEmojiString;
}

export function isRealm(realm: string): realm is Realm {
	return Object.values(Realm).includes(realm as Realm);
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
