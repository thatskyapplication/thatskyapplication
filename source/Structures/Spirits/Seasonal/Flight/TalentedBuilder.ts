/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.Voilà;

export default new SeasonalSpirit({
	name: SpiritName.TalentedBuilder,
	season: Season.Flight,
	expression,
	realm: Realm.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 10 } })
			.set(1 << 3, { item: "Music sheet", cost: null })
			.set(1 << 4, { item: "Neck accessory", cost: { seasonalCandles: 16 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 22 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Trail spell 1", cost: { seasonalCandles: 24 } })
			.set(1 << 9, { item: "Outfit", cost: null })
			.set(1 << 10, { item: "Hair", cost: { seasonalCandles: 26 } })
			.set(1 << 11, { item: "Trail spell 2", cost: null })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
