import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Salute;

export default new StandardSpirit({
	id: SpiritId.SalutingCaptain,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteSalute1 },
				{
					cosmetic: Cosmetic.EmoteSalute2,
					cost: { candles: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SalutingCaptainBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SalutingCaptainHair,
					cost: { hearts: 5 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SalutingCaptainHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SalutingCaptainWingBuff,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSalute3,
					cost: { candles: 5 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteSalute4,
					cost: { candles: 5 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SalutingCaptainBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.SalutingCaptainFireworksStaff,
					cost: { hearts: 20 },
				},
			],
		],
	},
});
