import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.WoodcuttingPleafulParent,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.WoodcuttingPleafulParentMusicSheet,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WoodcuttingPleafulParentBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WoodcuttingPleafulParentBlessing2,
					cost: { seasonalCandles: 15 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.WoodcuttingPleafulParentShoes,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.WoodcuttingPleafulParentGreenDye1,
					cost: { seasonalCandles: 18 },
				},
				{ cosmetic: Cosmetic.WoodcuttingPleafulParentGreenDye2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.WoodcuttingPleafulParentOutfit,
					cost: { seasonalCandles: 23 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.WoodcuttingPleafulParentBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.WoodcuttingPleafulParentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
