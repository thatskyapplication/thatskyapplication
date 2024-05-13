/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.SpiritOfMural,
	season: SeasonName.NineColoredDeer,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Heart 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace33 })
			.set(1 << 3, { name: "Ultimate hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair136 })
			.set(1 << 4, { name: "Ultimate outfit", cost: { seasonalHearts: 1 }, emoji: OUTFIT_EMOJIS.Outfit52 })
			.set(1 << 5, { name: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape121 })
			.set(1 << 6, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 7, { name: "Heart 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 8, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 9, { name: "Hair accessory", cost: null, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory35 })
			.set(1 << 10, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { name: "Heart 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 12, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 13, { name: "Mask", cost: null, emoji: MASK_EMOJIS.Mask86 }),
	},
});
