import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ThePianistsBeginnings,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ThePianistsBeginningsBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					cosmetic: Cosmetic.ThePianistsBeginningsProp1,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ThePianistsBeginningsHair,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ThePianistsBeginningsBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ThePianistsBeginningsBlessing3,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ThePianistsBeginningsOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ThePianistsBeginningsProp2,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.ThePianistsBeginningsBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ThePianistsBeginningsSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
