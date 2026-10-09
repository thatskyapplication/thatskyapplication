import { emojiConstants, formatEmoji } from "@thatskyapplication/utility";
import { PRODUCTION } from "./configuration.js";

export const EMOJIS = emojiConstants(PRODUCTION);

export const {
	MISCELLANEOUS_EMOJIS,
	EMOTE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	SEASON_EMOJIS,
	EVENT_EMOJIS,
	CAPE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
	CosmeticToEmoji,
	SeasonIdToSeasonalEmoji,
	SeasonIdToSeasonalCandleEmoji,
	EventIdToEventTicketEmoji,
	SkyProfilePersonalityToEmoji,
	DyeTypeToEmoji,
	PlatformIdToEmoji,
} = EMOJIS;

export const CUSTOM_EMOJI_REPLACEMENTS = [
	{ from: formatEmoji(MISCELLANEOUS_EMOJIS.Yes), to: "✅" },
	{ from: formatEmoji(MISCELLANEOUS_EMOJIS.No), to: "❌" },
	{ from: formatEmoji(MISCELLANEOUS_EMOJIS.Heart), to: "🤍" },
] as const;
