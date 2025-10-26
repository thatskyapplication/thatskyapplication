import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TheCellistsBeginnings,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TheCellistsBeginningsHair,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TheCellistsBeginningsBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TheCellistsBeginningsBlessing2,
					cost: { seasonalCandles: 26 },
				},
				{
					cosmetic: Cosmetic.TheCellistsBeginningsProp,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TheCellistsBeginningsOutfit,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.TheCellistsBeginningsBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TheCellistsBeginningsSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
