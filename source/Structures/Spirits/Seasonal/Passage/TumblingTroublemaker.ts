/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Somersault;

export default new SeasonalSpirit({
	name: SpiritName.TumblingTroublemaker,
	season: SeasonName.Passage,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 8 } })
			.set(1 << 3, { item: "Hair", cost: null })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 18 } })
			.set(1 << 5, { item: `${emote} 4`, cost: null })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 28 } })
			.set(1 << 7, { item: "Cape", cost: null })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 32 } })
			.set(1 << 9, { item: "Face accessory", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
