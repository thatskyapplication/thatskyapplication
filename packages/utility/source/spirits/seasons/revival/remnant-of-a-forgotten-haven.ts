import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.RemnantOfAForgottenHaven,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing1,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.RemnantOfAForgottenHavenShoes },
			{
				cosmetic: Cosmetic.RemnantOfAForgottenHavenCape,
				cost: { seasonalCandles: 32 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing2,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.RemnantOfAForgottenHavenBlessing3,
				cost: { seasonalCandles: 40 },
			},
			{
				cosmetic: Cosmetic.RemnantOfAForgottenHavenHairAccessory,
			},
			{
				cosmetic: Cosmetic.RemnantOfAForgottenHavenSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
