import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";

const action = FriendAction.CradleCarry;

export default new SeasonalSpirit({
	id: SpiritId.FeudalLord,
	seasonId: SeasonId.NineColouredDeer,
	action,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionCradleCarry1 },
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionCradleCarry2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FeudalLordBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.FeudalLordHairAccessory,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.FeudalLordMask,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.FeudalLordBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.FeudalLordBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Cape", cosmetic: Cosmetic.FeudalLordCape },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FeudalLordMusicSheet,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.FeudalLordBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.FeudalLordSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
