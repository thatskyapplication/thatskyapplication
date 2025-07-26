import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Manta;

export default new StandardSpirit({
	id: SpiritId.MantaWhisperer,
	call,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			[{ cosmetic: Cosmetic.CallManta }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MantaWhispererBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.MantaWhispererHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.MantaWhispererWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MantaWhispererBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.MantaWhispererMusicSheet,
					cost: { hearts: 3 },
				},
			],
		],
	},
});
