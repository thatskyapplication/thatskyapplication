/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, SEASON_EMOJIS, SHOE_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

const shoeEmoji = SHOE_EMOJIS.Shoe11;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory31;
const capeEmoji = CAPE_EMOJIS.Cape113;

export default new SeasonalSpirit({
	name: SpiritName.RemnantOfAForgottenHaven,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 24 } })
			.set(1 << 1, { item: "Shoes", cost: null, emoji: shoeEmoji })
			.set(1 << 2, { item: "Cape", cost: { seasonalCandles: 32 }, emoji: capeEmoji })
			.set(1 << 3, { item: "Blessing 2", cost: null })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 40 } })
			.set(1 << 5, { item: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 6, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
