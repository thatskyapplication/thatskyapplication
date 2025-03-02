import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

const action = FriendAction.SideHug;

export default new SeasonalSpirit({
	id: SpiritId.ReassuringRanger,
	seasonId: SeasonId.Moments,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionSideHug1 },
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionSideHug2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ReassuringRangerBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ReassuringRangerFaceAccessory,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ReassuringRangerMask,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ReassuringRangerBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ReassuringRangerBlessing3,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Cape", cosmetic: Cosmetic.ReassuringRangerCape },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.ReassuringRangerHairAccessory,
				cost: { seasonalCandles: 36 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.ReassuringRangerBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ReassuringRangerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
