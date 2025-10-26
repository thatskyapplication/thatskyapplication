import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.WoundedWarrior,
	seasonId: SeasonId.Remembrance,
	stance: Cosmetic.StanceInjured,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.StanceInjured }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WoundedWarriorBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.WoundedWarriorMask,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.WoundedWarriorOutfit,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WoundedWarriorBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.WoundedWarriorBlessing3,
					cost: { seasonalCandles: 36 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.WoundedWarriorCape,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.WoundedWarriorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[{ cosmetic: Cosmetic.StanceInjured }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WoundedWarriorBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.WoundedWarriorMask,
					cost: { candles: 45 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.WoundedWarriorSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.WoundedWarriorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WoundedWarriorBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.WoundedWarriorOutfit,
					cost: { candles: 60 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.WoundedWarriorCape,
					cost: { candles: 80 },
				},
			],
		],
	},
	visits: { returning: [10] },
});
