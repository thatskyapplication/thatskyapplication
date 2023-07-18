/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { type ItemsData, Stance, SpiritName, StandardSpirit } from "../../Base.js";

const stance = Stance.Confident;

export default new StandardSpirit({
	name: SpiritName.ConfidentSightseer,
	stance,
	realm: Realm.ValleyOfTriumph,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${stance} stance`, cost: null })
		.set(1 << 1, { item: "Hair", cost: { hearts: 2 } })
		.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
		.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 6, { item: "Outfit", cost: { hearts: 5 } }),
});
