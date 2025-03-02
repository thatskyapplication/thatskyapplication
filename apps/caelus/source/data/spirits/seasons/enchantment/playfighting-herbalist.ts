import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

const action = FriendAction.PlayFight;

export default new SeasonalSpirit({
	id: SpiritId.PlayfightingHerbalist,
	seasonId: SeasonId.Enchantment,
	action,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionPlayFight1 },
			{ name: "Blessing 1", cosmetic: Cosmetic.PlayfightingHerbalistBlessing1 },
			{
				name: "Mask",
				cosmetic: Cosmetic.PlayfightingHerbalistMask,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.PlayfightingHerbalistBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionPlayFight2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PlayfightingHerbalistMusicSheet,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Hair", cosmetic: Cosmetic.PlayfightingHerbalistHair },
			{
				name: "Cape",
				cosmetic: Cosmetic.PlayfightingHerbalistCape,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.PlayfightingHerbalistBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PlayfightingHerbalistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionPlayFight1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PlayfightingHerbalistMask,
				cost: { candles: 30 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PlayfightingHerbalistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PlayfightingHerbalistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing2,
				cost: { candles: 5 },
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionPlayFight2,
				cost: { hearts: 10 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PlayfightingHerbalistMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing3,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PlayfightingHerbalistHair,
				cost: { candles: 42 },
			},
			{
				name: "Orb",
				cosmetic: Cosmetic.PlayfightingHerbalistOrb,
				cost: { candles: 20 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.PlayfightingHerbalistCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [47, 98],
	},
});
