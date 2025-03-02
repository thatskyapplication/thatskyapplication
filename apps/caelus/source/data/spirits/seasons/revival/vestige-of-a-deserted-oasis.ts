import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.VestigeOfADesertedOasis,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Hair",
				cosmetic: Cosmetic.VestigeOfADesertedOasisHair,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing2,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Cape", cosmetic: Cosmetic.VestigeOfADesertedOasisCape },
			{
				name: "Shoes",
				cosmetic: Cosmetic.VestigeOfADesertedOasisShoes,
				cost: { seasonalCandles: 38 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.VestigeOfADesertedOasisSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
