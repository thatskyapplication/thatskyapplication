import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.SanctuaryGuide,
	season: SeasonName.Sanctuary,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace06 },
			{
				name: "Handpan",
				bit: 1 << 3,
				cost: { seasonalHearts: 3 },
				emoji: HELD_PROPS_EMOJIS.HeldProp17,
			},
			{ name: "Manta cape", bit: 1 << 4, cost: { seasonalHearts: 3 }, emoji: CAPE_EMOJIS.Cape31 },
			{ name: "Quest 2", bit: 1 << 5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 6, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 3", bit: 1 << 7, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 8, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", bit: 1 << 9, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 10, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 5", bit: 1 << 11, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 5", bit: 1 << 12, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 6", bit: 1 << 13, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 6", bit: 1 << 14, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: FriendAction.Hug, bit: 1 << 15, emoji: FRIEND_ACTION_EMOJIS.Hug },
		],
	},
});
