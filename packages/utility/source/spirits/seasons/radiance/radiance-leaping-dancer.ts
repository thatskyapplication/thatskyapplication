import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Cartwheel;

export default new SeasonalSpirit({
	id: SpiritId.RadianceLeapingDancer,
	seasonId: SeasonId.Radiance,
	emote,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.Cartwheel1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.Cartwheel2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.RadianceLeapingDancerHair,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Red dye 1", cosmetic: Cosmetic.RadianceLeapingDancerRedDye1 },
			{
				name: "Red dye 2",
				cosmetic: Cosmetic.RadianceLeapingDancerRedDye2,
				cost: { seasonalCandles: 16 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.RadianceLeapingDancerProp,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.Cartwheel3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.Cartwheel4 },
			{
				name: "Red dye 3",
				cosmetic: Cosmetic.RadianceLeapingDancerRedDye3,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.RadianceLeapingDancerOutfit },
			{
				name: "Cape",
				cosmetic: Cosmetic.RadianceLeapingDancerCape,
				cost: { seasonalCandles: 28 },
			},
			{
				name: "Yellow dye 1",
				cosmetic: Cosmetic.RadianceLeapingDancerYellowDye1,
			},
			{
				name: "Yellow dye 2",
				cosmetic: Cosmetic.RadianceLeapingDancerYellowDye2,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Shoes", cosmetic: Cosmetic.RadianceLeapingDancerShoes },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RadianceLeapingDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
