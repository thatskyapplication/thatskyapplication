/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.PassageGuide,
	season: SeasonName.Passage,
	realm: Realm.IslesOfDawn,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 } })
			.set(1 << 2, { item: "Pendant", cost: null })
			.set(1 << 3, { item: "Ultimate mask", cost: { seasonalHearts: 2 } })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 } })
			.set(1 << 5, { item: "Quest 2", cost: null })
			.set(1 << 6, { item: "Serow mask", cost: { candles: 48 } })
			.set(1 << 7, { item: "Quest 3", cost: null })
			.set(1 << 8, { item: "Heart 2", cost: { candles: 3 } })
			.set(1 << 9, { item: "Boar mask", cost: { candles: 44 } })
			.set(1 << 10, { item: "Quest 4", cost: null })
			.set(1 << 11, { item: "Heart 3", cost: { candles: 3 } })
			.set(1 << 12, { item: "Monkey mask", cost: { candles: 46 } })
			.set(1 << 13, { item: "Quest 5", cost: null })
			.set(1 << 14, { item: "Heart 4", cost: { candles: 3 } })
			.set(1 << 15, { item: "Hacky sack", cost: { hearts: 39 } })
			.set(1 << 16, { item: "Racoon mask", cost: { candles: 52 } }),
	},
});
