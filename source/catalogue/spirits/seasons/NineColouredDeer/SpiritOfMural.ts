import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
	season: SeasonName.NineColouredDeer,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace33 },
			{
				name: "Ultimate hair",
				bit: 1 << 3,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair136,
			},
			{
				name: "Ultimate outfit",
				bit: 1 << 4,
				cost: { seasonalHearts: 1 },
				emoji: OUTFIT_EMOJIS.Outfit53,
			},
			{
				name: "Ultimate cape",
				bit: 1 << 5,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape121,
			},
			{ name: "Quest 2", bit: 1 << 6, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 7, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 3", bit: 1 << 8, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Hair accessory", bit: 1 << 9, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory35 },
			{ name: "Quest 4", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 11, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 5", bit: 1 << 12, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Mask", bit: 1 << 13, emoji: MASK_EMOJIS.Mask86 },
		],
	},
});
