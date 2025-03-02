import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Aww;

export default new SeasonalSpirit({
	id: SpiritId.ForgetfulStoryteller,
	seasonId: SeasonId.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAww1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAww2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Mask", cosmetic: Cosmetic.ForgetfulStorytellerMask },
			{
				name: "Hair",
				cosmetic: Cosmetic.ForgetfulStorytellerHair,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ForgetfulStorytellerBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAww3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAww4 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.ForgetfulStorytellerOutfit },
			{
				name: "Cape",
				cosmetic: Cosmetic.ForgetfulStorytellerCape,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.ForgetfulStorytellerBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ForgetfulStorytellerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAww1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAww2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ForgetfulStorytellerMask,
				cost: { candles: 34 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ForgetfulStorytellerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ForgetfulStorytellerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAww3,
				cost: { hearts: 3 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAww4, cost: { hearts: 6 } },
			{
				name: "Hair",
				cosmetic: Cosmetic.ForgetfulStorytellerHair,
				cost: { candles: 44 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ForgetfulStorytellerOutfit,
				cost: { candles: 70 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ForgetfulStorytellerCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [133],
	},
});
