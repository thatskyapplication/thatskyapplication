import { StandardSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../utility/spirits.js";

const call = SpiritCall.Whale;
const callEmoji = SpiritCallToEmoji[call];

export default new StandardSpirit({
	name: SpiritName.WhaleWhisperer,
	call,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallWhale, emoji: callEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WhaleWhispererBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WhaleWhispererHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.WhaleWhispererWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WhaleWhispererBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WhaleWhispererMusicSheet,
				cost: { hearts: 2 },
				emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
			},
		],
	},
});
