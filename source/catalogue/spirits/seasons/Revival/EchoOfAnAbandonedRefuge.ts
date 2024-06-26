import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

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
		seasonal: [
			{ name: "Blessing 1", bit: 1 << 0, cost: { seasonalCandles: 18 }, emoji: blessing3 },
			{ name: "Shoes", bit: 1 << 1, emoji: shoeEmoji },
			{ name: "Music sheet", bit: 1 << 2, cost: { seasonalCandles: 24 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 4, cost: { seasonalCandles: 32 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 5, emoji: capeEmoji },
			{
				name: "Hair accessory",
				bit: 1 << 6,
				cost: { seasonalCandles: 42 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 4", bit: 1 << 7, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 8,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RevivalHeart,
			},
		],
	},
});
