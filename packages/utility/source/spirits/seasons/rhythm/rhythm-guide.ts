import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.RhythmGuide,
	seasonId: SeasonId.Rhythm,
	offer: {
		current: [
			{ name: "Pendant", cosmetic: Cosmetic.RhythmPendant },
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.RhythmUltimateMask,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.RhythmUltimateHair,
				cost: { seasonalHearts: 4 },
			},
		],
	},
});
