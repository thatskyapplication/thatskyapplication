/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.RhythmGuide,
	season: SeasonName.Rhythm,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Pendant", cost: null })
			.set(1 << 1, { item: "Ultimate mask", cost: { seasonalHearts: 2 } })
			.set(1 << 2, { item: "Ultimate hair", cost: { seasonalHearts: 4 } }),
	},
});
