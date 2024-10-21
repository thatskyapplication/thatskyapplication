import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic } from "../../../../Utility2/catalogue.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

const emote = SpiritEmote.Point;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.PointingCandlemaker,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePoint1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmotePoint2,
				cost: { candles: 1 },
				emoji: emoteEmoji,
			},
			{ name: "Hair", cosmetic: Cosmetic.PointingCandlemakerHair, emoji: HAIR_EMOJIS.Hair02 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PointingCandlemakerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PointingCandlemakerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PointingCandlemakerWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePoint3,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmotePoint4,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.PointingCandlemakerOutfit,
				cost: { hearts: 4 },
				emoji: OUTFIT_EMOJIS.Outfit02,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PointingCandlemakerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
		],
	},
});
