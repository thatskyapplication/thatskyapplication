import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Sneeze;

export default new SeasonalSpirit({
	id: SpiritId.SneezingGeographer,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSneeze1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSneeze2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.SneezingGeographerHair,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.SneezingGeographerBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSneeze3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSneeze4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SneezingGeographerBlessing2,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Cape", cosmetic: Cosmetic.SneezingGeographerCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SneezingGeographerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSneeze1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSneeze2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SneezingGeographerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SneezingGeographerHair,
				cost: { candles: 40 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SneezingGeographerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SneezingGeographerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSneeze3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSneeze4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SneezingGeographerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SneezingGeographerCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [85],
	},
});
