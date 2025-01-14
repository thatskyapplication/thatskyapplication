import { RealmName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.WipeBrow;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory02;

export default new StandardSpirit({
	name: SpiritName.ExhaustedDockWorker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWipeBrow1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteWipeBrow2,
				cost: { candles: 1 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ExhaustedDockWorkerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ExhaustedDockWorkerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ExhaustedDockWorkerWingBuff,
				cost: { ascendedCandles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWipeBrow3,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteWipeBrow4,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ExhaustedDockWorkerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ExhaustedDockWorkerFaceAccessory,
				cost: { hearts: 3 },
				emoji: faceAccessoryEmoji,
			},
		],
	},
});
