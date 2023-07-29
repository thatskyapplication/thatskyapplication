/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.Tiptoeing;

export default new SeasonalSpirit({
	name: SpiritName.TiptoeingTeaBrewer,
	season: Season.Remembrance,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
			.set(1 << 3, { item: "Hair", cost: null })
			.set(1 << 4, { item: `${expression} 3`, cost: { seasonalCandles: 24 } })
			.set(1 << 5, { item: `${expression} 4`, cost: null })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 34 } })
			.set(1 << 7, { item: "Outfit", cost: null })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 38 } })
			.set(1 << 9, { item: "Blessing 2", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
