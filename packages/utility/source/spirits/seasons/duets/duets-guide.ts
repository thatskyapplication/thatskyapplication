import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.DuetsGuide,
	seasonId: SeasonId.Duets,
	offer: {
		current: [
			{ cosmetic: Cosmetic.DuetsGuideQuest1 },
			{
				cosmetic: Cosmetic.DuetsGuideMask,
				cost: { candles: 65 },
			},
			{ cosmetic: Cosmetic.DuetsPendant },
			{
				cosmetic: Cosmetic.DuetsGuideUltimateProp1,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.DuetsGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.DuetsGuideUltimateProp2,
				cost: { seasonalHearts: 2 },
			},
			{ cosmetic: Cosmetic.DuetsGuideQuest2 },
			{ cosmetic: Cosmetic.DuetsGuideHeart1 },
			{ cosmetic: Cosmetic.DuetsGuideQuest3 },
			{
				cosmetic: Cosmetic.DuetsGuideDuetBow1,
			},
			{ cosmetic: Cosmetic.DuetsGuideQuest4 },
			{
				cosmetic: Cosmetic.DuetsGuideDuetBow2,
				cost: { hearts: 2 },
			},
			{ cosmetic: Cosmetic.DuetsGuideQuest5 },
			{ cosmetic: Cosmetic.DuetsGuideHeart2 },
		],
	},
});
