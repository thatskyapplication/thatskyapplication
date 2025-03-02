import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.RemnantOfAForgottenHaven,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing1,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Shoes", cosmetic: Cosmetic.RemnantOfAForgottenHavenShoes },
			{
				name: "Cape",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenCape,
				cost: { seasonalCandles: 32 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing2,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing3,
				cost: { seasonalCandles: 40 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenHairAccessory,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RemnantOfAForgottenHavenSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
