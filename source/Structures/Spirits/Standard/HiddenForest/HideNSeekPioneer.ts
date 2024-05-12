/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	EMOTE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { type ItemsData, Emote, StandardSpirit } from "../../Base.js";

const emote = Emote.HideAndSeek;
const emoteEmoji = EMOTE_EMOJIS.HideAndSeek;

export default new StandardSpirit({
	name: SpiritName.HideNSeekPioneer,
	emote,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: emote, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: "Hair", cost: { hearts: 2 }, emoji: HAIR_EMOJIS.Hair12 })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff 1", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 6, { item: "Mask", cost: { hearts: 20 }, emoji: MASK_EMOJIS.Mask03 })
			.set(1 << 7, { item: "Wing buff 2", cost: { ascendedCandles: 6 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 8, { item: "Outfit", cost: { hearts: 15 }, emoji: OUTFIT_EMOJIS.Outfit06 }),
	},
});
