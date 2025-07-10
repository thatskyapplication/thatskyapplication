import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.CradleCarry;

export default new SeasonalSpirit({
	id: SpiritId.FeudalLord,
	seasonId: SeasonId.NineColouredDeer,
	action,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.FriendActionCradleCarry1 },
			{ cosmetic: Cosmetic.FriendActionCradleCarry2 },
			{
				cosmetic: Cosmetic.FeudalLordBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{
				cosmetic: Cosmetic.FeudalLordHairAccessory,
			},
			{
				cosmetic: Cosmetic.FeudalLordMask,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.FeudalLordBlessing2 },
			{
				cosmetic: Cosmetic.FeudalLordBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.FeudalLordCape },
			{
				cosmetic: Cosmetic.FeudalLordMusicSheet,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.FeudalLordBlessing4 },
			{
				cosmetic: Cosmetic.FeudalLordSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
