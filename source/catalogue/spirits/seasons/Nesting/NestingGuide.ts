import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.NestingGuide,
	season: SeasonName.Nesting,
	offer: {
		inProgress: true,
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: "Heart 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace34 })
			.set(1 << 3, { name: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit57 })
			.set(1 << 4, {
				name: "Ultimate prop",
				cost: { seasonalHearts: 2 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp37,
			})
			.set(1 << 5, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { name: "Heart 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 7, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 8, { name: "Heart 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart }),
	},
});
