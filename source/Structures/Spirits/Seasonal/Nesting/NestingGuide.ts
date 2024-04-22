/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import {
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.NestingGuide,
	season: SeasonName.Nesting,
	offer: {
		inProgress: true,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace34 })
			.set(1 << 3, { item: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit57 })
			.set(1 << 4, {
				item: "Ultimate prop",
				cost: { seasonalHearts: 2 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp37,
			})
			.set(1 << 5, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { item: "Heart 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart }),
	},
});
