/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, GuideSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import {
	FRIEND_ACTION_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { FriendAction, SpiritName } from "../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.FlightGuide,
	season: SeasonName.Flight,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace15 })
			.set(1 << 3, {
				item: "Ultimate hair accessory",
				cost: { seasonalHearts: 2 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory12,
			})
			.set(1 << 4, { item: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit24 })
			.set(1 << 5, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { item: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { item: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.HighFive })
			.set(1 << 8, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { item: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 10, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { item: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 12, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 13, { item: "Heart 5", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 14, { item: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug }),
	},
});
