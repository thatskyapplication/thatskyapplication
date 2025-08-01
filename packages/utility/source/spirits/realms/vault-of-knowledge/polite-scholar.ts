import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Polite;

export default new StandardSpirit({
	id: SpiritId.PoliteScholar,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.StancePolite },
				{
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
					cosmetic: Cosmetic.PoliteScholarHair,
					cost: { hearts: 15 },
				},
			],
		],
	},
});
