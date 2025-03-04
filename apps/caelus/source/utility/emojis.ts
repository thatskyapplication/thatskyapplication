import { emojiConstants } from "@thatskyapplication/utility";
import { PRODUCTION } from "./constants.js";

export const {
	MISCELLANEOUS_EMOJIS,
	EMOTE_EMOJIS,
	STANCE_EMOJIS,
	CALL_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	SEASON_EMOJIS,
	EVENT_EMOJIS,
	CosmeticToEmoji,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
	EventIdToEventTicketEmoji,
} = emojiConstants(PRODUCTION);
