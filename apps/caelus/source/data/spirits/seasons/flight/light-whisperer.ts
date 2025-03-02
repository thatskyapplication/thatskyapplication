import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritCall,
	SpiritId,
} from "@thatskyapplication/utility";

const call = SpiritCall.BabyManta;

export default new SeasonalSpirit({
	id: SpiritId.LightWhisperer,
	seasonId: SeasonId.Flight,
	call,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallBabyManta },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LightWhispererBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LightWhispererHairAccessory,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LightWhispererHair,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.LightWhispererBlessing2 },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.LightWhispererTrailSpell1,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Cape", cosmetic: Cosmetic.LightWhispererCape },
			{
				name: "Outfit",
				cosmetic: Cosmetic.LightWhispererOutfit,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Trail spell 2", cosmetic: Cosmetic.LightWhispererTrailSpell2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.LightWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallBabyManta },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LightWhispererBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LightWhispererHairAccessory,
				cost: { candles: 45 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LightWhispererSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LightWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LightWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LightWhispererHair,
				cost: { candles: 50 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.LightWhispererOutfit,
				cost: { candles: 65 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.LightWhispererCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [108],
	},
});
