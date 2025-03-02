import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.NestingNook,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.NestingNookProp1,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NestingNookBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NestingNookBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Prop 2", cosmetic: Cosmetic.NestingNookProp2 },
			{
				name: "Prop 3",
				cosmetic: Cosmetic.NestingNookProp3,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.NestingNookBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.NestingNookBlessing4,
				cost: { seasonalCandles: 30 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.NestingNookHairAccessory,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingNookSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
