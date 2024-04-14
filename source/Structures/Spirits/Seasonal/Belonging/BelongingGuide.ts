/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { NECKLACE_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.BelongingGuide,
	season: SeasonName.Belonging,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace03 })
			.set(1 << 1, {
				item: "Bonfire",
				cost: { seasonalHearts: 6 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp02,
			}),
	},
	keywords: ["bonfire"],
});
