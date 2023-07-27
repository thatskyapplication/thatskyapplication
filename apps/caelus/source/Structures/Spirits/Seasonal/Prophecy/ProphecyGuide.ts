/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, GuideSpirit, Expression, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.ProphecyGuide,
	season: Season.Prophecy,
	realm: Realm.IslesOfDawn,
	hasInfographic: false,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: "Quest 1", cost: null })
		.set(1 << 1, { item: "Heart 1", cost: { candles: 3 } })
		.set(1 << 2, { item: "Pendant", cost: null })
		.set(1 << 3, { item: "Dunun", cost: { seasonalHearts: 2 } })
		.set(1 << 4, { item: "Anubis mask", cost: { seasonalHearts: 2 } })
		.set(1 << 5, { item: "Quest 2", cost: null })
		.set(1 << 6, { item: "Heart 2", cost: { candles: 3 } })
		.set(1 << 7, { item: "Quest 3", cost: null })
		.set(1 << 8, { item: "Heart 3", cost: { candles: 3 } })
		.set(1 << 9, { item: "Quest 4", cost: null })
		.set(1 << 10, { item: "Heart 4", cost: { candles: 3 } })
		.set(1 << 11, { item: Expression.Hug, cost: null }),
});
