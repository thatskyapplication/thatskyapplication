import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.InspirationOfInclusion,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.InspirationOfInclusionProp1,
				cost: { seasonalCandles: 12 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing1,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.InspirationOfInclusionHairAccessory,
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.InspirationOfInclusionProp2,
				cost: { seasonalCandles: 20 },
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing3,
			},
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing4,
				cost: { seasonalCandles: 26 },
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.InspirationOfInclusionNeckAccessory,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.InspirationOfInclusionOutfit,
				cost: { seasonalCandles: 36 },
			},
			{
				name: "Blessing 5",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing5,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.InspirationOfInclusionSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
