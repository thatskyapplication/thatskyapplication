import { Cosmetic, RealmName, SpiritEmote, SpiritName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Come;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.UsheringStargazer,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCome1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCome2,
				cost: { candles: 1 },
				emoji: emoteEmoji,
			},
			{ name: "Hair", cosmetic: Cosmetic.UsheringStargazerHair, emoji: HAIR_EMOJIS.Hair03 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.UsheringStargazerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.UsheringStargazerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.UsheringStargazerWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCome3,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCome4,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.UsheringStargazerOutfit,
				cost: { hearts: 4 },
				emoji: OUTFIT_EMOJIS.Outfit03,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.UsheringStargazerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
		],
	},
});
