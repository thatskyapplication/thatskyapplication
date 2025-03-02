import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

const action = FriendAction.DuetDance;

export default new SeasonalSpirit({
	id: SpiritId.ModestDancer,
	seasonId: SeasonId.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionDuetDance1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ModestDancerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.ModestDancerMusicSheet },
			{
				name: "Mask",
				cosmetic: Cosmetic.ModestDancerMask,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ModestDancerBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ModestDancerBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionDuetDance2 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.ModestDancerOutfit,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Hair", cosmetic: Cosmetic.ModestDancerHair },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ModestDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionDuetDance1 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ModestDancerMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ModestDancerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ModestDancerMask,
				cost: { candles: 30 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ModestDancerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ModestDancerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ModestDancerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionDuetDance2,
				cost: { hearts: 8 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ModestDancerHair,
				cost: { candles: 40 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ModestDancerOutfit,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		returning: [7],
	},
});
