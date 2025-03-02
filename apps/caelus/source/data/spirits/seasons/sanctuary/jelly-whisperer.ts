import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritCall,
	SpiritId,
} from "@thatskyapplication/utility";

const call = SpiritCall.Jellyfish;

export default new SeasonalSpirit({
	id: SpiritId.JellyWhisperer,
	seasonId: SeasonId.Sanctuary,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallJellyfish },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.JellyWhispererMusicSheet,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.JellyWhispererBlessing1 },
			{
				name: "Hair",
				cosmetic: Cosmetic.JellyWhispererHair,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.JellyWhispererBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.JellyWhispererBlessing3,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.JellyWhispererOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallJellyfish },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.JellyWhispererBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.JellyWhispererMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.JellyWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.JellyWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Umbrella",
				cosmetic: Cosmetic.JellyWhispererUmbrella,
				cost: { hearts: 15 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.JellyWhispererHair,
				cost: { candles: 42 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.JellyWhispererOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [49, 95],
	},
});
