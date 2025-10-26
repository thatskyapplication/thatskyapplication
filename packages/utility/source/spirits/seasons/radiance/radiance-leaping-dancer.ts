import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
			[
				{ cosmetic: Cosmetic.Cartwheel1 },
				{ cosmetic: Cosmetic.Cartwheel2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.RadianceLeapingDancerHair,
					cost: { seasonalCandles: 12 },
				},
				{ cosmetic: Cosmetic.RadianceLeapingDancerRedDye1, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.RadianceLeapingDancerRedDye2,
					cost: { seasonalCandles: 16 },
				},
				{
					cosmetic: Cosmetic.RadianceLeapingDancerProp,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.Cartwheel3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.Cartwheel4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.RadianceLeapingDancerRedDye3,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.RadianceLeapingDancerOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.RadianceLeapingDancerCape,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.RadianceLeapingDancerYellowDye1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.RadianceLeapingDancerYellowDye2,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.RadianceLeapingDancerShoes,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.RadianceLeapingDancerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
