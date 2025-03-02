import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

const action = FriendAction.Handshake;

export default new SeasonalSpirit({
	id: SpiritId.FranticStagehand,
	seasonId: SeasonId.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHandshake1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FranticStagehandBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Hood", cosmetic: Cosmetic.FranticStagehandHood },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FranticStagehandMusicSheet,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.FranticStagehandBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.FranticStagehandBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionHandshake2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.FranticStagehandMask,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.FranticStagehandOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHandshake1 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FranticStagehandMusicSheet,
				cost: { candles: 22 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FranticStagehandBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hood",
				cosmetic: Cosmetic.FranticStagehandHood,
				cost: { candles: 48 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.FranticStagehandWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.FranticStagehandBlessing2 },
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionHandshake2,
				cost: { hearts: 8 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.FranticStagehandOutfit,
				cost: { candles: 70 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.FranticStagehandMask,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		returning: [5],
	},
});
