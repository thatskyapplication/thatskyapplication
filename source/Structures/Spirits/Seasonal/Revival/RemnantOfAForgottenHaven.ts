/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Season } from "../../../../Utility/Constants.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

export default new SeasonalSpirit({
	name: SpiritName.RemnantOfAForgottenHaven,
	season: Season.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 24 } })
			.set(1 << 1, { item: "Shoes", cost: null })
			.set(1 << 2, { item: "Cape", cost: { seasonalCandles: 32 } })
			.set(1 << 3, { item: "Blessing 2", cost: null })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 40 } })
			.set(1 << 5, { item: "Hair accessory", cost: null })
			.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
