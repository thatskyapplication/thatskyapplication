/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, GuideSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { CAPE_EMOJIS, FRIEND_ACTION_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { FriendAction, SpiritName } from "../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.DreamsGuide,
	season: SeasonName.Dreams,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			// 1 << 2 was the pendant.
			.set(1 << 3, { item: "Phoenix mask", cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask40 })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape46 })
			.set(1 << 5, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { item: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 8, { item: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 9, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { item: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 11, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 12, { item: "Heart 5", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { item: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug }),
	},
});
