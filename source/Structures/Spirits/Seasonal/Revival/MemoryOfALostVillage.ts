/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { OUTFIT_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

const outfitEmoji = OUTFIT_EMOJIS.Outfit50;

export default new SeasonalSpirit({
	name: SpiritName.MemoryOfALostVillage,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 20 } })
			.set(1 << 1, { item: "Cape", cost: null })
			.set(1 << 2, { item: "Outfit", cost: { seasonalCandles: 32 }, emoji: outfitEmoji })
			.set(1 << 3, { item: "Blessing 2", cost: null })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 38 } })
			.set(1 << 5, { item: "Hair", cost: null })
			.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
