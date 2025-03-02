import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritCall,
	SpiritId,
} from "@thatskyapplication/utility";

const call = SpiritCall.Nightbird;

export default new SeasonalSpirit({
	id: SpiritId.NightbirdWhisperer,
	seasonId: SeasonId.Moments,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallNightbird },
			{
				name: "Hair",
				cosmetic: Cosmetic.NightbirdWhispererHair,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NightbirdWhispererBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NightbirdWhispererBlessing2,
				cost: { seasonalCandles: 24 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.NightbirdWhispererHairAccessory,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.NightbirdWhispererOutfit,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.NightbirdWhispererBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.NightbirdWhispererBlessing4,
				cost: { seasonalCandles: 36 },
			},
			{ name: "Shoes", cosmetic: Cosmetic.NightbirdWhispererShoes },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NightbirdWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
