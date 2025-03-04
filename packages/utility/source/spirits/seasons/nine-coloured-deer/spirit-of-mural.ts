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
				name: "Quest 1",
				cosmetic: Cosmetic.SpiritOfMuralQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.SpiritOfMuralHeart1,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.NineColouredDeerPendant,
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.SpiritOfMuralUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.SpiritOfMuralUltimateOutfit,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.SpiritOfMuralUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.SpiritOfMuralQuest2,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.SpiritOfMuralHeart2,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.SpiritOfMuralQuest3,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.SpiritOfMuralHairAccessory,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.SpiritOfMuralQuest4,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.SpiritOfMuralHeart3,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.SpiritOfMuralQuest5,
			},
			{ name: "Mask", cosmetic: Cosmetic.SpiritOfMuralMask },
		],
	},
});
