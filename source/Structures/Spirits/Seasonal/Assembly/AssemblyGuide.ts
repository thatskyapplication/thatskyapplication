/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { FRIEND_ACTIONS_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, FriendAction, GuideSpirit, SpiritName } from "../../Base.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;

export default new GuideSpirit({
	name: SpiritName.AssemblyGuide,
	season: SeasonName.Assembly,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 22, { item: "Blessing", cost: null })
			.set(1 << 0, { item: "Quest 1", cost: null })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 2, { item: "Pendant", cost: null })
			.set(1 << 3, { item: "Ultimate mask", cost: { seasonalHearts: 1 }, emoji: MASK_EMOJIS.Mask44 })
			.set(1 << 4, { item: "Ultimate hair", cost: { seasonalHearts: 1 } })
			.set(1 << 5, { item: "Bugle", cost: { seasonalHearts: 2 } })
			.set(1 << 6, { item: "Ultimate cape", cost: { seasonalHearts: 2 } })
			.set(1 << 7, { item: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.HighFive })
			.set(1 << 8, { item: "Quest 2", cost: null })
			.set(1 << 9, { item: "Pillow", cost: { candles: 5 } })
			.set(1 << 10, { item: "Quest 3", cost: null })
			.set(1 << 11, { item: "Heart 2", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 12, { item: FriendAction.Hug, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.Hug })
			.set(1 << 13, { item: "Quest 4", cost: null })
			.set(1 << 14, { item: "Jar", cost: { candles: 8 } })
			.set(1 << 15, { item: "Quest 5", cost: null })
			.set(1 << 16, { item: "Brazier", cost: { hearts: 12 } })
			.set(1 << 17, { item: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.DoubleFive })
			.set(1 << 18, { item: "Quest 6", cost: null })
			.set(1 << 19, { item: "Heart 3", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 20, { item: "Bookcase", cost: { candles: 30 } })
			.set(1 << 21, { item: "Tarpaulin", cost: { hearts: 24 } }),
	},
});
