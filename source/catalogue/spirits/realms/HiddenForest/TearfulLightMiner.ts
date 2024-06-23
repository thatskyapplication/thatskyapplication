import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Crying;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.TearfulLightMiner,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { candles: 3 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { name: "Hair", cost: { hearts: 3 }, emoji: HAIR_EMOJIS.Hair16 })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff 1", cost: { ascendedCandles: 1 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 9, { name: "Wing buff 2", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 10, { name: `${emote} 5`, cost: { candles: 5 }, emoji: emoteEmoji })
			.set(1 << 11, { name: `${emote} 6`, cost: { candles: 5 }, emoji: emoteEmoji }),
	},
});
