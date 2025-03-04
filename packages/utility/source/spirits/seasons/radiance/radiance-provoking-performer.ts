import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.HypeDance;

export default new SeasonalSpirit({
	id: SpiritId.RadianceProvokingPerformer,
	seasonId: SeasonId.Radiance,
	emote,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.HypeDance1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.HypeDance2 },
			{
				name: "Green dye 1",
				cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye1,
				cost: { seasonalCandles: 10 },
			},
			{
				name: "Head accessory",
				cosmetic: Cosmetic.RadianceProvokingPerformerHeadAccessory,
			},
			{
				name: "Green dye 2",
				cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye2,
				cost: { seasonalCandles: 14 },
			},
			{
				name: "Cymbals",
				cosmetic: Cosmetic.RadianceProvokingPerformerCymbals,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.HypeDance3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.HypeDance4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.RadianceProvokingPerformerOutfit,
				cost: { seasonalCandles: 24 },
			},
			{
				name: "Yellow dye 1",
				cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye1,
			},
			{
				name: "Yellow dye 2",
				cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye2,
				cost: { seasonalCandles: 32 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.RadianceProvokingPerformerCape,
			},
			{
				name: "Shoes",
				cosmetic: Cosmetic.RadianceProvokingPerformerShoes,
				cost: { seasonalCandles: 38 },
			},
			{ name: "White dye", cosmetic: Cosmetic.RadianceProvokingPerformerWhiteDye },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RadianceProvokingPerformerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
