import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { NECKLACE_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.BelongingGuide,
	season: SeasonName.Belonging,
	offer: {
		current: [
			{ name: "Pendant", bit: 1 << 0, emoji: NECKLACE_EMOJIS.Necklace03 },
			{
				name: "Bonfire",
				bit: 1 << 1,
				cost: { seasonalHearts: 6 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp02,
			},
		],
	},
	keywords: ["bonfire"],
});
