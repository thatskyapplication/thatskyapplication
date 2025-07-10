import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.NestingGuide,
	seasonId: SeasonId.Nesting,
	offer: {
		current: [
			{ cosmetic: Cosmetic.NestingGuideQuest1 },
			{ cosmetic: Cosmetic.NestingGuideHeart1 },
			{ cosmetic: Cosmetic.NestingPendant },
			{
				cosmetic: Cosmetic.NestingGuideUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.NestingGuideUltimateProp,
				cost: { seasonalHearts: 2 },
			},
			{ cosmetic: Cosmetic.NestingGuideQuest2 },
			{ cosmetic: Cosmetic.NestingGuideHeart2 },
			{ cosmetic: Cosmetic.NestingGuideQuest3 },
			{ cosmetic: Cosmetic.NestingGuideHeart3 },
			{ cosmetic: Cosmetic.NestingGuideQuest4 },
			{ cosmetic: Cosmetic.NestingGuideHeart4 },
			{ cosmetic: Cosmetic.NestingGuideQuest5 },
			{ cosmetic: Cosmetic.NestingGuideHeart5 },
		],
	},
});
