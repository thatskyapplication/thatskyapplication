import { Cosmetic, GuideSpirit, SeasonId, SpiritId } from "@thatskyapplication/utility";

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
