/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	FACE_ACCESSORY_EMOJIS,
	FRIEND_ACTIONS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, FriendAction, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.MomentsGuide,
	season: SeasonName.Moments,
	realm: Realm.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Camera", cost: null })
			.set(1 << 1, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace30 })
			.set(1 << 2, {
				item: "Ultimate face accessory",
				cost: { seasonalHearts: 1 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory28,
			})
			.set(1 << 3, { item: "Ultimate camera", cost: { seasonalHearts: 1 } })
			.set(1 << 4, { item: "Ultimate hair accessory", cost: { seasonalHearts: 2 } })
			.set(1 << 5, { item: "Quest 1", cost: null })
			.set(1 << 6, { item: "Heart 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { item: "Quest 2", cost: null })
			.set(1 << 8, { item: "Heart 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 9, { item: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTIONS_EMOJIS.DoubleFive })
			.set(1 << 10, { item: "Quest 3", cost: null })
			.set(1 << 11, { item: "Heart 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 12, { item: "Quest 4", cost: null })
			.set(1 << 13, { item: "Heart 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 14, { item: "Quest 5", cost: null })
			.set(1 << 15, { item: "Heart 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart }),
	},
});
