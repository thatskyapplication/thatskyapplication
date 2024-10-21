import { StandardSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Teamwork;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.CeremonialWorshiper,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: emote, cosmetic: Cosmetic.EmoteTeamwork, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CeremonialWorshipperBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CeremonialWorshipperHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CeremonialWorshipperWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CeremonialWorshipperBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
		],
	},
});
