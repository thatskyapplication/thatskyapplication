import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.SenseOfSelf,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SenseOfSelfMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SenseOfSelfBlessing1,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SenseOfSelfBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{
				name: "Shoes",
				cosmetic: Cosmetic.SenseOfSelfShoes,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.SenseOfSelfNeckAccessory,
				cost: { seasonalCandles: 24 },
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.SenseOfSelfBlessing3,
			},
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.SenseOfSelfBlessing4,
				cost: { seasonalCandles: 28 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.SenseOfSelfHairAccessory,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SenseOfSelfSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
