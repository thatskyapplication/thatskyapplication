/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.SideHug;

export default new SeasonalSpirit({
	name: SpiritName.ReassuringRanger,
	season: SeasonName.Moments,
	expression,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 16 } })
			.set(1 << 3, { item: "Mask accessory", cost: null })
			.set(1 << 4, { item: "Mask", cost: { seasonalCandles: 26 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: "Blessing 3", cost: { seasonalCandles: 30 } })
			.set(1 << 7, { item: "Cape", cost: null })
			.set(1 << 8, { item: "Hair accessory", cost: { seasonalCandles: 36 } })
			.set(1 << 9, { item: "Blessing 4", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
