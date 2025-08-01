import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Injured;

export default new SeasonalSpirit({
	id: SpiritId.WoundedWarrior,
	seasonId: SeasonId.Remembrance,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[{ cosmetic: Cosmetic.StanceInjured }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WoundedWarriorBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{ cosmetic: Cosmetic.WoundedWarriorMask, seasonPass: true },
			],
			[
				{
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
				{ cosmetic: Cosmetic.WoundedWarriorCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.WoundedWarriorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
