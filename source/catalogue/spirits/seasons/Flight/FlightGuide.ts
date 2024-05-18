import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FRIEND_ACTION_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.FlightGuide,
	season: SeasonName.Flight,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace15 })
			.set(1 << 3, {
				name: "Ultimate hair accessory",
				cost: { seasonalHearts: 2 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory12,
			})
			.set(1 << 4, { name: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit24 })
			.set(1 << 5, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { name: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { name: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.HighFive })
			.set(1 << 8, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { name: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 10, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { name: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 12, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 13, { name: "Heart 5", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 14, { name: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug }),
	},
});
