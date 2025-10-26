import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.SpiritOfMural,
	seasonId: SeasonId.NineColouredDeer,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.SpiritOfMuralQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.SpiritOfMuralHeart1,
				},
				{
					cosmetic: Cosmetic.NineColouredDeerPendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.SpiritOfMuralUltimateHair,
							seasonPass: true,
							cost: { seasonalHearts: 1 },
						},
						{
							cosmetic: Cosmetic.SpiritOfMuralUltimateOutfit,
							seasonPass: true,
							cost: { seasonalHearts: 1 },
						},
						{
							cosmetic: Cosmetic.SpiritOfMuralUltimateCape,
							seasonPass: true,
							cost: { seasonalHearts: 2 },
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.SpiritOfMuralQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.SpiritOfMuralHeart2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.SpiritOfMuralQuest3,
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.SpiritOfMuralHairAccessory,
					cost: { candles: 50 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.SpiritOfMuralQuest4,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.SpiritOfMuralHeart3,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.SpiritOfMuralQuest5,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SpiritOfMuralMask,
					cost: { candles: 120 },
				},
			],
		],
	},
});
