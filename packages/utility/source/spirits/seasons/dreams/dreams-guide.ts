import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.DreamsGuide,
	seasonId: SeasonId.Dreams,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.DreamsGuideQuest1 },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.DreamsGuideHeart1,
				cost: { candles: 3 },
			},
			{
				name: "Phoenix mask",
				cosmetic: Cosmetic.DreamsGuidePhoenixMask,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.DreamsGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.DreamsGuideQuest2 },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.DreamsGuideHeart2,
				cost: { candles: 3 },
			},
			{ name: "Quest 3", cosmetic: Cosmetic.DreamsGuideQuest3 },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.DreamsGuideHeart3,
				cost: { candles: 3 },
			},
			{ name: "Quest 4", cosmetic: Cosmetic.DreamsGuideQuest4 },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.DreamsGuideHeart4,
				cost: { candles: 3 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.DreamsGuideQuest5 },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.DreamsGuideHeart5,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.DreamsGuideFriendActionHug,
			},
		],
	},
});
