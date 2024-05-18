import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.PerformanceGuide,
	season: SeasonName.Performance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Shared memory spell 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace19 })
			.set(1 << 3, { name: "Ultimate mask", cost: { seasonalHearts: 1 }, emoji: MASK_EMOJIS.Mask59 })
			.set(1 << 4, { name: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape78 })
			.set(1 << 5, { name: "Ultimate hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair103 })
			.set(1 << 6, { name: FriendAction.HighFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.HighFive })
			.set(1 << 7, { name: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 8, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { name: "Mask", cost: { candles: 42 }, emoji: MASK_EMOJIS.Mask62 })
			.set(1 << 10, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { name: "Shared memory spell 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory })
			.set(1 << 12, { name: FriendAction.DoubleFive, cost: null, emoji: FRIEND_ACTION_EMOJIS.DoubleFive })
			.set(1 << 13, { name: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 14, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 15, { name: "Shared memory spell 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory })
			.set(1 << 16, { name: FriendAction.Hug, cost: null, emoji: FRIEND_ACTION_EMOJIS.Hug })
			.set(1 << 17, { name: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 18, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 19, { name: "Shared memory spell 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory })
			.set(1 << 20, { name: FriendAction.DuetDance, cost: null, emoji: FRIEND_ACTION_EMOJIS.DuetDance })
			.set(1 << 21, { name: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 22, {
				name: "Flower pot",
				cost: { candles: 52 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp24,
			}),
	},
});
