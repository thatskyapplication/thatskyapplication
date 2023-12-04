/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.Wave;

export default new StandardSpirit({
	name: SpiritName.WavingBellmaker,
	emote,
	realm: Realm.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 1 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Hair", cost: { hearts: 2 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff 1", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { candles: 2 } })
			.set(1 << 7, { item: `${emote} 4`, cost: { candles: 2 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Mask", cost: { hearts: 5 } })
			.set(1 << 10, { item: "Wing buff 2", cost: { ascendedCandles: 6 } })
			.set(1 << 11, { item: `${emote} 5`, cost: { candles: 3 } })
			.set(1 << 12, { item: `${emote} 6`, cost: { candles: 3 } }),
	},
});
