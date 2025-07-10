import { Cosmetic } from "../../../cosmetics.js";
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
			{
				cosmetic: Cosmetic.ComfortOfKindnessBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessProp1,
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessHair,
				cost: { seasonalCandles: 16 },
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessBlessing2,
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessProp2,
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessNeckAccessory,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessBlessing4,
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessBlessing5,
				cost: { seasonalCandles: 32 },
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessCape,
			},
			{
				cosmetic: Cosmetic.ComfortOfKindnessSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
