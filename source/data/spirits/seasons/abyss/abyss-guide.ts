import { GuideSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory15;

export default new GuideSpirit({
	name: SpiritName.AbyssGuide,
	seasonId: SeasonId.Abyss,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.AbyssGuideQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.AbyssGuideHeart1,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{ name: "Pendant", cosmetic: Cosmetic.AbyssGuidePendant, emoji: NECKLACE_EMOJIS.Necklace18 },
			{
				name: "Ultimate face accessory",
				cosmetic: Cosmetic.AbyssGuideUltimateFaceAccessory,
				cost: { seasonalHearts: 1 },
				emoji: faceAccessoryEmoji,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.AbyssGuideUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape73,
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.AbyssGuideUltimateMask,
				cost: { seasonalHearts: 1 },
				emoji: MASK_EMOJIS.Mask55,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.AbyssGuideQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.AbyssGuideHeart2,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.AbyssGuideQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.AbyssGuideHeart3,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.AbyssGuideQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.AbyssGuideHeart4,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.AbyssGuideQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.AbyssGuideHeart5,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AbyssGuideMask,
				cost: { candles: 48 },
				emoji: MASK_EMOJIS.Mask56,
			},
		],
	},
});
