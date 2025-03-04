import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.BelongingGuide,
	seasonId: SeasonId.Belonging,
	offer: {
		current: [
			{ name: "Pendant", cosmetic: Cosmetic.BelongingPendant },
			{
				name: "Bonfire",
				cosmetic: Cosmetic.BelongingBonfire,
				cost: { seasonalHearts: 6 },
			},
		],
	},
	keywords: ["bonfire"],
});
