/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.WavingLight;

export default new SeasonalSpirit({
	name: SpiritName.RunningWayfarer,
	season: Season.Aurora,
	expression,
	realm: Realm.ValleyOfTriumph,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: null })
		.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 12 } })
		.set(1 << 3, { item: "Blessing 1", cost: null })
		.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 16 } })
		.set(1 << 5, { item: "Hair", cost: null })
		.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 20 } })
		.set(1 << 7, { item: `${expression} 4`, cost: null })
		.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 24 } })
		.set(1 << 9, { item: "Music sheet", cost: null })
		.set(1 << 10, { item: "Cape", cost: { seasonalCandles: 30 } })
		.set(1 << 11, { item: "Blessing 4", cost: null })
		.set(1 << 12, { item: "Heart", cost: { seasonalCandles: 3 } }),
});
