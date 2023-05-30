import { inspect } from "node:util";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import {
	type BaseInteraction,
	type GuildMember,
	type TimestampStylesString,
	time as discordTime,
	TimestampStyles,
} from "discord.js";
import { formatEmoji, PermissionFlagsBits } from "discord.js";
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

export interface CurrencyEmojiOptions {
	interaction?: BaseInteraction;
	member?: GuildMember;
	emoji: Emoji;
	animated?: boolean;
	number?: number;
	forceEmojiOnLeft?: boolean;
	includeSpaceInEmoji?: boolean;
}

export function resolveCurrencyEmoji({
	interaction,
	member,
	emoji,
	animated = false,
	number,
	forceEmojiOnLeft = false,
	includeSpaceInEmoji = false,
}: CurrencyEmojiOptions) {
	if (interaction === undefined && member === undefined) {
		throw new TypeError("Both interaction and member were not defined. At least one must be defined.");
	}

	let resolvedEmojiString = number === undefined ? "" : String(number);

	if (
		(interaction &&
			(!interaction.inGuild() ||
				// This is always present.
				interaction.appPermissions!.has(PermissionFlagsBits.UseExternalEmojis))) ||
		member?.permissions.has(PermissionFlagsBits.UseExternalEmojis)
	)
		return forceEmojiOnLeft
			? `${formatEmoji(emoji, animated)}${includeSpaceInEmoji ? " " : ""}${resolvedEmojiString}`
			: `${resolvedEmojiString}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji, animated)}`;

	const plural = number === undefined ? false : number !== 1;
	if (typeof number === "number") resolvedEmojiString += " ";

	switch (emoji) {
		case Emoji.Candle:
			resolvedEmojiString += "candle";
			break;
		case Emoji.Heart:
			resolvedEmojiString += "heart";
			break;
		case Emoji.AscendedCandle:
			resolvedEmojiString += "ascended candle";
			break;
		case Emoji.WingedLight:
			resolvedEmojiString += "winged light";
			break;
		case Emoji.Yes:
			resolvedEmojiString += "✅";
			break;
		case Emoji.No:
			resolvedEmojiString += "❌";
			break;
		case Emoji.iOS:
		case Emoji.Android:
		case Emoji.Mac:
		case Emoji.Switch:
		case Emoji.PlayStation:
			break;
	}

	if (plural) resolvedEmojiString += "s";
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
