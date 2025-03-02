import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Balance;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfAir,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBalance1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBalance2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfAirHair,
				cost: { seasonalCandles: 13 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ProphetOfAirBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBalance3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBalance4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfAirBlessing2,
				cost: { seasonalCandles: 23 },
			},
			{ name: "Mask", cosmetic: Cosmetic.ProphetOfAirMask },
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfAirCape,
				cost: { seasonalCandles: 29 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ProphetOfAirBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBalance1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBalance2,
				cost: { hearts: 3 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ProphetOfAirProp,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfAirBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfAirHair,
				cost: { candles: 44 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProphetOfAirWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBalance3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBalance4,
				cost: { hearts: 6 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfAirMask,
				cost: { candles: 54 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfAirBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfAirCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [61],
		returning: [2],
	},
});
