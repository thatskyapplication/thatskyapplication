import { SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const shoeEmoji = SHOE_EMOJIS.Shoe09;
const hairEmoji = HAIR_EMOJIS.Hair130;
const capeEmoji = CAPE_EMOJIS.Cape111;

export default new SeasonalSpirit({
	name: SpiritName.VestigeOfADesertedOasis,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Hair",
				cosmetic: Cosmetic.VestigeOfADesertedOasisHair,
				cost: { seasonalCandles: 16 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing2,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.VestigeOfADesertedOasisCape, emoji: capeEmoji },
			{
				name: "Shoes",
				cosmetic: Cosmetic.VestigeOfADesertedOasisShoes,
				cost: { seasonalCandles: 38 },
				emoji: shoeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.VestigeOfADesertedOasisSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RevivalHeart,
			},
		],
	},
});
