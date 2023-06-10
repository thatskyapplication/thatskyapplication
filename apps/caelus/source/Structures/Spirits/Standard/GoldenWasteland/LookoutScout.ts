/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SpiritName, StandardSpirit } from "../../Base.js";

const expression = Expression.LookAround;

export default new StandardSpirit({
	name: SpiritName.LookoutScout,
	expression,
	realm: Realm.GoldenWasteland,
	hasInfographic: false,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: { candles: 5 } })
		.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
		.set(1 << 3, { item: "Horn", cost: { hearts: 5 } })
		.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 6, { item: `${expression} 3`, cost: { candles: 5 } })
		.set(1 << 7, { item: `${expression} 4`, cost: { candles: 5 } })
		.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 9, { item: "Mask", cost: { hearts: 10 } }),
});
