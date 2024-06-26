import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Teamwork;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.CeremonialWorshiper,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: emote, bit: 1 << 0, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				bit: 1 << 1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{ name: "Heart", bit: 1 << 2, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 3,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				bit: 1 << 4,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
		],
	},
});
