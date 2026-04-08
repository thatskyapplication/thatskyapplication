import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.RhythmGuide,
	seasonId: SeasonId.Rhythm,
	offer: {
		current: [
			[{ cosmetic: Cosmetic.RhythmPendant, seasonPass: true }],
			[
				{
					cosmetic: Cosmetic.RhythmUltimateMask,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.RhythmUltimateHair,
					cost: { seasonalHearts: 4 },
					seasonPass: true,
				},
			],
		],
	},
});
