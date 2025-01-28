import { Cosmetic, RealmName, SpiritEmote, SpiritName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Angry;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.PoutyPorter,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAngry1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteAngry2,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PoutyPorterBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PoutyPorterHair,
				cost: { hearts: 3 },
				emoji: HAIR_EMOJIS.Hair13,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PoutyPorterHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.PoutyPorterWingBuff1,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAngry3,
				cost: { candles: 4 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteAngry4,
				cost: { candles: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PoutyPorterBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.PoutyPorterCape1,
				cost: { hearts: 20 },
				emoji: CAPE_EMOJIS.Cape05,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.PoutyPorterWingBuff2,
				cost: { ascendedCandles: 6 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.PoutyPorterCape2,
				cost: { hearts: 60 },
				emoji: CAPE_EMOJIS.Cape39,
			},
		],
	},
});
