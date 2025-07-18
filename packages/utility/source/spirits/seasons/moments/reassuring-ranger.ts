import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.SideHug;

export default new SeasonalSpirit({
	id: SpiritId.ReassuringRanger,
	seasonId: SeasonId.Moments,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.FriendActionSideHug1 },
			{ cosmetic: Cosmetic.FriendActionSideHug2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ReassuringRangerBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{
				cosmetic: Cosmetic.ReassuringRangerFaceAccessory,
			},
			{
				cosmetic: Cosmetic.ReassuringRangerMask,
				cost: { seasonalCandles: 26 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ReassuringRangerBlessing2,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.ReassuringRangerBlessing3,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.ReassuringRangerCape },
			{
				cosmetic: Cosmetic.ReassuringRangerHairAccessory,
				cost: { seasonalCandles: 36 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.ReassuringRangerBlessing4,
			},
			{
				cosmetic: Cosmetic.ReassuringRangerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
