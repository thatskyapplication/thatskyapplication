import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shocked;

export default new StandardSpirit({
	id: SpiritId.DismayedHunter,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.Shocked1 },
				{ cosmetic: Cosmetic.Shocked2, cost: { candles: 3 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.DismayedHunterBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.DismayedHunterHair,
					cost: { hearts: 5 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.DismayedHunterHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.DismayedHunterWingBuff1,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{ cosmetic: Cosmetic.Shocked3, cost: { candles: 5 }, level: 3 },
				{ cosmetic: Cosmetic.Shocked4, cost: { candles: 5 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DismayedHunterBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.DismayedHunterCape1,
					cost: { hearts: 30 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.DismayedHunterWingBuff2,
					cost: { ascendedCandles: 9 },
				},
			],
			[
				{
					cosmetic: Cosmetic.DismayedHunterCape2,
					cost: { hearts: 90 },
				},
			],
		],
	},
});
