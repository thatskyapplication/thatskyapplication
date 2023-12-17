/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.Crying;
const emoteEmoji = EMOTES_EMOJIS.Crying;

export default new StandardSpirit({
	name: SpiritName.TearfulLightMiner,
	emote,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 3 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Hair", cost: { hearts: 3 }, emoji: HAIR_EMOJIS.Hair16 })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff 1", cost: { ascendedCandles: 1 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Wing buff 2", cost: { ascendedCandles: 3 } })
			.set(1 << 10, { item: `${emote} 5`, cost: { candles: 5 }, emoji: emoteEmoji })
			.set(1 << 11, { item: `${emote} 6`, cost: { candles: 5 }, emoji: emoteEmoji }),
	},
});
