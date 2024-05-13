/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";
import { type ItemsData, GuideSpirit } from "../../Base.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;

export default new GuideSpirit({
	name: SpiritName.AssemblyGuide,
	season: SeasonName.Assembly,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 22, { item: "Shared space spell", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace11 })
			.set(1 << 3, { item: "Ultimate mask", cost: { seasonalHearts: 1 }, emoji: MASK_EMOJIS.Mask44 })
			.set(1 << 4, { item: "Ultimate hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair77 })
			.set(1 << 5, { item: "Bugle", cost: { seasonalHearts: 2 }, emoji: HELD_PROPS_EMOJIS.HeldProp21 })
			.set(1 << 6, { item: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape52 })
			.set(1 << 7, { item: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.HighFive })
			.set(1 << 8, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { item: "Pillow", cost: { candles: 5 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp04 })
			.set(1 << 10, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { item: "Heart 2", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 12, { item: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug })
			.set(1 << 13, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 14, { item: "Jar", cost: { candles: 8 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp03 })
			.set(1 << 15, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 16, { item: "Brazier", cost: { hearts: 12 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp05 })
			.set(1 << 17, { item: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.DoubleFive })
			.set(1 << 18, { item: "Quest 6", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 19, { item: "Heart 3", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 20, {
				item: "Bookcase",
				cost: { candles: 30 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp06,
			})
			.set(1 << 21, {
				item: "Tarpaulin",
				cost: { hearts: 24 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp09,
			}),
	},
});
