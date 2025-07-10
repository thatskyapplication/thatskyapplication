import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Whale;

export default new StandardSpirit({
	id: SpiritId.WhaleWhisperer,
	call,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ cosmetic: Cosmetic.CallWhale },
			{
				cosmetic: Cosmetic.WhaleWhispererBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.WhaleWhispererHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.WhaleWhispererWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				cosmetic: Cosmetic.WhaleWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.WhaleWhispererMusicSheet,
				cost: { hearts: 2 },
			},
		],
	},
});
