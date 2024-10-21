import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.SpiritOfMural,
	seasonId: SeasonId.NineColouredDeer,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.SpiritOfMuralQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.SpiritOfMuralHeart1,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.NineColouredDeerPendant,
				emoji: NECKLACE_EMOJIS.Necklace33,
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.SpiritOfMuralUltimateHair,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair136,
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.SpiritOfMuralUltimateOutfit,
				cost: { seasonalHearts: 1 },
				emoji: OUTFIT_EMOJIS.Outfit53,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.SpiritOfMuralUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape121,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.SpiritOfMuralQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.SpiritOfMuralHeart2,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.SpiritOfMuralQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.SpiritOfMuralHairAccessory,
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory35,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.SpiritOfMuralQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.SpiritOfMuralHeart3,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.SpiritOfMuralQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{ name: "Mask", cosmetic: Cosmetic.SpiritOfMuralMask, emoji: MASK_EMOJIS.Mask86 },
		],
	},
});
