import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RemembranceGuide,
	season: SeasonName.Remembrance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace25 })
			.set(1 << 3, { name: "Ultimate neck accessory", cost: { seasonalHearts: 2 }, emoji: NECKLACE_EMOJIS.Necklace27 })
			.set(1 << 4, {
				name: "Ultimate prop",
				cost: { seasonalHearts: 2 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp30,
			})
			.set(1 << 5, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { name: "Chimes", cost: { candles: 30 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp22 })
			.set(1 << 7, { name: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.HighFive })
			.set(1 << 8, { name: "Shared space spell 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 9, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { name: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 11, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 12, { name: "Kettle", cost: { candles: 50 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp29 })
			.set(1 << 13, { name: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.DoubleFive })
			.set(1 << 14, { name: "Shared space spell 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 15, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 16, { name: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 17, { name: "Quest 6", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 18, {
				name: "Potted plant",
				cost: { candles: 40 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp28,
			})
			.set(1 << 19, { name: "Quest 7", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 20, { name: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 21, { name: "Quest 8", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 22, {
				name: "Crab plushie",
				cost: { hearts: 19 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp23,
			})
			.set(1 << 23, {
				name: "Manta plushie",
				cost: { hearts: 17 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp24,
			})
			.set(1 << 24, { name: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug })
			.set(1 << 25, { name: "Shared space spell 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 26, { name: "Quest 9", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 27, { name: "Shared space spell 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 28, { name: "Quest 10", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest }),
	},
});
