import { FriendAction, RealmName, SeasonId, SpiritName } from "@thatskyapplication/utility";
import { GuideSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";

export default new GuideSpirit({
	name: SpiritName.DreamsGuide,
	seasonId: SeasonId.Dreams,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.DreamsGuideQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.DreamsGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Phoenix mask",
				cosmetic: Cosmetic.DreamsGuidePhoenixMask,
				cost: { seasonalHearts: 2 },
				emoji: MASK_EMOJIS.Mask40,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.DreamsGuideUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape46,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.DreamsGuideQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.DreamsGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.DreamsGuideQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.DreamsGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.DreamsGuideQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.DreamsGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.DreamsGuideQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.DreamsGuideHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.DreamsGuideFriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
		],
	},
});
