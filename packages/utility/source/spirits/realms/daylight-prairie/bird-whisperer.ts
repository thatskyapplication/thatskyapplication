import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Bird;

export default new StandardSpirit({
	id: SpiritId.BirdWhisperer,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ cosmetic: Cosmetic.CallBird },
			{
				cosmetic: Cosmetic.BirdWhispererMusicSheet,
				cost: { hearts: 1 },
			},
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
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.BirdWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.BirdWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.BirdWhispererHair,
				cost: { hearts: 5 },
			},
		],
	},
});
