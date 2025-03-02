import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.EvilLaugh;

export default new SeasonalSpirit({
	id: SpiritId.CacklingCannoneer,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEvilLaugh1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteEvilLaugh2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CacklingCannoneerBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.CacklingCannoneerMusicSheet },
			{
				name: "Mask",
				cosmetic: Cosmetic.CacklingCannoneerMask,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.CacklingCannoneerBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteEvilLaugh3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteEvilLaugh4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.CacklingCannoneerCape,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.CacklingCannoneerBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.CacklingCannoneerBlessing4,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Hair", cosmetic: Cosmetic.CacklingCannoneerHair },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEvilLaugh1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteEvilLaugh2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CacklingCannoneerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.CacklingCannoneerMask,
				cost: { candles: 40 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CacklingCannoneerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteEvilLaugh3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteEvilLaugh4,
				cost: { hearts: 6 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CacklingCannoneerHair,
				cost: { candles: 50 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CacklingCannoneerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.CacklingCannoneerCape,
				cost: { candles: 70 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.CacklingCannoneerMusicSheet,
				cost: { candles: 15 },
			},
		],
	},
	visits: {
		returning: [4],
	},
});
