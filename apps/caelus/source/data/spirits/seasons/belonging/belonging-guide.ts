import { Cosmetic, GuideSpirit, SeasonId, SpiritId } from "@thatskyapplication/utility";
import { LARGE_PLACEABLE_PROPS_EMOJIS, NECKLACE_EMOJIS } from "../../../../utility/emojis.js";

export default new GuideSpirit({
	id: SpiritId.BelongingGuide,
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
