import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

const action = FriendAction.Carry;

export default new SeasonalSpirit({
	id: SpiritId.PiggybackLightseeker,
	seasonId: SeasonId.Lightseekers,
	action,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionCarry1 },
			{
				name: "Mask",
				cosmetic: Cosmetic.PiggybackLightseekerMask,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PiggybackLightseekerBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PiggybackLightseekerBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionCarry2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.PiggybackLightseekerHair,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Cape", cosmetic: Cosmetic.PiggybackLightseekerCape },
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionCarry1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PiggybackLightseekerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PiggybackLightseekerMask,
				cost: { candles: 24 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PiggybackLightseekerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PiggybackLightseekerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PiggybackLightseekerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionCarry2,
				cost: { hearts: 8 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PiggybackLightseekerHair,
				cost: { candles: 26 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.PiggybackLightseekerCape,
				cost: { candles: 60 },
			},
		],
	},
	visits: {
		travelling: [7, 30, 80, 134],
	},
});
