import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.InspirationOfInclusion,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.InspirationOfInclusionProp1,
				cost: { seasonalCandles: 12 },
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionBlessing1,
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionHairAccessory,
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionProp2,
				cost: { seasonalCandles: 20 },
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionBlessing3,
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionBlessing4,
				cost: { seasonalCandles: 26 },
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionNeckAccessory,
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionOutfit,
				cost: { seasonalCandles: 36 },
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionBlessing5,
			},
			{
				cosmetic: Cosmetic.InspirationOfInclusionSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
