/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS, SHOE_EMOJIS } from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritName } from "../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
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
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 3, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 4, { item: "Shoes", cost: { seasonalCandles: 38 }, emoji: shoeEmoji })
			.set(1 << 5, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
