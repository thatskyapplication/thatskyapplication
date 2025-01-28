import { Cosmetic, RealmName, SpiritEmote, SpiritName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Crying;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.TearfulLightMiner,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCrying1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCrying2,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TearfulLightMinerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TearfulLightMinerHair,
				cost: { hearts: 3 },
				emoji: HAIR_EMOJIS.Hair16,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TearfulLightMinerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.TearfulLightMinerWingBuff1,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCrying3,
				cost: { candles: 4 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCrying4,
				cost: { candles: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TearfulLightMinerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.TearfulLightMinerWingBuff2,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 5`,
				cosmetic: Cosmetic.EmoteCrying5,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 6`,
				cosmetic: Cosmetic.EmoteCrying6,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
		],
	},
});
