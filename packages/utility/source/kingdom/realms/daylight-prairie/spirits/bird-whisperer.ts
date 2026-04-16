import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { StandardSpirit } from "../../../../models/spirits.js";
import { SpiritId } from "../../../../utility/spirits.js";
import { AreaName } from "../../../geography.js";

export default new StandardSpirit({
	id: SpiritId.BirdWhisperer,
	call: Cosmetic.CallBird,
	area: AreaName.BirdNest,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.CallBird },
				{
					cosmetic: Cosmetic.BirdWhispererMusicSheet,
					cost: { hearts: 1 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BirdWhispererBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BirdWhispererHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BirdWhispererWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BirdWhispererBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BirdWhispererHair,
					cost: { hearts: 5 },
				},
			],
		],
	},
});
