import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Butterfly;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.ButterflyCharmer,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteButterfly1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteButterfly2,
				cost: { candles: 1 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ButterflyCharmerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.ButterflyCharmerCape1,
				cost: { hearts: 3 },
				emoji: CAPE_EMOJIS.Cape04,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ButterflyCharmerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.ButterflyCharmerWingBuff1,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteButterfly3,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteButterfly4,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ButterflyCharmerOutfit,
				cost: { hearts: 4 },
				emoji: OUTFIT_EMOJIS.Outfit04,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ButterflyCharmerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.ButterflyCharmerWingBuff2,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.ButterflyCharmerCape2,
				cost: { hearts: 9 },
				emoji: CAPE_EMOJIS.Cape38,
			},
		],
	},
});
