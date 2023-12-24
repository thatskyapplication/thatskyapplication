/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, SEASON_EMOJIS, SHOE_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

const shoeEmoji = SHOE_EMOJIS.Shoe09;
const hairEmoji = HAIR_EMOJIS.Hair130;
const capeEmoji = CAPE_EMOJIS.Cape111;

export default new SeasonalSpirit({
	name: SpiritName.VestigeOfADesertedOasis,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Hair", cost: { seasonalCandles: 16 }, emoji: hairEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 28 } })
			.set(1 << 3, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 4, { item: "Shoes", cost: { seasonalCandles: 38 }, emoji: shoeEmoji })
			.set(1 << 5, { item: "Blessing 3", cost: null })
			.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
