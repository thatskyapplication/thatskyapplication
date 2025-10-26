import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new StandardSpirit({
	id: SpiritId.ConfidentSightseer,
	stance: Cosmetic.StanceConfident,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.StanceConfident },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ConfidentSightseerHair,
					cost: { hearts: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ConfidentSightseerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ConfidentSightseerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ConfidentSightseerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ConfidentSightseerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ConfidentSightseerOutfit,
					cost: { hearts: 5 },
				},
			],
		],
	},
});
