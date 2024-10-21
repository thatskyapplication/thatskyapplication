import { StandardSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Telekinesis;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory07;

export default new StandardSpirit({
	name: SpiritName.LevitatingAdept,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTelekinesis1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteTelekinesis2,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LevitatingAdeptBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LevitatingAdeptHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair27,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LevitatingAdeptHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LevitatingAdeptWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTelekinesis3,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteTelekinesis4,
				cost: { candles: 7 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LevitatingAdeptBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.LevitatingAdeptFaceAccessory,
				cost: { hearts: 10 },
				emoji: faceAccessoryEmoji,
			},
		],
	},
});
