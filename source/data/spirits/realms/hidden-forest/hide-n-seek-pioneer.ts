import { StandardSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.HideAndSeek;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.HideNSeekPioneer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: emote, cosmetic: Cosmetic.EmoteHideAndSeek, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.HideAndSeekPioneerHair,
				cost: { hearts: 2 },
				emoji: HAIR_EMOJIS.Hair12,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HideAndSeekPioneerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HideAndSeekPioneerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.HideAndSeekPioneerWingBuff1,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HideAndSeekPioneerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.HideAndSeekPioneerMask,
				cost: { hearts: 20 },
				emoji: MASK_EMOJIS.Mask03,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.HideAndSeekPioneerWingBuff2,
				cost: { ascendedCandles: 6 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.HideAndSeekPioneerOutfit,
				cost: { hearts: 15 },
				emoji: OUTFIT_EMOJIS.Outfit06,
			},
		],
	},
});
