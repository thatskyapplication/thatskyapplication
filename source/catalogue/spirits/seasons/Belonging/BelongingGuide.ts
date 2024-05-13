/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { NECKLACE_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.BelongingGuide,
	season: SeasonName.Belonging,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace03 })
			.set(1 << 1, {
				name: "Bonfire",
				cost: { seasonalHearts: 6 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp02,
			}),
	},
	keywords: ["bonfire"],
});
