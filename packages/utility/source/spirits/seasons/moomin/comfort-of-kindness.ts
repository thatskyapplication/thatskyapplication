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
				name: "Blessing 1",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{
				name: "Prop 1",
				cosmetic: Cosmetic.ComfortOfKindnessProp1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ComfortOfKindnessHair,
				cost: { seasonalCandles: 16 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing2,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.ComfortOfKindnessProp2,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.ComfortOfKindnessNeckAccessory,
				cost: { seasonalCandles: 24 },
			},
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing4,
			},
			{
				name: "Blessing 5",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing5,
				cost: { seasonalCandles: 32 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ComfortOfKindnessCape,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ComfortOfKindnessSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
