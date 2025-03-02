import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

const action = FriendAction.Bearhug;

export default new SeasonalSpirit({
	id: SpiritId.BearhugHermit,
	seasonId: SeasonId.Dreams,
	action,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionBearhug1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BearhugHermitBlessing1,
				cost: { seasonalCandles: 13 },
			},
			{ name: "Red horns", cosmetic: Cosmetic.BearhugHermitRedHorns },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BearhugHermitBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.BearhugHermitMusicSheet },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.BearhugHermitBlessing3,
				cost: { seasonalCandles: 23 },
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionBearhug2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.BearhugHermitHair,
				cost: { seasonalCandles: 29 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.BearhugHermitOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BearhugHermitSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionBearhug1 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BearhugHermitMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BearhugHermitBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Red horns",
				cosmetic: Cosmetic.BearhugHermitRedHorns,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BearhugHermitSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BearhugHermitWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BearhugHermitBlessing2,
				cost: { candles: 5 },
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionBearhug2,
				cost: { hearts: 8 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BearhugHermitHair,
				cost: { candles: 50 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.BearhugHermitOutfit,
				cost: { candles: 70 },
			},
		],
	},
	keywords: ["yeti"],
	visits: {
		travelling: [75, 107],
	},
});
