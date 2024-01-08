/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	EMOTES_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.Float;
const emoteEmoji = EMOTES_EMOJIS.Float;

export default new StandardSpirit({
	name: SpiritName.MeditatingMonastic,
	emote,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 10 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { item: "Hair", cost: { hearts: 10 }, emoji: HAIR_EMOJIS.Hair29 })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { candles: 7 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { candles: 10 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 9, { item: "Chair", cost: { hearts: 30 }, emoji: PLACEABLE_PROPS_EMOJIS.PlaceableProp01 }),
	},
});
