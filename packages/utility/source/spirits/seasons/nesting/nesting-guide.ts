import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.NestingGuide,
	seasonId: SeasonId.Nesting,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.NestingGuideQuest1 },
			{ name: "Heart 1", cosmetic: Cosmetic.NestingGuideHeart1 },
			{ name: "Pendant", cosmetic: Cosmetic.NestingPendant },
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.NestingGuideUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate prop",
				cosmetic: Cosmetic.NestingGuideUltimateProp,
				cost: { seasonalHearts: 2 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.NestingGuideQuest2 },
			{ name: "Heart 2", cosmetic: Cosmetic.NestingGuideHeart2 },
			{ name: "Quest 3", cosmetic: Cosmetic.NestingGuideQuest3 },
			{ name: "Heart 3", cosmetic: Cosmetic.NestingGuideHeart3 },
			{ name: "Quest 4", cosmetic: Cosmetic.NestingGuideQuest4 },
			{ name: "Heart 4", cosmetic: Cosmetic.NestingGuideHeart4 },
			{ name: "Quest 5", cosmetic: Cosmetic.NestingGuideQuest5 },
			{ name: "Heart 5", cosmetic: Cosmetic.NestingGuideHeart5 },
		],
	},
});
