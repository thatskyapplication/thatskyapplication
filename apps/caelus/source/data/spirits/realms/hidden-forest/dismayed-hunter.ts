import { Cosmetic, RealmName, SpiritEmote, SpiritName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Shocked;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.DismayedHunter,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.Shocked1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.Shocked2, cost: { candles: 3 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DismayedHunterBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DismayedHunterHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair14,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DismayedHunterHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.DismayedHunterWingBuff1,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.Shocked3, cost: { candles: 5 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, cosmetic: Cosmetic.Shocked4, cost: { candles: 5 }, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DismayedHunterBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.DismayedHunterCape1,
				cost: { hearts: 30 },
				emoji: CAPE_EMOJIS.Cape06,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.DismayedHunterWingBuff2,
				cost: { ascendedCandles: 9 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.DismayedHunterCape2,
				cost: { hearts: 90 },
				emoji: CAPE_EMOJIS.Cape50,
			},
		],
	},
});
