import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new StandardSpirit({
	id: SpiritId.WhaleWhisperer,
	call: Cosmetic.CallWhale,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[{ cosmetic: Cosmetic.CallWhale }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WhaleWhispererBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.WhaleWhispererHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.WhaleWhispererWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WhaleWhispererBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.WhaleWhispererMusicSheet,
					cost: { hearts: 2 },
				},
			],
		],
	},
});
