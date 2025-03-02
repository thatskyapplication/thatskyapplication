import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.ThePianistsBeginnings,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThePianistsBeginningsBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{
				name: "Prop 1",
				cosmetic: Cosmetic.ThePianistsBeginningsProp1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ThePianistsBeginningsHair,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ThePianistsBeginningsBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ThePianistsBeginningsBlessing3,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.ThePianistsBeginningsOutfit },
			{
				name: "Prop 2",
				cosmetic: Cosmetic.ThePianistsBeginningsProp2,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.ThePianistsBeginningsBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ThePianistsBeginningsSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
