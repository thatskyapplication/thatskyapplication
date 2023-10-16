/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Season } from "../../../../Utility/Constants.js";
import { type ItemsData, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.HopefulSteward,
	season: Season.Revival,
	offer: {
		inProgress: true,
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null })
			.set(1 << 1, { item: "Heart 1", cost: null })
			.set(1 << 2, { item: "Pendant", cost: null })
			.set(1 << 3, { item: "Ultimate hair", cost: { seasonalHearts: 2 } })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 } }),
	},
});
