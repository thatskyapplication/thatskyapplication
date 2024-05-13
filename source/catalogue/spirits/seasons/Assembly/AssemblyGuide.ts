import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;

export default new GuideSpirit({
	name: SpiritName.AssemblyGuide,
	season: SeasonName.Assembly,
	realm: RealmName.HiddenForest,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 22, { name: "Shared space spell", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace })
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Heart 1", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace11 })
			.set(1 << 3, { name: "Ultimate mask", cost: { seasonalHearts: 1 }, emoji: MASK_EMOJIS.Mask44 })
			.set(1 << 4, { name: "Ultimate hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair77 })
			.set(1 << 5, { name: "Bugle", cost: { seasonalHearts: 2 }, emoji: HELD_PROPS_EMOJIS.HeldProp21 })
			.set(1 << 6, { name: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape52 })
			.set(1 << 7, { name: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.HighFive })
			.set(1 << 8, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { name: "Pillow", cost: { candles: 5 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp04 })
			.set(1 << 10, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { name: "Heart 2", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 12, { name: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug })
			.set(1 << 13, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 14, { name: "Jar", cost: { candles: 8 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp03 })
			.set(1 << 15, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 16, { name: "Brazier", cost: { hearts: 12 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp05 })
			.set(1 << 17, { name: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.DoubleFive })
			.set(1 << 18, { name: "Quest 6", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 19, { name: "Heart 3", cost: { candles: 3 }, emoji: heartEmoji })
			.set(1 << 20, {
				name: "Bookcase",
				cost: { candles: 30 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp06,
			})
			.set(1 << 21, {
				name: "Tarpaulin",
				cost: { hearts: 24 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp09,
			}),
	},
});
