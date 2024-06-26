import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Angry;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.PoutyPorter,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { candles: 3 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				bit: 1 << 2,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{ name: "Hair", bit: 1 << 3, cost: { hearts: 3 }, emoji: HAIR_EMOJIS.Hair13 },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff 1",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { candles: 4 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { candles: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				bit: 1 << 8,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{ name: "Cape 1", bit: 1 << 9, cost: { hearts: 20 }, emoji: CAPE_EMOJIS.Cape05 },
			{
				name: "Wing buff 2",
				bit: 1 << 10,
				cost: { ascendedCandles: 6 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Cape 2", bit: 1 << 11, cost: { hearts: 60 }, emoji: CAPE_EMOJIS.Cape39 },
		],
	},
});
