/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, GuideSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import {
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { FriendAction, SpiritName } from "../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RemembranceGuide,
	season: SeasonName.Remembrance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace25 })
			.set(1 << 3, { item: "Ultimate neck accessory", cost: { seasonalHearts: 2 }, emoji: NECKLACE_EMOJIS.Necklace27 })
			.set(1 << 4, {
				item: "Ultimate prop",
				cost: { seasonalHearts: 2 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp30,
			})
			.set(1 << 5, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { item: "Chimes", cost: { candles: 30 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp22 })
			.set(1 << 7, { item: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.HighFive })
			.set(1 << 8, { item: "Shared space spell 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 9, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { item: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 11, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 12, { item: "Kettle", cost: { candles: 50 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp29 })
			.set(1 << 13, { item: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.DoubleFive })
			.set(1 << 14, { item: "Shared space spell 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 15, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 16, { item: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 17, { item: "Quest 6", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 18, {
				item: "Potted plant",
				cost: { candles: 40 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp28,
			})
			.set(1 << 19, { item: "Quest 7", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 20, { item: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 21, { item: "Quest 8", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 22, {
				item: "Crab plushie",
				cost: { hearts: 19 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp23,
			})
			.set(1 << 23, {
				item: "Manta plushie",
				cost: { hearts: 17 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp24,
			})
			.set(1 << 24, { item: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug })
			.set(1 << 25, { item: "Shared space spell 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 26, { item: "Quest 9", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 27, { item: "Shared space spell 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 28, { item: "Quest 10", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest }),
	},
});
