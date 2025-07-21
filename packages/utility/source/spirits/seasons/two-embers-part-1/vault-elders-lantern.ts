import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.VaultEldersLantern,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		inProgress: true,
		hasInfographic: false,
		current: [
			{
				translation: CosmeticCommon.Quest,
				cosmetic: Cosmetic.VaultEldersLanternQuest1,
			},
			{
				translation: CosmeticCommon.Heart,
				cosmetic: Cosmetic.VaultEldersLanternHeart1,
			},
			{
				cosmetic: Cosmetic.TheTwoEmbersPendant,
			},
			{
				cosmetic: Cosmetic.VaultEldersLanternUltimateHairAccessory,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.VaultEldersLanternUltimateCape,
				cost: { seasonalHearts: 2 },
			},
		],
	},
});
