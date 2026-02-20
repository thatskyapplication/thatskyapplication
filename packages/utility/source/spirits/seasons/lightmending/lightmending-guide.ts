import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.LightmendingGuide,
	seasonId: SeasonId.Lightmending,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		inProgress: true,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.LightmendingGuideQuest1,
				},
				null,
				{
					cosmetic: Cosmetic.LightmendingPendant,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.LightmendingGuideQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.LightmendingGuideHeart1,
				},
				{
					cosmetic: Cosmetic.LightmendingGuideUltimateMask,
					cost: { seasonalHearts: 1 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.LightmendingGuideQuest3,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.LightmendingGuideQuest4,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.LightmendingGuideHeart2,
				},
				{
					cosmetic: Cosmetic.LightmendingGuideUltimateHair,
					cost: { seasonalHearts: 1 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.LightmendingGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.LightmendingGuideHeart3,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.LightmendingGuideQuest6,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 7 },
					cosmetic: Cosmetic.LightmendingGuideQuest7,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.LightmendingGuideHeart4,
				},
				{
					cosmetic: Cosmetic.LightmendingGuideUltimateCape,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				null,
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 5 },
					cosmetic: Cosmetic.LightmendingGuideHeart5,
				},
			],
			[null],
			[
				null,
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 6 },
					cosmetic: Cosmetic.LightmendingGuideHeart6,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 7 },
					cosmetic: Cosmetic.LightmendingGuideHeart7,
				},
			],
		],
	},
});
