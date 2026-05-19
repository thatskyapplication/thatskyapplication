import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";
import { RealmName } from "../../geography.js";

const action = FriendAction.SideHug;

export default new SeasonalSpirit({
	id: SpiritId.ReassuringRanger,
	seasonId: SeasonId.Moments,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.FriendActionSideHug1 },
				{ cosmetic: Cosmetic.FriendActionSideHug2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ReassuringRangerBlessing1,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ReassuringRangerFaceAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ReassuringRangerMask,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ReassuringRangerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ReassuringRangerBlessing3,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ReassuringRangerCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.ReassuringRangerHairAccessory,
					cost: { seasonalCandles: 36 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.ReassuringRangerBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ReassuringRangerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.FriendActionSideHug1 },
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ReassuringRangerFaceAccessory,
					cost: { candles: 35 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ReassuringRangerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ReassuringRangerMask,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ReassuringRangerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ReassuringRangerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ReassuringRangerBlessing2,
					cost: { candles: 5 },
				},
				{ cosmetic: Cosmetic.FriendActionSideHug2, level: 2, cost: { hearts: 8 } },
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.ReassuringRangerHairAccessory,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ReassuringRangerCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2026, 5, 21), end: skyDate(2026, 5, 25) }],
	},
});
