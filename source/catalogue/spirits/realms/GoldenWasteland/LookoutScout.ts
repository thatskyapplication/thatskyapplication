import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.LookAround;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory06;

export default new StandardSpirit({
	name: SpiritName.LookoutScout,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { candles: 5 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				bit: 1 << 2,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{ name: "Horn", bit: 1 << 3, cost: { hearts: 5 }, emoji: HELD_PROPS_EMOJIS.HeldProp05 },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { candles: 5 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { candles: 5 }, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				bit: 1 << 8,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{ name: "Face accessory", bit: 1 << 9, cost: { hearts: 10 }, emoji: faceAccessoryEmoji },
		],
	},
});
