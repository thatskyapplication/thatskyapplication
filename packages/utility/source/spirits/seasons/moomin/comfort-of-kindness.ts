import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ComfortOfKindness,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ComfortOfKindnessBlessing1,
					cost: { seasonalCandles: 6 },
				},
				{
					cosmetic: Cosmetic.ComfortOfKindnessProp1,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ComfortOfKindnessHair,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ComfortOfKindnessBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ComfortOfKindnessBlessing3,
					cost: { seasonalCandles: 20 },
				},
				{
					cosmetic: Cosmetic.ComfortOfKindnessProp2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ComfortOfKindnessNeckAccessory,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.ComfortOfKindnessBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 5 },
					cosmetic: Cosmetic.ComfortOfKindnessBlessing5,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ComfortOfKindnessCape,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ComfortOfKindnessSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
