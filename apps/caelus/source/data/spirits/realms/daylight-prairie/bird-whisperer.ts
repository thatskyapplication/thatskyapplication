import { Cosmetic, RealmName, SpiritCall, SpiritName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritCallToEmoji } from "../../../../utility/spirits.js";

const call = SpiritCall.Bird;
const callEmoji = SpiritCallToEmoji[call];

export default new StandardSpirit({
	name: SpiritName.BirdWhisperer,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallBird, emoji: callEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BirdWhispererMusicSheet,
				cost: { hearts: 1 },
				emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BirdWhispererBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BirdWhispererHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BirdWhispererWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BirdWhispererBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BirdWhispererHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair09,
			},
		],
	},
});
