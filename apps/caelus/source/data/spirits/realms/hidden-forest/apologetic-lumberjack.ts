import { RealmName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Apologise;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory03;

export default new StandardSpirit({
	name: SpiritName.ApologeticLumberjack,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteApologise1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteApologise2,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ApologeticLumberjackBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ApologeticLumberjackHair,
				cost: { hearts: 3 },
				emoji: HAIR_EMOJIS.Hair15,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ApologeticLumberjackHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ApologeticLumberjackWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteApologise3,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteApologise4,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ApologeticLumberjackBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ApologeticLumberjackFaceAccessory,
				cost: { hearts: 5 },
				emoji: faceAccessoryEmoji,
			},
		],
	},
});
