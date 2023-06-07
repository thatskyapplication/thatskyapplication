/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, SeasonalSpirit, SpiritName, Stance } from "../../Base.js";

const stance = Stance.Injured;

export default new SeasonalSpirit({
	name: SpiritName.WoundedWarrior,
	season: Season.Remembrance,
	stance,
	realm: Realm.VaultOfKnowledge,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${stance} stance`, cost: null })
		.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
		.set(1 << 2, { item: "Mask", cost: null })
		.set(1 << 3, { item: "Outfit", cost: { seasonalCandles: 30 } })
		.set(1 << 4, { item: "Blessing 2", cost: null })
		.set(1 << 5, { item: "Blessing 3", cost: { seasonalCandles: 36 } })
		.set(1 << 6, { item: "Cape", cost: null })
		.set(1 << 7, { item: "Heart", cost: { seasonalCandles: 3 } }),
});
