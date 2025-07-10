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
			{ cosmetic: Cosmetic.HypeDance1 },
			{ cosmetic: Cosmetic.HypeDance2 },
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye1,
				cost: { seasonalCandles: 10 },
			},
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerHeadAccessory,
			},
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye2,
				cost: { seasonalCandles: 14 },
			},
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerCymbals,
			},
			{
				cosmetic: Cosmetic.HypeDance3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.HypeDance4 },
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerOutfit,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye1,
			},
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye2,
				cost: { seasonalCandles: 32 },
			},
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerCape,
			},
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerShoes,
				cost: { seasonalCandles: 38 },
			},
			{ cosmetic: Cosmetic.RadianceProvokingPerformerWhiteDye },
			{
				cosmetic: Cosmetic.RadianceProvokingPerformerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
