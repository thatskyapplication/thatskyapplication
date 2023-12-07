/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { FRIEND_ACTIONS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, FriendAction, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.PerformanceGuide,
	season: SeasonName.Performance,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null })
			.set(1 << 1, { item: "Shared memory spell 1", cost: null })
			.set(1 << 2, { item: "Pendant", cost: null })
			.set(1 << 3, { item: "Ultimate mask", cost: { seasonalHearts: 1 } })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 } })
			.set(1 << 5, { item: "Ultimate hair", cost: { seasonalHearts: 1 } })
			.set(1 << 6, { item: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.HighFive })
			.set(1 << 7, { item: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 8, { item: "Quest 2", cost: null })
			.set(1 << 9, { item: "Mask", cost: { candles: 42 } })
			.set(1 << 10, { item: "Quest 3", cost: null })
			.set(1 << 11, { item: "Shared memory spell 2", cost: null })
			.set(1 << 12, { item: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.DoubleFive })
			.set(1 << 13, { item: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 14, { item: "Quest 4", cost: null })
			.set(1 << 15, { item: "Shared memory spell 3", cost: null })
			.set(1 << 16, { item: FriendAction.Hug, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.Hug })
			.set(1 << 17, { item: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 18, { item: "Quest 5", cost: null })
			.set(1 << 19, { item: "Shared memory spell 4", cost: null })
			.set(1 << 20, { item: FriendAction.DuetDance, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.DuetDance })
			.set(1 << 21, { item: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 22, { item: "Flower pot", cost: { candles: 52 } }),
	},
});
