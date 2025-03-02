import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Grateful;

export default new SeasonalSpirit({
	id: SpiritId.GratefulShellCollector,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrateful1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrateful2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GratefulShellCollectorBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Hair", cosmetic: Cosmetic.GratefulShellCollectorHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrateful3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrateful4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.GratefulShellCollectorCape,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.GratefulShellCollectorBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.GratefulShellCollectorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrateful1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteGrateful2,
				cost: { hearts: 4 },
			},
			{
				name: "Chairs",
				cosmetic: Cosmetic.GratefulShellCollectorChairs,
				cost: { candles: 45 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GratefulShellCollectorBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.GratefulShellCollectorHair,
				cost: { candles: 34 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.GratefulShellCollectorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.GratefulShellCollectorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrateful3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteGrateful4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GratefulShellCollectorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.GratefulShellCollectorCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [45, 88],
	},
});
