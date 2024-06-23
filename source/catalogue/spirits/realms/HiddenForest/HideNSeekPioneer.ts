import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.HideAndSeek;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.HideNSeekPioneer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: emote, bit: 1 << 0, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 1, cost: { hearts: 2 }, emoji: HAIR_EMOJIS.Hair12 },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff 1", bit: 1 << 4, cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 },
			{ name: "Mask", bit: 1 << 6, cost: { hearts: 20 }, emoji: MASK_EMOJIS.Mask03 },
			{ name: "Wing buff 2", bit: 1 << 7, cost: { ascendedCandles: 6 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Outfit", bit: 1 << 8, cost: { hearts: 15 }, emoji: OUTFIT_EMOJIS.Outfit06 },
		],
	},
});
