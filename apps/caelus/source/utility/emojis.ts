import { emojiConstants } from "@thatskyapplication/utility";
import { PRODUCTION } from "./configuration.js";

export const {
	MISCELLANEOUS_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	SEASON_EMOJIS,
	CosmeticToEmoji,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
	EventIdToEventTicketEmoji,
} = emojiConstants(PRODUCTION);
