import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.MigrationGuide,
	seasonId: SeasonId.Migration,
	realm: RealmName.IslesOfDawn,
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
				null,
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
				null,
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.MigrationGuideHeart2,
				},
				{
					cosmetic: Cosmetic.MigrationGuideUltimateFaceAccessory,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
		],
	},
});
