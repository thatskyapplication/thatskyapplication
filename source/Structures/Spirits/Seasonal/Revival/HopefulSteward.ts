/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";
import { type ItemsData, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.HopefulSteward,
	season: SeasonName.Revival,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace32 })
			.set(1 << 3, { item: "Ultimate hair", cost: { seasonalHearts: 2 }, emoji: HAIR_EMOJIS.Hair132 })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape115 })
			// .set(1 << 5, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			// .set(1 << 6, { item: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 8, { item: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 9, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { item: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 17, { item: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug })
			.set(1 << 11, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 12, { item: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 14, { item: "Heart 5", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 15, { item: "Quest 6", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 16, { item: "Heart 6", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 18, { item: "Quest 7", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 20, { item: "Quest 8", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 21, { item: "Quest 9", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 19, { item: "Hair", cost: { candles: 46 }, emoji: HAIR_EMOJIS.Hair133 }),
	},
});
