import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.SpinTrick;

export default new SeasonalSpirit({
	id: SpiritId.SpinningMentor,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinTrick1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSpinTrick2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.SpinningMentorHair,
				cost: { seasonalCandles: 13 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.SpinningMentorBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSpinTrick3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSpinTrick4 },
			{
				name: "Mask",
				cosmetic: Cosmetic.SpinningMentorMask,
				cost: { seasonalCandles: 23 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SpinningMentorBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.SpinningMentorBlessing3,
				cost: { seasonalCandles: 29 },
			},
			{ name: "Cape", cosmetic: Cosmetic.SpinningMentorCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinTrick1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSpinTrick2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SpinningMentorBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SpinningMentorHair,
				cost: { candles: 44 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SpinningMentorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSpinTrick3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSpinTrick4,
				cost: { hearts: 6 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SpinningMentorMask,
				cost: { candles: 42 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SpinningMentorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SpinningMentorCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [59, 91, 120],
	},
});
