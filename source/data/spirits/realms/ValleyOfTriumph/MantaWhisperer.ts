import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic } from "../../../../Utility2/catalogue.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

const call = SpiritCall.Manta;
const callEmoji = SpiritCallToEmoji[call];

export default new StandardSpirit({
	name: SpiritName.MantaWhisperer,
	call,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallManta, emoji: callEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MantaWhispererBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MantaWhispererHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MantaWhispererWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MantaWhispererBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.MantaWhispererMusicSheet,
				cost: { hearts: 3 },
				emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
			},
		],
	},
});
