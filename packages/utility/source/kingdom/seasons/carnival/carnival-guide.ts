import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.CarnivalGuide,
	seasonId: SeasonId.Carnival,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalGuideQuest1,
				},
				null,
				{
					translation: CosmeticCommon.Pendant,
					cosmetic: Cosmetic.CarnivalPendant,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.UltimateHair,
					cosmetic: Cosmetic.CarnivalGuideUltimateHair,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.CarnivalGuideQuest2,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalGuideProp1,
				},
				{
					translation: CosmeticCommon.UltimateCape,
					cosmetic: Cosmetic.CarnivalGuideUltimateCape,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				null,
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 2 },
					cosmetic: Cosmetic.CarnivalGuideProp2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.CarnivalGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 3 },
					cosmetic: Cosmetic.CarnivalGuideProp3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalGuideHeart1,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.CarnivalGuideQuest4,
				},
				{
					translation: CosmeticCommon.BouncePad,
					cosmetic: Cosmetic.BouncePad1,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 4 },
					cosmetic: Cosmetic.CarnivalGuideProp4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.CarnivalGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 5 },
					cosmetic: Cosmetic.CarnivalGuideProp5,
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
