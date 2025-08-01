import { emojiConstants, formatEmoji } from "@thatskyapplication/utility";
import { PRODUCTION } from "./configuration.js";

export const {
	MISCELLANEOUS_EMOJIS,
	EMOTE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	SEASON_EMOJIS,
	CosmeticToEmoji,
	SeasonIdToSeasonalEmoji,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalHeartEmoji,
	EventIdToEventTicketEmoji,
} = emojiConstants(PRODUCTION);

export const CUSTOM_EMOJI_REPLACEMENTS = [
	{ from: formatEmoji(MISCELLANEOUS_EMOJIS.Yes), to: "✅" },
	{ from: formatEmoji(MISCELLANEOUS_EMOJIS.No), to: "❌" },
	{ from: formatEmoji(MISCELLANEOUS_EMOJIS.Heart), to: "🤍" },
] as const;
