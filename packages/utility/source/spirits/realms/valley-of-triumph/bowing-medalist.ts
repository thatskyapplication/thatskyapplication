import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Bow;

export default new StandardSpirit({
	id: SpiritId.BowingMedalist,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBow1 },
				{ cosmetic: Cosmetic.EmoteBow2, cost: { candles: 3 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BowingMedalistBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BowingMedalistHair,
					cost: { hearts: 5 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BowingMedalistHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BowingMedalistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteBow3, cost: { candles: 4 }, level: 3 },
				{ cosmetic: Cosmetic.EmoteBow4, cost: { candles: 4 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BowingMedalistBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.BowingMedalistFaceAccessory,
					cost: { hearts: 5 },
				},
			],
		],
	},
});
