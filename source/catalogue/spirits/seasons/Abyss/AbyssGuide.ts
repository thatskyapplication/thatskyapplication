import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory15;

export default new GuideSpirit({
	name: SpiritName.AbyssGuide,
	season: SeasonName.Abyss,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: heartEmoji },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace18 },
			{
				name: "Ultimate face accessory",
				bit: 1 << 3,
				cost: { seasonalHearts: 1 },
				emoji: faceAccessoryEmoji,
			},
			{
				name: "Ultimate cape",
				bit: 1 << 4,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape73,
			},
			{
				name: "Ultimate mask",
				bit: 1 << 5,
				cost: { seasonalHearts: 1 },
				emoji: MASK_EMOJIS.Mask55,
			},
			{ name: "Quest 2", bit: 1 << 6, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 7, cost: { candles: 3 }, emoji: heartEmoji },
			{ name: "Quest 3", bit: 1 << 8, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 9, cost: { candles: 3 }, emoji: heartEmoji },
			{ name: "Quest 4", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 11, cost: { candles: 3 }, emoji: heartEmoji },
			{ name: "Quest 5", bit: 1 << 12, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 5", bit: 1 << 13, cost: { candles: 3 }, emoji: heartEmoji },
			{ name: "Mask", bit: 1 << 14, cost: { candles: 48 }, emoji: MASK_EMOJIS.Mask56 },
		],
	},
});
