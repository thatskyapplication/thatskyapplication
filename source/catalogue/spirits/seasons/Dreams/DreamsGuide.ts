import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { CAPE_EMOJIS, FRIEND_ACTION_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.DreamsGuide,
	season: SeasonName.Dreams,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Phoenix mask", bit: 1 << 2, cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask40 },
			{ name: "Ultimate cape", bit: 1 << 3, cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape46 },
			{ name: "Quest 2", bit: 1 << 4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 5, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 3", bit: 1 << 6, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 7, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", bit: 1 << 8, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 9, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 5", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 5", bit: 1 << 11, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: FriendAction.Hug, bit: 1 << 12, emoji: FRIEND_ACTION_EMOJIS.Hug },
		],
	},
});
