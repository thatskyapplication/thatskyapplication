import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.VaultEldersLantern,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		inProgress: true,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.VaultEldersLanternQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.VaultEldersLanternHeart1,
				},
				{
					cosmetic: Cosmetic.TheTwoEmbersPendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.VaultEldersLanternUltimateHairAccessory,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.VaultEldersLanternUltimateCape,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.VaultEldersLanternQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.VaultEldersLanternHeart2,
				},
			],
		],
	},
});
