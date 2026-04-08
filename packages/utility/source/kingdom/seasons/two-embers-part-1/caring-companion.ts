import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CaringCompanion,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.Quest,
					cosmetic: Cosmetic.CaringCompanionQuest,
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.CaringCompanionHeart,
				},
			],
			[
				{
					cosmetic: Cosmetic.CaringCompanionProp,
					cost: { hearts: 12 },
				},
			],
		],
	},
});
