import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
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
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing1,
				cost: { seasonalCandles: 18 },
				emoji: blessing3,
			},
			{ name: "Shoes", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeShoes, emoji: shoeEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeMusicSheet,
				cost: { seasonalCandles: 24 },
				emoji: musicSheet,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing3,
				cost: { seasonalCandles: 32 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeCape, emoji: capeEmoji },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeHairAccessory,
				cost: { seasonalCandles: 42 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RevivalHeart,
			},
		],
	},
});
