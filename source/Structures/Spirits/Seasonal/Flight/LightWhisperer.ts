/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Call, SeasonalSpirit, SpiritName } from "../../Base.js";

const call = Call.BabyManta;

export default new SeasonalSpirit({
	name: SpiritName.LightWhisperer,
	season: SeasonName.Flight,
	call,
	realm: Realm.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
			.set(1 << 2, { item: "Hair accessory", cost: null })
			.set(1 << 3, { item: "Hair", cost: { seasonalCandles: 22 } })
			.set(1 << 4, { item: "Blessing 2", cost: null })
			.set(1 << 5, { item: "Trail spell 1", cost: { seasonalCandles: 26 } })
			.set(1 << 6, { item: "Cape", cost: null })
			.set(1 << 7, { item: "Outfit", cost: { seasonalCandles: 28 } })
			.set(1 << 8, { item: "Trail spell 2", cost: null })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
