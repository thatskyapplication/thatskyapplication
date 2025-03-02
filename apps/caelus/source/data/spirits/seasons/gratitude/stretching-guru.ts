import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Yoga;

export default new SeasonalSpirit({
	id: SpiritId.StretchingGuru,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteYoga1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteYoga2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.StretchingGuruHair,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.StretchingGuruBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteYoga3,
				cost: { seasonalCandles: 8 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteYoga4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StretchingGuruBlessing2,
				cost: { seasonalCandles: 10 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.StretchingGuruCape,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteYoga1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteYoga2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StretchingGuruBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.StretchingGuruHair,
				cost: { candles: 26 },
			},
			{
				name: "Heart",
				cost: { candles: 3 },
				cosmetic: Cosmetic.StretchingGuruHeart,
			},
			{
				name: "Wing buff",
				cost: { ascendedCandles: 2 },
				cosmetic: Cosmetic.StretchingGuruWingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteYoga3, cost: { hearts: 3 } },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteYoga4, cost: { hearts: 6 } },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StretchingGuruBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.StretchingGuruCape,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [8, 57],
	},
});
