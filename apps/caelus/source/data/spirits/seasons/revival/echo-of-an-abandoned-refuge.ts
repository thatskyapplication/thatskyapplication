import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.EchoOfAnAbandonedRefuge,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing1,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Shoes", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeShoes },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeMusicSheet,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing3,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Cape", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeCape },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeHairAccessory,
				cost: { seasonalCandles: 42 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
