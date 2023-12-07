/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

export default new SeasonalSpirit({
	name: SpiritName.VestigeOfADesertedOasis,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Hair", cost: { seasonalCandles: 16 } })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 28 } })
			.set(1 << 3, { item: "Cape", cost: null })
			.set(1 << 4, { item: "Shoes", cost: { seasonalCandles: 38 } })
			.set(1 << 5, { item: "Blessing 3", cost: null })
			.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
