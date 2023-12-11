/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, GuideSpirit, SpiritName, Expression } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.HopefulSteward,
	season: SeasonName.Revival,
	offer: {
		inProgress: true,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null })
			.set(1 << 1, { item: "Heart 1", cost: null })
			.set(1 << 2, { item: "Pendant", cost: null })
			.set(1 << 3, { item: "Ultimate hair", cost: { seasonalHearts: 2 } })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 } })
			.set(1 << 5, { item: "Quest 2", cost: null })
			.set(1 << 6, { item: "Heart 2", cost: null })
			.set(1 << 7, { item: "Quest 3", cost: null })
			.set(1 << 8, { item: "Heart 3", cost: null })
			.set(1 << 9, { item: "Quest 4", cost: null })
			.set(1 << 10, { item: "Heart 4", cost: null })
			.set(1 << 17, { item: Expression.Hug, cost: null })
			.set(1 << 11, { item: "Quest 5", cost: null })
			.set(1 << 12, { item: "Heart 5", cost: null })
			.set(1 << 13, { item: "Quest 6", cost: null })
			.set(1 << 14, { item: "Heart 6", cost: null })
			.set(1 << 15, { item: "Quest 7", cost: null })
			.set(1 << 16, { item: "Heart 7", cost: null }),
	},
});
