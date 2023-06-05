/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.Gloat;

export default new SeasonalSpirit({
	name: SpiritName.GloatingNarcissist,
	season: Season.LittlePrince,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: null })
		.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
		.set(1 << 3, { item: "Music sheet", cost: null })
		.set(1 << 4, { item: `${expression} 3`, cost: { seasonalCandles: 18 } })
		.set(1 << 5, { item: `${expression} 4`, cost: null })
		.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 22 } })
		.set(1 << 7, { item: "Outfit", cost: null })
		.set(1 << 8, { item: "Hair", cost: { seasonalCandles: 26 } })
		.set(1 << 9, { item: "Blessing 3", cost: null })
		.set(1 << 10, { item: "Heart", cost: { seasonalCandles: 3 } }),
});
