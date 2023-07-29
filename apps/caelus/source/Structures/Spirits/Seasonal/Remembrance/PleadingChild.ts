/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.Pleading;

export default new SeasonalSpirit({
	name: SpiritName.PleadingChild,
	season: Season.Remembrance,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Neck accessory", cost: { seasonalCandles: 16 } })
			.set(1 << 3, { item: "Blessing 1", cost: null })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 20 } })
			.set(1 << 5, { item: "Hair", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 26 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Outfit", cost: { seasonalCandles: 36 } })
			.set(1 << 9, { item: "Blessing 2", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
