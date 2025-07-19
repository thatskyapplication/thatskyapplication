import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.TheRose,
	seasonId: SeasonId.LittlePrince,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: [
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.TheRoseQuest1,
			},
			{
				cosmetic: Cosmetic.TheRoseHeart1,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.LittlePrincePendant,
			},
			{
				cosmetic: Cosmetic.TheRoseUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.TheRoseUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.TheRoseRose,
				cost: { seasonalHearts: 1 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.TheRoseQuest2,
			},
			{
				cosmetic: Cosmetic.TheRoseHeart2,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.TheRoseQuest3,
			},
			{
				cosmetic: Cosmetic.TheRoseHeart3,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.TheRoseQuest4,
			},
			{
				cosmetic: Cosmetic.TheRoseHeart4,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.TheRoseQuest5,
			},
			{
				cosmetic: Cosmetic.TheRoseHeart5,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
				cosmetic: Cosmetic.TheRoseQuest6,
			},
			{
				cosmetic: Cosmetic.TheRoseHeart6,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 7 },
				cosmetic: Cosmetic.TheRoseQuest7,
			},
			{
				cosmetic: Cosmetic.TheRoseHeart7,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SwordOutfit,
				cost: { candles: 200 },
			},
		],
	},
});
