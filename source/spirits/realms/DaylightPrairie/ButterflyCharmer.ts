/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, StandardSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../Utility/spirits.js";

const emote = SpiritEmote.Butterfly;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.ButterflyCharmer,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 1 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { item: "Cape 1", cost: { hearts: 3 }, emoji: CAPE_EMOJIS.Cape04 })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff 1", cost: { ascendedCandles: 1 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Outfit", cost: { hearts: 4 }, emoji: OUTFIT_EMOJIS.Outfit04 })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 10, { item: "Wing buff 2", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 11, { item: "Cape 2", cost: { hearts: 9 }, emoji: CAPE_EMOJIS.Cape38 }),
	},
});
