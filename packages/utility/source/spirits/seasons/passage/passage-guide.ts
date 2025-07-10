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
			{ cosmetic: Cosmetic.PassageGuideQuest1 },
			{
				cosmetic: Cosmetic.PassageGuideHeart1,
				cost: { candles: 3 },
			},
			{ cosmetic: Cosmetic.PassagePendant },
			{
				cosmetic: Cosmetic.PassageGuideUltimateMask,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.PassageGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{ cosmetic: Cosmetic.PassageGuideQuest2 },
			{
				cosmetic: Cosmetic.PassageGuideSerowMask,
				cost: { candles: 48 },
			},
			{ cosmetic: Cosmetic.PassageGuideQuest3 },
			{
				cosmetic: Cosmetic.PassageGuideHeart2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PassageGuideBoarMask,
				cost: { candles: 44 },
			},
			{ cosmetic: Cosmetic.PassageGuideQuest4 },
			{
				cosmetic: Cosmetic.PassageGuideHeart3,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PassageGuideMonkeyMask,
				cost: { candles: 46 },
			},
			{ cosmetic: Cosmetic.PassageGuideQuest5 },
			{
				cosmetic: Cosmetic.PassageGuideHeart4,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PassageGuideHackySack,
				cost: { hearts: 39 },
			},
			{
				cosmetic: Cosmetic.PassageGuideRacoonMask,
				cost: { candles: 52 },
			},
		],
	},
});
