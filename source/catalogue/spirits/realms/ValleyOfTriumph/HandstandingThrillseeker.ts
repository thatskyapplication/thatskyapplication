import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic } from "../../../../Utility/catalogue.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Handstand;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.HandstandingThrillseeker,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHandstand1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHandstand2,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HandstandingThrillseekerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HandstandingThrillseekerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.HandstandingThrillseekerWingBuff1,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHandstand3,
				cost: { candles: 4 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHandstand4,
				cost: { candles: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HandstandingThrillseekerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.HandstandingThrillseekerCape1,
				cost: { hearts: 40 },
				emoji: CAPE_EMOJIS.Cape08,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.HandstandingThrillseekerWingBuff2,
				cost: { ascendedCandles: 9 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.HandstandingThrillseekerCape2,
				cost: { hearts: 120 },
				emoji: CAPE_EMOJIS.Cape55,
			},
		],
	},
});
