/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.Grieving;

export default new SeasonalSpirit({
	name: SpiritName.BereftVeteran,
	season: SeasonName.Remembrance,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 6 } })
			.set(1 << 3, { item: "Blessing 1", cost: null })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 18 } })
			.set(1 << 5, { item: "Hair", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 30 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 34 } })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
