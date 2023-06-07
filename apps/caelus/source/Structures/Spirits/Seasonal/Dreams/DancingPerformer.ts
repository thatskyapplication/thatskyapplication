/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.ShowDance;

export default new SeasonalSpirit({
	name: SpiritName.DancingPerformer,
	season: Season.Dreams,
	expression,
	realm: Realm.ValleyOfTriumph,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: null })
		.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 12 } })
		.set(1 << 3, { item: "Hair", cost: null })
		.set(1 << 4, { item: `${expression} 3`, cost: { seasonalCandles: 16 } })
		.set(1 << 5, { item: `${expression} 4`, cost: null })
		.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 21 } })
		.set(1 << 7, { item: "Mask", cost: null })
		.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 27 } })
		.set(1 << 9, { item: "Lute", cost: null })
		.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
});
