/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../Utility/Constants.js";
import { SpiritName, ElderSpirit, type ItemsData } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheIsle,
	realm: Realm.IslesOfDawn,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: "Hair", cost: { ascendedCandles: 4 } })
		.set(1 << 1, { item: "Mask", cost: { ascendedCandles: 125 } }),
});
