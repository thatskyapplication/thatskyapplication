import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Butterfly;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.ButterflyCharmer,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { candles: 1 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { name: "Cape 1", cost: { hearts: 3 }, emoji: CAPE_EMOJIS.Cape04 })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff 1", cost: { ascendedCandles: 1 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 8, { name: "Outfit", cost: { hearts: 4 }, emoji: OUTFIT_EMOJIS.Outfit04 })
			.set(1 << 9, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 10, { name: "Wing buff 2", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 11, { name: "Cape 2", cost: { hearts: 9 }, emoji: CAPE_EMOJIS.Cape38 }),
	},
});
