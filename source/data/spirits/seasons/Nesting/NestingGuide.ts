import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.NestingGuide,
	seasonId: SeasonId.Nesting,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.NestingGuideQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", cosmetic: Cosmetic.NestingGuideHeart1, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Pendant", cosmetic: Cosmetic.NestingPendant, emoji: NECKLACE_EMOJIS.Necklace34 },
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.NestingGuideUltimateOutfit,
				cost: { seasonalHearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit58,
			},
			{
				name: "Ultimate prop",
				cosmetic: Cosmetic.NestingGuideUltimateProp,
				cost: { seasonalHearts: 2 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp37,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.NestingGuideQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", cosmetic: Cosmetic.NestingGuideHeart2, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 3", cosmetic: Cosmetic.NestingGuideQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", cosmetic: Cosmetic.NestingGuideHeart3, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", cosmetic: Cosmetic.NestingGuideQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", cosmetic: Cosmetic.NestingGuideHeart4, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 5", cosmetic: Cosmetic.NestingGuideQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 5", cosmetic: Cosmetic.NestingGuideHeart5, emoji: MISCELLANEOUS_EMOJIS.Heart },
		],
	},
});
