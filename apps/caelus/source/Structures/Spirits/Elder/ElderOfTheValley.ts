/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../Utility/Constants.js";
import { SpiritName, ElderSpirit, type ItemsData } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheValley,
	realm: Realm.ValleyOfTriumph,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: "Hair1", cost: { ascendedCandles: 5 } })
		.set(1 << 1, { item: "Hair2", cost: { ascendedCandles: 6 } }),
});
