import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

const call = Cosmetic.CallLighthorn;

export default new SeasonalSpirit({
	id: SpiritId.MigratingBellmaker,
	seasonId: SeasonId.Migration,
	call,
	area: AreaName.DawnCircle,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: call,
				},
				{
					cosmetic: Cosmetic.MusicSheetAncientEcho,
					cost: { seasonalCandles: 17 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MigratingBellmakerHair,
					cost: { seasonalCandles: 23 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MigratingBellmakerBlessing1,
					cost: { seasonalCandles: 4 },
				},
				{
					translation: CosmeticCommon.Dye,
					cosmetic: Cosmetic.MigratingBellmakerDye,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.BlueDye,
					cosmetic: Cosmetic.MigratingBellmakerBlueDye,
					cost: { seasonalCandles: 9 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MigratingBellmakerBlessing2,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: CosmeticCommon.HeadAccessory,
					cosmetic: Cosmetic.MigratingBellmakerHeadAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.MigratingBellmakerCape,
					cost: { seasonalCandles: 36 },
				},
				{ translation: CosmeticCommon.Trust, cosmetic: Cosmetic.MigratingBellmakerTrust },
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MigratingBellmakerBlessing3,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.MigratingBellmakerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
