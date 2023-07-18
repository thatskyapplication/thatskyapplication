/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.JollyDance;

export default new SeasonalSpirit({
	name: SpiritName.JollyGeologist,
	season: Season.Moments,
	expression,
	realm: Realm.DaylightPrairie,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: null })
		.set(1 << 2, { item: "Mask accessory", cost: { seasonalCandles: 8 } })
		.set(1 << 3, { item: "Hair", cost: null })
		.set(1 << 4, { item: `${expression} 3`, cost: { seasonalCandles: 20 } })
		.set(1 << 5, { item: `${expression} 4`, cost: null })
		.set(1 << 6, { item: "Blessing 1", cost: { seasonalCandles: 28 } })
		.set(1 << 7, { item: "Blessing 2", cost: null })
		.set(1 << 8, { item: "Music sheet", cost: { seasonalCandles: 34 } })
		.set(1 << 9, { item: "Prop", cost: null })
		.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
});
