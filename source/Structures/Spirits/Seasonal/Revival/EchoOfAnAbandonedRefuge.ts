/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SEASON_EMOJIS, SHOE_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

export default new SeasonalSpirit({
	name: SpiritName.EchoOfAnAbandonedRefuge,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 18 } })
			.set(1 << 1, { item: "Shoes", cost: null, emoji: SHOE_EMOJIS.Shoe10 })
			.set(1 << 2, { item: "Music sheet", cost: { seasonalCandles: 24 } })
			.set(1 << 3, { item: "Blessing 2", cost: null })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 32 } })
			.set(1 << 5, { item: "Cape", cost: null })
			.set(1 << 6, { item: "Hair accessory", cost: { seasonalCandles: 42 } })
			.set(1 << 7, { item: "Blessing 4", cost: null })
			.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
