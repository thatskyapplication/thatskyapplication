import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CostumedConfettiCousin,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.CostumedConfettiCousinHairAccessory,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CostumedConfettiCousinBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CostumedConfettiCousinBlessing2,
					cost: { seasonalCandles: 15 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.CostumedConfettiCousinMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.CostumedConfettiCousinRedDye,
					cost: { seasonalCandles: 19 },
				},
				{ cosmetic: Cosmetic.CostumedConfettiCousinYellowDye, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.CostumedConfettiCousinBlessing3,
					cost: { seasonalCandles: 23 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.CostumedConfettiCousinOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.CostumedConfettiCousinHair,
					cost: { seasonalCandles: 25 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.CostumedConfettiCousinBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.CostumedConfettiCousinSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
