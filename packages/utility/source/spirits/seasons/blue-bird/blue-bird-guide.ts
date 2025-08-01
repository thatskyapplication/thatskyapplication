import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.BlueBirdGuide,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.BlueBirdGuideQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.BlueBirdGuideHeart1,
				},
				{
					cosmetic: Cosmetic.BlueBirdPendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.BlueBirdGuideUltimateFaceAccessory,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.BlueBirdGuideUltimateCape,
							cost: { seasonalHearts: 3 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCough1,
				},
				{
					cosmetic: Cosmetic.EmoteCough2,
					cost: { hearts: 3 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.BlueBirdGuideQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.BlueBirdGuideHeart2,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCough3,
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteCough4,
					cost: { hearts: 5 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.BlueBirdGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.BlueBirdGuideHeart3,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.BlueBirdGuideQuest4,
				},
				{ cosmetic: Cosmetic.StanceSad, cost: { hearts: 3 } },
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.BlueBirdGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.BlueBirdGuideHeart4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.BlueBirdGuideQuest6,
				},
				{ cosmetic: Cosmetic.CallBlueBird, cost: { hearts: 3 } },
			],
			[{ cosmetic: Cosmetic.BlueBirdGuideProp, cost: { hearts: 18 } }],
		],
	},
});
