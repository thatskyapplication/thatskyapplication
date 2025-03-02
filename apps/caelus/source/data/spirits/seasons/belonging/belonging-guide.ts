import { Cosmetic, GuideSpirit, SeasonId, SpiritId } from "@thatskyapplication/utility";

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
