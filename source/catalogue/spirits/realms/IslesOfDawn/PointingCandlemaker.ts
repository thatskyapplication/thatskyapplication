import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Point;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.PointingCandlemaker,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { candles: 1 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Hair", emoji: HAIR_EMOJIS.Hair02 })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 1 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 8, { name: "Outfit", cost: { hearts: 4 }, emoji: OUTFIT_EMOJIS.Outfit02 })
			.set(1 << 9, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 }),
	},
});
