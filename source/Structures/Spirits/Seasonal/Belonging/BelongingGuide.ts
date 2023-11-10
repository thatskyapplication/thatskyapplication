/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.BelongingGuide,
	season: SeasonName.Belonging,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Pendant", cost: null })
			.set(1 << 1, { item: "Bonfire", cost: { seasonalHearts: 6 } }),
	},
	keywords: ["bonfire"],
});
