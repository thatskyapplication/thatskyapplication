/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.HideAndSeek;
const emoteEmoji = EMOTES_EMOJIS.HideAndSeek;

export default new StandardSpirit({
	name: SpiritName.HideNSeekPioneer,
	emote,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: emote, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: "Hair", cost: { hearts: 2 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff 1", cost: { ascendedCandles: 3 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Mask", cost: { hearts: 20 } })
			.set(1 << 7, { item: "Wing buff 2", cost: { ascendedCandles: 6 } })
			.set(1 << 8, { item: "Outfit", cost: { hearts: 15 } }),
	},
});
