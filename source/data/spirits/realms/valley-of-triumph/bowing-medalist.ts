import { StandardSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Bow;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory05;

export default new StandardSpirit({
	name: SpiritName.BowingMedalist,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBow1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBow2, cost: { candles: 3 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BowingMedalistBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BowingMedalistHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair20,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BowingMedalistHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BowingMedalistWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteBow3, cost: { candles: 4 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBow4, cost: { candles: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BowingMedalistBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.BowingMedalistFaceAccessory,
				cost: { hearts: 5 },
				emoji: faceAccessoryEmoji,
			},
		],
	},
});
