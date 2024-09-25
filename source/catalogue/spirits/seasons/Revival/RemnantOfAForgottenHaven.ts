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
const shoeEmoji = SHOE_EMOJIS.Shoe11;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory31;
const capeEmoji = CAPE_EMOJIS.Cape113;

export default new SeasonalSpirit({
	name: SpiritName.RemnantOfAForgottenHaven,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing1,
				cost: { seasonalCandles: 24 },
				emoji: blessing3,
			},
			{ name: "Shoes", cosmetic: Cosmetic.RemnantOfAForgottenHavenShoes, emoji: shoeEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenCape,
				cost: { seasonalCandles: 32 },
				emoji: capeEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing2,
				emoji: blessing3,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing3,
				cost: { seasonalCandles: 40 },
				emoji: blessing3,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenHairAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RevivalHeart,
			},
		],
	},
});
