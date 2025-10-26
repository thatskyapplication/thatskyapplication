import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new StandardSpirit({
	id: SpiritId.PoliteScholar,
	stance: Cosmetic.StancePolite,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.StancePolite },
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PoliteScholarOutfit,
					cost: { hearts: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PoliteScholarBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PoliteScholarHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PoliteScholarWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PoliteScholarBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PoliteScholarHair,
					cost: { hearts: 15 },
				},
			],
		],
	},
});
