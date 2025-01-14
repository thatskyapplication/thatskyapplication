import { RealmName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Salute;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.SalutingCaptain,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSalute1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSalute2,
				cost: { candles: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SalutingCaptainBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SalutingCaptainHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair25,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SalutingCaptainHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SalutingCaptainWingBuff,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSalute3,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSalute4,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SalutingCaptainBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Fireworks staff",
				cosmetic: Cosmetic.SalutingCaptainFireworksStaff,
				cost: { hearts: 20 },
				emoji: HELD_PROPS_EMOJIS.HeldProp06,
			},
		],
	},
});
