import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.SanctuaryGuide,
	seasonId: SeasonId.Sanctuary,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.SanctuaryGuideQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.SanctuaryGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.SanctuaryPendant },
			{
				name: "Handpan",
				cosmetic: Cosmetic.SanctuaryHandpan,
				cost: { seasonalHearts: 3 },
			},
			{
				name: "Manta cape",
				cosmetic: Cosmetic.SanctuaryGuideMantaCape,
				cost: { seasonalHearts: 3 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.SanctuaryGuideQuest2,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.SanctuaryGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.SanctuaryGuideQuest3,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.SanctuaryGuideHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.SanctuaryGuideQuest4,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.SanctuaryGuideHeart4,
				cost: { candles: 3 },
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.SanctuaryGuideQuest5,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.SanctuaryGuideHeart5,
				cost: { candles: 3 },
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.SanctuaryGuideQuest6,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.SanctuaryGuideHeart6,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.SanctuaryGuideFriendActionHug,
			},
		],
	},
});
