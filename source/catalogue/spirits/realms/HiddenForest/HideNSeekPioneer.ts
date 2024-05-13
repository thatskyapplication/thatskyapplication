/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.HideAndSeek;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.HideNSeekPioneer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: emote, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: "Hair", cost: { hearts: 2 }, emoji: HAIR_EMOJIS.Hair12 })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { name: "Wing buff 1", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 6, { name: "Mask", cost: { hearts: 20 }, emoji: MASK_EMOJIS.Mask03 })
			.set(1 << 7, { name: "Wing buff 2", cost: { ascendedCandles: 6 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 8, { name: "Outfit", cost: { hearts: 15 }, emoji: OUTFIT_EMOJIS.Outfit06 }),
	},
});
