/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, FACE_ACCESSORY_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.NoThanks;
const emoteEmoji = EMOTES_EMOJIS.NoThanks;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory01;

export default new StandardSpirit({
	name: SpiritName.RejectingVoyager,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 1 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Hair", cost: { hearts: 1 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 1 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { candles: 2 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Face accessory", cost: { hearts: 3 }, emoji: faceAccessoryEmoji })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 } }),
	},
});
