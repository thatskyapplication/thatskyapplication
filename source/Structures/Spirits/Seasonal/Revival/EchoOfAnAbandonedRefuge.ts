/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season/index.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const shoeEmoji = SHOE_EMOJIS.Shoe10;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory30;
const capeEmoji = CAPE_EMOJIS.Cape112;

export default new SeasonalSpirit({
	name: SpiritName.EchoOfAnAbandonedRefuge,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 18 }, emoji: blessing3 })
			.set(1 << 1, { item: "Shoes", cost: null, emoji: shoeEmoji })
			.set(1 << 2, { item: "Music sheet", cost: { seasonalCandles: 24 }, emoji: musicSheet })
			.set(1 << 3, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 32 }, emoji: blessing3 })
			.set(1 << 5, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 6, { item: "Hair accessory", cost: { seasonalCandles: 42 }, emoji: hairAccessoryEmoji })
			.set(1 << 7, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart }),
	},
});
