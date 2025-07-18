import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Proud;

export default new StandardSpirit({
	id: SpiritId.ProudVictor,
	stance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ cosmetic: Cosmetic.StanceProud },
			{
				cosmetic: Cosmetic.ProudVictorCape1,
				cost: { hearts: 10 },
			},
			{
				cosmetic: Cosmetic.ProudVictorBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.ProudVictorHeart,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
				cosmetic: Cosmetic.ProudVictorWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{
				cosmetic: Cosmetic.ProudVictorBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProudVictorMask,
				cost: { hearts: 30 },
			},
			{
				translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
				cosmetic: Cosmetic.ProudVictorWingBuff2,
				cost: { ascendedCandles: 9 },
			},
			{
				cosmetic: Cosmetic.ProudVictorCape2,
				cost: { hearts: 30 },
			},
		],
	},
});
