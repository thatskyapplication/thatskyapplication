import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Welcome;

export default new SeasonalSpirit({
	id: SpiritId.TroupeGreeter,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWelcome1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteWelcome2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.TroupeGreeterMusicSheet,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Blessing", cosmetic: Cosmetic.TroupeGreeterBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWelcome3,
				cost: { seasonalCandles: 10 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteWelcome4 },
			{
				name: "Mask",
				cosmetic: Cosmetic.TroupeGreeterMask,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.TroupeGreeterOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TroupeGreeterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWelcome1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteWelcome2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TroupeGreeterBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.TroupeGreeterMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TroupeGreeterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TroupeGreeterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWelcome3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteWelcome4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TroupeGreeterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TroupeGreeterOutfit,
				cost: { candles: 70 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.TroupeGreeterMask,
				cost: { candles: 48 },
			},
		],
	},
	visits: {
		travelling: [25, 56, 131],
		returning: [4],
	},
});
