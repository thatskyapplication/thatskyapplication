import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new StandardSpirit({
	id: SpiritId.CourageousSoldier,
	stance: Cosmetic.StanceCourageous,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.StanceCourageous },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.CourageousSoldierHair,
					cost: { hearts: 4 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CourageousSoldierBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.CourageousSoldierHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.CourageousSoldierWingBuff1,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CourageousSoldierBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.CourageousSoldierCape1,
					cost: { hearts: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.CourageousSoldierWingBuff2,
					cost: { ascendedCandles: 6 },
				},
			],
			[
				{
					cosmetic: Cosmetic.CourageousSoldierCape2,
					cost: { hearts: 45 },
				},
			],
		],
	},
});
