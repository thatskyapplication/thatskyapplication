import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

const call = Cosmetic.CallLighthorn;

export default new SeasonalSpirit({
	id: SpiritId.MigratingBellmaker,
	seasonId: SeasonId.Migration,
	call,
	realm: RealmName.IsleOfDawn,
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
					cosmetic: Cosmetic.MigratingBellmakerDye,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MigratingBellmakerBlueDye,
					cost: { seasonalCandles: 9 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MigratingBellmakerBlessing2,
					cost: { seasonalCandles: 6 },
				},
				{
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
				{
					cosmetic: Cosmetic.MigratingBellmakerTrust,
				},
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
