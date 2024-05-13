import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { CAPE_EMOJIS, FRIEND_ACTION_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.DreamsGuide,
	season: SeasonName.Dreams,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			// 1 << 2 was the pendant.
			.set(1 << 3, { name: "Phoenix mask", cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask40 })
			.set(1 << 4, { name: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape46 })
			.set(1 << 5, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { name: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 8, { name: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 9, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { name: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 11, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 12, { name: "Heart 5", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { name: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug }),
	},
});
