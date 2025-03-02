import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Navigate;

export default new SeasonalSpirit({
	id: SpiritId.LivelyNavigator,
	seasonId: SeasonId.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNavigate1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteNavigate2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LivelyNavigatorBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Hair", cosmetic: Cosmetic.LivelyNavigatorHair },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.LivelyNavigatorBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNavigate3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteNavigate4 },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.LivelyNavigatorTrailSpell1,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Cape", cosmetic: Cosmetic.LivelyNavigatorCape },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Trail spell 2", cosmetic: Cosmetic.LivelyNavigatorTrailSpell2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNavigate1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteNavigate2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LivelyNavigatorBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
				cost: { candles: 45 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LivelyNavigatorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNavigate3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteNavigate4,
				cost: { hearts: 6 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LivelyNavigatorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LivelyNavigatorHair,
				cost: { candles: 55 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.LivelyNavigatorCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [94],
	},
});
