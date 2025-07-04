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
				name: "Quest 1",
				cosmetic: Cosmetic.TheVoidofShatteringQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.TheVoidofShatteringHeart1,
				cost: { candles: 3 },
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.ShatteringPendant,
			},
			{
				name: "Manta cape",
				cosmetic: Cosmetic.TheVoidofShatteringMantaCape,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Dark dragon cape",
				cosmetic: Cosmetic.TheVoidofShatteringDarkDragonCape,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.TheVoidofShatteringQuest2,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.TheVoidofShatteringHeart2,
				cost: { candles: 3 },
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.TheVoidofShatteringQuest3,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.TheVoidofShatteringHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.TheVoidofShatteringQuest4,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.TheVoidofShatteringHeart4,
				cost: { candles: 3 },
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.TheVoidofShatteringQuest5,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.TheVoidofShatteringHeart5,
				cost: { candles: 3 },
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.TheVoidofShatteringQuest6,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.TheVoidofShatteringHeart6,
				cost: { candles: 3 },
			},
		],
	},
});
