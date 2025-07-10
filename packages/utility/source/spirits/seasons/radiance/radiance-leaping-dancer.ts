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
			{ cosmetic: Cosmetic.Cartwheel1 },
			{ cosmetic: Cosmetic.Cartwheel2 },
			{
				cosmetic: Cosmetic.RadianceLeapingDancerHair,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.RadianceLeapingDancerRedDye1 },
			{
				cosmetic: Cosmetic.RadianceLeapingDancerRedDye2,
				cost: { seasonalCandles: 16 },
			},
			{
				cosmetic: Cosmetic.RadianceLeapingDancerProp,
			},
			{
				cosmetic: Cosmetic.Cartwheel3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.Cartwheel4 },
			{
				cosmetic: Cosmetic.RadianceLeapingDancerRedDye3,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.RadianceLeapingDancerOutfit },
			{
				cosmetic: Cosmetic.RadianceLeapingDancerCape,
				cost: { seasonalCandles: 28 },
			},
			{
				cosmetic: Cosmetic.RadianceLeapingDancerYellowDye1,
			},
			{
				cosmetic: Cosmetic.RadianceLeapingDancerYellowDye2,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.RadianceLeapingDancerShoes },
			{
				cosmetic: Cosmetic.RadianceLeapingDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
