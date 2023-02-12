import { inspect } from "node:util";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import type { BaseInteraction, GuildMember } from "discord.js";
import { formatEmoji, PermissionFlagsBits } from "discord.js";
import { Emoji, Map, Realm, VALID_REALM } from "./Constants.js";

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
	return dayjs.tz(Date.now(), "America/Los_Angeles").hour(0).minute(0).second(0).millisecond(0).toDate();
}

interface CurrencyEmojiOptions {
	interaction?: BaseInteraction;
	member?: GuildMember;
	emoji: Emoji.Candle | Emoji.Heart | Emoji.AscendedCandle;
	number?: number;
}

export function resolveCurrencyEmoji(options: CurrencyEmojiOptions) {
	let resolvedEmojiString = typeof options.number === "undefined" ? "" : String(options.number);

	if (
		("interaction" in options &&
			(!options.interaction.inGuild() ||
				// This is always present.
				options.interaction.appPermissions!.has(PermissionFlagsBits.UseExternalEmojis))) ||
		("member" in options && options.member.permissions.has(PermissionFlagsBits.UseExternalEmojis))
	)
		return `${resolvedEmojiString}${formatEmoji(options.emoji)}`;

	const plural = typeof options.number === "undefined" ? false : options.number !== 1;
	if (typeof options.number === "number") resolvedEmojiString += " ";

	switch (options.emoji) {
		case Emoji.Candle:
			resolvedEmojiString += "candle";
			break;
		case Emoji.Heart:
			resolvedEmojiString += "heart";
			break;
		case Emoji.AscendedCandle:
			resolvedEmojiString += "ascended candle";
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

	// Account for wonderful inconsistencies.
	switch (upperRawMap) {
		case "FOREST'S BROOK":
			return Map.ForestBrook;
		case "RACE END":
			return Map.Coliseum;
	}

	return Object.values(Map).find((map) => map.toUpperCase() === upperRawMap) ?? null;
}
