import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new StandardSpirit({
	id: SpiritId.StealthySurvivor,
	stance: Cosmetic.StanceSneaky,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.StanceSneaky },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.StealthySurvivorHair,
					cost: { hearts: 5 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.StealthySurvivorBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.StealthySurvivorHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.StealthySurvivorWingBuff1,
					cost: { ascendedCandles: 4 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.StealthySurvivorBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.StealthySurvivorCape1,
					cost: { hearts: 50 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.StealthySurvivorWingBuff2,
					cost: { ascendedCandles: 12 },
				},
			],
			[
				{
					cosmetic: Cosmetic.StealthySurvivorCape2,
					cost: { hearts: 150 },
				},
			],
		],
	},
});
