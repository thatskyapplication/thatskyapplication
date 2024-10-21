import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic } from "../../../../Utility2/catalogue.js";
import { HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

const emote = SpiritEmote.Wave;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.WavingBellmaker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWave1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteWave2,
				cost: { candles: 1 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WavingBellmakerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.WavingBellmakerHair,
				cost: { hearts: 2 },
				emoji: HAIR_EMOJIS.Hair06,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WavingBellmakerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.WavingBellmakerWingBuff1,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWave3,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteWave4,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WavingBellmakerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.WavingBellmakerMask,
				cost: { hearts: 5 },
				emoji: MASK_EMOJIS.Mask02,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.WavingBellmakerWingBuff2,
				cost: { ascendedCandles: 6 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 5`,
				cosmetic: Cosmetic.EmoteWave5,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 6`,
				cosmetic: Cosmetic.EmoteWave6,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
		],
	},
});
