import { Cosmetic } from "../../../cosmetics.js";
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
			{ cosmetic: Cosmetic.StanceInjured },
			{
				cosmetic: Cosmetic.WoundedWarriorBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.WoundedWarriorMask },
			{
				cosmetic: Cosmetic.WoundedWarriorOutfit,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.WoundedWarriorBlessing2 },
			{
				cosmetic: Cosmetic.WoundedWarriorBlessing3,
				cost: { seasonalCandles: 36 },
			},
			{ cosmetic: Cosmetic.WoundedWarriorCape },
			{
				cosmetic: Cosmetic.WoundedWarriorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
