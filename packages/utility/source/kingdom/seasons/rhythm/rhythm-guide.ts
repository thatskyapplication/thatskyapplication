import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.RhythmGuide,
	seasonId: SeasonId.Rhythm,
	offer: {
		current: [
			[{ translation: CosmeticCommon.Pendant, cosmetic: Cosmetic.RhythmPendant, seasonPass: true }],
			[
				{
					translation: CosmeticCommon.UltimateMask,
					cosmetic: Cosmetic.RhythmUltimateMask,
					cost: { seasonalHearts: 2 },
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.UltimateHair,
					cosmetic: Cosmetic.RhythmUltimateHair,
					cost: { seasonalHearts: 4 },
					seasonPass: true,
				},
			],
		],
	},
});
