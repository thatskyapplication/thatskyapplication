/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.RhythmicClap;

export default new SeasonalSpirit({
	name: SpiritName.SeedOfHope,
	season: Season.Aurora,
	expression,
	realm: Realm.ValleyOfTriumph,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: null })
		.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 8 } })
		.set(1 << 3, { item: "Mask", cost: null })
		.set(1 << 4, { item: "Music sheet", cost: { seasonalCandles: 12 } })
		.set(1 << 5, { item: "Blessing 2", cost: null })
		.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 16 } })
		.set(1 << 7, { item: `${expression} 4`, cost: null })
		.set(1 << 8, { item: "Hair", cost: { seasonalCandles: 20 } })
		.set(1 << 9, { item: "Blessing 3", cost: null })
		.set(1 << 10, { item: "Blessing 4", cost: { seasonalCandles: 26 } })
		.set(1 << 11, { item: "Cape", cost: null })
		.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
});
