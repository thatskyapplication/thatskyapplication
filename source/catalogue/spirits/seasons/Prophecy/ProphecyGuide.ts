import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FRIEND_ACTION_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.ProphecyGuide,
	season: SeasonName.Prophecy,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace08 },
			{ name: "Dunun", bit: 1 << 3, cost: { seasonalHearts: 2 }, emoji: HELD_PROPS_EMOJIS.HeldProp19 },
			{ name: "Anubis mask", bit: 1 << 4, cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask36 },
			{ name: "Quest 2", bit: 1 << 5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 6, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 3", bit: 1 << 7, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 8, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", bit: 1 << 9, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 10, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: FriendAction.Hug, bit: 1 << 11, emoji: FRIEND_ACTION_EMOJIS.Hug },
		],
	},
});
