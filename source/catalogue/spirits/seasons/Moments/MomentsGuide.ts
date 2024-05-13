import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.MomentsGuide,
	season: SeasonName.Moments,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Camera", cost: null, emoji: HELD_PROPS_EMOJIS.HeldProp38 })
			.set(1 << 1, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace31 })
			.set(1 << 2, {
				name: "Ultimate face accessory",
				cost: { seasonalHearts: 1 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory28,
			})
			.set(1 << 3, { name: "Ultimate camera", cost: { seasonalHearts: 1 }, emoji: HELD_PROPS_EMOJIS.HeldProp37 })
			.set(1 << 4, {
				name: "Ultimate hair accessory",
				cost: { seasonalHearts: 2 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory27,
			})
			.set(1 << 5, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { name: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 8, { name: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 9, { name: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.DoubleFive })
			.set(1 << 10, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { name: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 12, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 13, { name: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 14, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 15, { name: "Heart 5", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart }),
	},
});
