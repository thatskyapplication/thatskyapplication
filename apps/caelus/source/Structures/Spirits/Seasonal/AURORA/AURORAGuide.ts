/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, GuideSpirit, SpiritName, Expression } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.AURORAGuide,
	season: Season.Aurora,
	realm: Realm.ValleyOfTriumph,
	hasInfographic: false,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: "Quest 1", cost: null })
		.set(1 << 1, { item: `${Expression.SilentClap} 2`, cost: { hearts: 3 } })
		.set(1 << 2, { item: "Pendant", cost: null })
		.set(1 << 3, { item: "Aurora hair", cost: { seasonalHearts: 1 } })
		.set(1 << 4, { item: "Ultimate outfit", cost: { seasonalHearts: 2 } })
		.set(1 << 5, { item: "Ultimate cape", cost: { seasonalHearts: 1 } })
		.set(1 << 6, { item: `${Expression.SilentClap} 1`, cost: null })
		.set(1 << 7, { item: `${Expression.SilentClap} 3`, cost: { candles: 5 } })
		.set(1 << 8, { item: `${Expression.SilentClap} 4`, cost: { hearts: 5 } })
		.set(1 << 9, { item: "Quest 2", cost: null })
		.set(1 << 10, { item: `${Expression.Conduct} 1`, cost: null })
		.set(1 << 11, { item: `${Expression.Conduct} 2`, cost: { hearts: 3 } })
		.set(1 << 12, { item: `${Expression.Conduct} 3`, cost: { candles: 5 } })
		.set(1 << 13, { item: `${Expression.Conduct} 4`, cost: { hearts: 5 } })
		.set(1 << 14, { item: "Quest 3", cost: null })
		.set(1 << 15, { item: "Heart", cost: null })
		.set(1 << 16, { item: `${Expression.Skipping} 1`, cost: null })
		.set(1 << 17, { item: `${Expression.Skipping} 2`, cost: { hearts: 3 } })
		.set(1 << 18, { item: `${Expression.Skipping} 3`, cost: { candles: 5 } })
		.set(1 << 19, { item: `${Expression.Skipping} 4`, cost: { hearts: 5 } })
		.set(1 << 20, { item: "Quest 4", cost: null })
		.set(1 << 21, { item: "Music sheet 1", cost: { candles: 20 } })
		.set(1 << 22, { item: "Quest 5", cost: null })
		.set(1 << 23, { item: "Music sheet 2", cost: { candles: 20 } })
		.set(1 << 24, { item: "Outfit", cost: { candles: 200 } })
		.set(1 << 25, { item: "Mask", cost: { candles: 50 } }),
});
