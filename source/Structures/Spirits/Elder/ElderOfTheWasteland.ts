/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../Utility/Constants.js";
import { type ItemsData, ElderSpirit, SpiritName } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheWasteland,
	realm: Realm.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>().set(1 << 0, { item: "Hair", cost: { ascendedCandles: 6 } }),
	},
});
