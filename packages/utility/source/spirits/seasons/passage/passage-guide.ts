import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.PassageGuide,
	seasonId: SeasonId.Passage,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.PassageGuideQuest1 },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.PassageGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.PassagePendant },
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.PassageGuideUltimateMask,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.PassageGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.PassageGuideQuest2 },
			{
				name: "Serow mask",
				cosmetic: Cosmetic.PassageGuideSerowMask,
				cost: { candles: 48 },
			},
			{ name: "Quest 3", cosmetic: Cosmetic.PassageGuideQuest3 },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.PassageGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: "Boar mask",
				cosmetic: Cosmetic.PassageGuideBoarMask,
				cost: { candles: 44 },
			},
			{ name: "Quest 4", cosmetic: Cosmetic.PassageGuideQuest4 },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.PassageGuideHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Monkey mask",
				cosmetic: Cosmetic.PassageGuideMonkeyMask,
				cost: { candles: 46 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.PassageGuideQuest5 },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.PassageGuideHeart4,
				cost: { candles: 3 },
			},
			{
				name: "Hacky sack",
				cosmetic: Cosmetic.PassageGuideHackySack,
				cost: { hearts: 39 },
			},
			{
				name: "Racoon mask",
				cosmetic: Cosmetic.PassageGuideRacoonMask,
				cost: { candles: 52 },
			},
		],
	},
});
