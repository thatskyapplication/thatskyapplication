import { StandardSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.NoThanks;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory01;

export default new StandardSpirit({
	name: SpiritName.RejectingVoyager,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNoThanks1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteNoThanks2,
				cost: { candles: 1 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RejectingVoyagerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RejectingVoyagerHair,
				cost: { hearts: 1 },
				emoji: HAIR_EMOJIS.Hair04,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.RejectingVoyagerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.RejectingVoyagerWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNoThanks3,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteNoThanks4,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.RejectingVoyagerFaceAccessory,
				cost: { hearts: 3 },
				emoji: faceAccessoryEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RejectingVoyagerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
		],
	},
});
