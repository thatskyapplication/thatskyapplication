import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { LARGE_PLACEABLE_PROPS_EMOJIS, NECKLACE_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritName } from "../../../../Utility2/spirits.js";

export default new GuideSpirit({
	name: SpiritName.BelongingGuide,
	seasonId: SeasonId.Belonging,
	offer: {
		current: [
			{ name: "Pendant", cosmetic: Cosmetic.BelongingPendant, emoji: NECKLACE_EMOJIS.Necklace03 },
			{
				name: "Bonfire",
				cosmetic: Cosmetic.BelongingBonfire,
				cost: { seasonalHearts: 6 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp02,
			},
		],
	},
	keywords: ["bonfire"],
});
