import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.DustOff;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfEarth,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDustOff1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDustOff2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfEarthHair,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ProphetOfEarthBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDustOff3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteDustOff4 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
				cost: { seasonalCandles: 21 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ProphetOfEarthBlessing2 },
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfEarthCape,
				cost: { seasonalCandles: 27 },
			},
			{ name: "Mask", cosmetic: Cosmetic.ProphetOfEarthMask },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDustOff1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteDustOff2,
				cost: { hearts: 4 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ProphetOfEarthProp,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfEarthBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfEarthHair,
				cost: { candles: 44 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfEarthSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProphetOfEarthWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDustOff3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDustOff4,
				cost: { hearts: 6 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProphetOfEarthMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfEarthBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ProphetOfEarthCape,
				cost: { candles: 75 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfEarthMask,
				cost: { candles: 44 },
			},
		],
	},
	visits: {
		travelling: [54, 121],
		travellingErrors: [3],
		returning: [2],
	},
});
