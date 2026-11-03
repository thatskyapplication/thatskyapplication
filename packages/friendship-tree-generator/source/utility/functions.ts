import {
	costEntryEmoji,
	type ItemCost,
	type Snowflake,
	sumCosts,
} from "@thatskyapplication/utility";
import { EMOJIS } from "./emojis.js";

export function resolveCostEmojiId(cost: ItemCost): Snowflake {
	const [entry] = sumCosts([cost]);
	const emoji = entry && costEntryEmoji(entry, EMOJIS);

	if (!emoji) {
		throw new Error("A cost was specified with no currency.");
	}

	return emoji.id;
}
