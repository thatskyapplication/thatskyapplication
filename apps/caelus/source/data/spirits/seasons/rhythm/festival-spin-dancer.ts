import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.SpinDance;

export default new SeasonalSpirit({
	id: SpiritId.FestivalSpinDancer,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinDance1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSpinDance2 },
			{
				name: "Blessing",
				cosmetic: Cosmetic.FestivalSpinDancerBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.FestivalSpinDancerMusicSheet },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSpinDance3,
				cost: { seasonalCandles: 12 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSpinDance4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.FestivalSpinDancerHair,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.FestivalSpinDancerOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinDance1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSpinDance2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FestivalSpinDancerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FestivalSpinDancerMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.FestivalSpinDancerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.FestivalSpinDancerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSpinDance3,
				cost: { hearts: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSpinDance4,
				cost: { hearts: 10 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.FestivalSpinDancerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.FestivalSpinDancerHair,
				cost: { candles: 34 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.FestivalSpinDancerProp,
				cost: { candles: 30 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.FestivalSpinDancerOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [17, 46, 103],
	},
});
