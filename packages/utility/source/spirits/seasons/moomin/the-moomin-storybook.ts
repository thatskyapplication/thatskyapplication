import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.TheMoominStorybook,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.TheMoominStorybookQuest1,
			},
			{
				cosmetic: Cosmetic.EmoteRead1,
			},
			{
				cosmetic: Cosmetic.EmoteRead2,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.MoominPendant,
			},
			{
				cosmetic: Cosmetic.TheMoominStorybookUltimateUmbrella,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.TheMoominStorybookUltimatePlush,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.TheMoominStorybookUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.TheMoominStorybookQuest2,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.TheMoominStorybookQuest3,
			},
			{
				cosmetic: Cosmetic.TheMoominStorybookHeart1,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.TheMoominStorybookQuest4,
			},
			{
				cosmetic: Cosmetic.EmoteRead3,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.EmoteRead4,
				cost: { hearts: 5 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.TheMoominStorybookQuest5,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
				cosmetic: Cosmetic.TheMoominStorybookQuest6,
			},
			{
				cosmetic: Cosmetic.TheMoominStorybookHeart2,
			},
			{
				cosmetic: Cosmetic.TheMoominStorybookProp,
				cost: { candles: 35 },
			},
			{
				cosmetic: Cosmetic.TheMoominStorybookOutfit,
				cost: { candles: 190 },
			},
		],
	},
});
