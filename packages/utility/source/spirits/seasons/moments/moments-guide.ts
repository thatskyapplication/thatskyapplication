import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.MomentsGuide,
	seasonId: SeasonId.Moments,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{
				name: "Camera",
				cosmetic: Cosmetic.MomentsGuideCamera,
			},
			{ name: "Pendant", cosmetic: Cosmetic.MomentsPendant },
			{
				name: "Ultimate face accessory",
				cosmetic: Cosmetic.MomentsGuideUltimateFaceAccessory,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate camera",
				cosmetic: Cosmetic.MomentsGuideUltimateCamera,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate hair accessory",
				cosmetic: Cosmetic.MomentsGuideUltimateHairAccessory,
				cost: { seasonalHearts: 2 },
			},
			{ name: "Quest 1", cosmetic: Cosmetic.MomentsGuideQuest1 },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.MomentsGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.MomentsGuideQuest2 },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.MomentsGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.MomentsGuideDoubleFive,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.MomentsGuideQuest3 },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.MomentsGuideHeart3,
				cost: { candles: 3 },
			},
			{ name: "Quest 4", cosmetic: Cosmetic.MomentsGuideQuest4 },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.MomentsGuideHeart4,
				cost: { candles: 3 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.MomentsGuideQuest5 },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.MomentsGuideHeart5,
				cost: { candles: 3 },
			},
		],
	},
});
