import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.CarnivalGuide,
	seasonId: SeasonId.Carnival,
	offer: {
		inProgress: true,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalGuideQuest1,
				},
				null,
				{
					cosmetic: Cosmetic.CarnivalPendant,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.CarnivalGuideUltimateHair,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				null,
				{
					cosmetic: Cosmetic.CarnivalGuideProp1,
				},
				{
					cosmetic: Cosmetic.CarnivalGuideUltimateCape,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				null,
				{
					cosmetic: Cosmetic.CarnivalGuideProp2,
				},
			],
			[
				null,
				{
					cosmetic: Cosmetic.CarnivalGuideProp3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalGuideHeart1,
				},
			],
			[
				null,
				{
					cosmetic: Cosmetic.CarnivalGuideProp4,
				},
				{
					cosmetic: Cosmetic.CarnivalGuideProp5,
				},
			],
			[
				null,
				{
					cosmetic: Cosmetic.CarnivalGuideProp6,
					cost: { candles: 26 },
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.CarnivalGuideHeart2,
				},
			],
		],
	},
});
