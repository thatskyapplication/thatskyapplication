/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.Point;
const emoteEmoji = EMOTES_EMOJIS.Point;

export default new StandardSpirit({
	name: SpiritName.PointingCandlemaker,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 1 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Hair", cost: null })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 1 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Outfit", cost: { hearts: 4 }, emoji: OUTFIT_EMOJIS.Outfit02 })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 } }),
	},
});
