import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Backflip;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory04;

export default new StandardSpirit({
	name: SpiritName.BackflippingChampion,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { candles: 3 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { name: "Hair", cost: { hearts: 5 }, emoji: HAIR_EMOJIS.Hair18 })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { candles: 4 }, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 9, { name: "Face accessory", cost: { hearts: 5 }, emoji: faceAccessoryEmoji }),
	},
});
