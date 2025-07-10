import { Cosmetic } from "../../../cosmetics.js";
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
			{
				cosmetic: Cosmetic.SpiritOfMuralQuest1,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralHeart1,
			},
			{
				cosmetic: Cosmetic.NineColouredDeerPendant,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralUltimateOutfit,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralQuest2,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralHeart2,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralQuest3,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralHairAccessory,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralQuest4,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralHeart3,
			},
			{
				cosmetic: Cosmetic.SpiritOfMuralQuest5,
			},
			{ cosmetic: Cosmetic.SpiritOfMuralMask },
		],
	},
});
