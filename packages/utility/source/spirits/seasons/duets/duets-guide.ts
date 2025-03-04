import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.DuetsGuide,
	seasonId: SeasonId.Duets,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.DuetsGuideQuest1 },
			{
				name: "Mask",
				cosmetic: Cosmetic.DuetsGuideMask,
				cost: { candles: 65 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.DuetsPendant },
			{
				name: "Ultimate prop 1",
				cosmetic: Cosmetic.DuetsGuideUltimateProp1,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.DuetsGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate prop 2",
				cosmetic: Cosmetic.DuetsGuideUltimateProp2,
				cost: { seasonalHearts: 2 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.DuetsGuideQuest2 },
			{ name: "Heart 1", cosmetic: Cosmetic.DuetsGuideHeart1 },
			{ name: "Quest 3", cosmetic: Cosmetic.DuetsGuideQuest3 },
			{
				name: `${FriendAction.DuetBow} 1`,
				cosmetic: Cosmetic.DuetsGuideDuetBow1,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.DuetsGuideQuest4 },
			{
				name: `${FriendAction.DuetBow} 2`,
				cosmetic: Cosmetic.DuetsGuideDuetBow2,
				cost: { hearts: 2 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.DuetsGuideQuest5 },
			{ name: "Heart 2", cosmetic: Cosmetic.DuetsGuideHeart2 },
		],
	},
});
