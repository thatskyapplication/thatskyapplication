import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
			[
				{
					cosmetic: Cosmetic.InspirationOfInclusionProp1,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.InspirationOfInclusionBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.InspirationOfInclusionBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{
					cosmetic: Cosmetic.InspirationOfInclusionHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.InspirationOfInclusionProp2,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.InspirationOfInclusionBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.InspirationOfInclusionBlessing4,
					cost: { seasonalCandles: 26 },
				},
				{
					cosmetic: Cosmetic.InspirationOfInclusionNeckAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.InspirationOfInclusionOutfit,
					cost: { seasonalCandles: 36 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 5 },
					cosmetic: Cosmetic.InspirationOfInclusionBlessing5,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.InspirationOfInclusionSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
