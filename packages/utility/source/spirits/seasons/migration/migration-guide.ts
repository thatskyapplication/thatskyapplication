import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.MigrationGuide,
	seasonId: SeasonId.Migration,
	realm: RealmName.IsleOfDawn,
	offer: {
		inProgress: true,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.MigrationGuideQuest1,
				},
				null,
				{
					cosmetic: Cosmetic.MigrationPendant,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.MigrationGuideQuest2,
				},
				null,
				{
					cosmetic: Cosmetic.MigrationGuideUltimateShoes,
					cost: { seasonalHearts: 1 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.MigrationGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.MigrationGuideHeart1,
				},
				{
					cosmetic: Cosmetic.MigrationGuideUltimateOutfit,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.MigrationGuideQuest4,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.MigrationGuideHeart2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.MigrationGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.MigrationGuideHeart3,
				},
				{
					cosmetic: Cosmetic.MigrationGuideUltimateFaceAccessory,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.MigrationGuideQuest6,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.MigrationGuideHeart4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 7 },
					cosmetic: Cosmetic.MigrationGuideQuest7,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 5 },
					cosmetic: Cosmetic.MigrationGuideHeart5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 6 },
					cosmetic: Cosmetic.MigrationGuideHeart6,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 8 },
					cosmetic: Cosmetic.MigrationGuideQuest8,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 9 },
					cosmetic: Cosmetic.MigrationGuideQuest9,
				},
				{
					cosmetic: Cosmetic.MigrationGuideProp,
					cost: { candles: 32 },
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 7 },
					cosmetic: Cosmetic.MigrationGuideHeart7,
				},
			],
		],
	},
});
