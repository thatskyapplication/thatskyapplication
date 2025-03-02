import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Kabuki;

export default new SeasonalSpirit({
	id: SpiritId.ProvokingPerformer,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKabuki1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteKabuki2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Blessing", cosmetic: Cosmetic.ProvokingPerformerBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKabuki3,
				cost: { seasonalCandles: 12 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteKabuki4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.ProvokingPerformerHair,
				cost: { seasonalCandles: 14 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProvokingPerformerMask,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKabuki1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteKabuki2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProvokingPerformerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProvokingPerformerMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProvokingPerformerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProvokingPerformerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKabuki3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteKabuki4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProvokingPerformerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProvokingPerformerMask,
				cost: { candles: 42 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProvokingPerformerHair,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		travelling: [4, 19, 84],
		travellingErrors: [4],
	},
});
