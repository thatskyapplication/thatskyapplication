import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Wave;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.WavingBellmaker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { candles: 1 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				bit: 1 << 2,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{ name: "Hair", bit: 1 << 3, cost: { hearts: 2 }, emoji: HAIR_EMOJIS.Hair06 },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff 1",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { candles: 2 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { candles: 2 }, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				bit: 1 << 8,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{ name: "Mask", bit: 1 << 9, cost: { hearts: 5 }, emoji: MASK_EMOJIS.Mask02 },
			{
				name: "Wing buff 2",
				bit: 1 << 10,
				cost: { ascendedCandles: 6 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 5`, bit: 1 << 11, cost: { candles: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 6`, bit: 1 << 12, cost: { candles: 3 }, emoji: emoteEmoji },
		],
	},
});
