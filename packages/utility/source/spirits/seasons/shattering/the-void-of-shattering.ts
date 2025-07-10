import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.TheVoidOfShattering,
	seasonId: SeasonId.Shattering,
	offer: {
		current: [
			{
				cosmetic: Cosmetic.TheVoidofShatteringQuest1,
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringHeart1,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.ShatteringPendant,
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringMantaCape,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringDarkDragonCape,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringQuest2,
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringHeart2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringQuest3,
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringHeart3,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringQuest4,
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringHeart4,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringQuest5,
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringHeart5,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringQuest6,
			},
			{
				cosmetic: Cosmetic.TheVoidofShatteringHeart6,
				cost: { candles: 3 },
			},
		],
	},
});
