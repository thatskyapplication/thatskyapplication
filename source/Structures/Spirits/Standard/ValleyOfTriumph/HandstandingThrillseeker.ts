/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { type ItemsData, StandardSpirit } from "../../Base.js";

const emote = SpiritEmote.Handstand;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.HandstandingThrillseeker,
	emote,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 3 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff 1", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: `${emote} 3`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 6, { item: `${emote} 4`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 7, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 8, { item: "Cape 1", cost: { hearts: 40 }, emoji: CAPE_EMOJIS.Cape08 })
			.set(1 << 9, { item: "Wing buff 2", cost: { ascendedCandles: 9 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 10, { item: "Cape 2", cost: { hearts: 120 }, emoji: CAPE_EMOJIS.Cape55 }),
	},
});
