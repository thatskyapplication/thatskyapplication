/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit50;
const hairEmoji = HAIR_EMOJIS.Hair131;
const capeEmoji = CAPE_EMOJIS.Cape114;

export default new SeasonalSpirit({
	name: SpiritName.MemoryOfALostVillage,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 20 }, emoji: blessing3 })
			.set(1 << 1, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 2, { item: "Outfit", cost: { seasonalCandles: 32 }, emoji: outfitEmoji })
			.set(1 << 3, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 38 }, emoji: blessing3 })
			.set(1 << 5, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
