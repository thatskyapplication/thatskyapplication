import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.AssemblyGuide,
	seasonId: SeasonId.Assembly,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: [
			{
				cosmetic: Cosmetic.AssemblyGuideSharedSpaceSpell,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.AssemblyGuideQuest1,
			},
			{
				cosmetic: Cosmetic.AssemblyGuideHeart1,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.AssemblyPendant,
			},
			{
				cosmetic: Cosmetic.AssemblyGuideUltimateMask,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideBugle,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideHighFive,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.AssemblyGuideQuest2,
			},
			{
				cosmetic: Cosmetic.AssemblyGuidePillow,
				cost: { candles: 5 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.AssemblyGuideQuest3,
			},
			{
				cosmetic: Cosmetic.AssemblyGuideHeart2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideFriendActionHug,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.AssemblyGuideQuest4,
			},
			{
				cosmetic: Cosmetic.AssemblyGuideJar,
				cost: { candles: 8 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.AssemblyGuideQuest5,
			},
			{
				cosmetic: Cosmetic.AssemblyGuideBrazier,
				cost: { hearts: 12 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideDoubleFive,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
				cosmetic: Cosmetic.AssemblyGuideQuest6,
			},
			{
				cosmetic: Cosmetic.AssemblyGuideHeart3,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideBookcase,
				cost: { candles: 30 },
			},
			{
				cosmetic: Cosmetic.AssemblyGuideTarpaulin,
				cost: { hearts: 24 },
			},
		],
	},
});
