import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Scold;

export default new SeasonalSpirit({
	id: SpiritId.ScoldingStudent,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteScold1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteScold2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.ScoldingStudentMask,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ScoldingStudentBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteScold3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteScold4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.ScoldingStudentHair,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ScoldingStudentBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ScoldingStudentBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Cape", cosmetic: Cosmetic.ScoldingStudentCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ScoldingStudentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteScold1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteScold2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ScoldingStudentBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ScoldingStudentMask,
				cost: { candles: 24 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ScoldingStudentSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ScoldingStudentWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteScold3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteScold4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ScoldingStudentBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ScoldingStudentHair,
				cost: { candles: 50 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ScoldingStudentCape,
				cost: { candles: 70 },
			},
		],
	},
	keywords: ["clover", "clover cape"],
	visits: {
		travelling: [68, 128],
	},
});
