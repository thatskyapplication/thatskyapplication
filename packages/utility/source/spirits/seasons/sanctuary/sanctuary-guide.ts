import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.SanctuaryGuide,
	seasonId: SeasonId.Sanctuary,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		current: [
			{
				cosmetic: Cosmetic.SanctuaryGuideQuest1,
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideHeart1,
				cost: { candles: 3 },
			},
			{ cosmetic: Cosmetic.SanctuaryPendant },
			{
				cosmetic: Cosmetic.SanctuaryHandpan,
				cost: { seasonalHearts: 3 },
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideMantaCape,
				cost: { seasonalHearts: 3 },
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideQuest2,
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideHeart2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideQuest3,
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideHeart3,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideQuest4,
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideHeart4,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideQuest5,
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideHeart5,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideQuest6,
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideHeart6,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SanctuaryGuideFriendActionHug,
			},
		],
	},
});
