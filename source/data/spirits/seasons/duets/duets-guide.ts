import { GuideSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.DuetsGuide,
	seasonId: SeasonId.Duets,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.DuetsGuideQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Mask",
				cosmetic: Cosmetic.DuetsGuideMask,
				cost: { candles: 65 },
				emoji: MASK_EMOJIS.Mask93,
			},
			{ name: "Pendant", cosmetic: Cosmetic.DuetsPendant, emoji: NECKLACE_EMOJIS.Necklace37 },
			{
				name: "Ultimate prop 1",
				cosmetic: Cosmetic.DuetsGuideUltimateProp1,
				cost: { seasonalHearts: 1 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp71,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.DuetsGuideUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape133,
			},
			{
				name: "Ultimate prop 2",
				cosmetic: Cosmetic.DuetsGuideUltimateProp2,
				cost: { seasonalHearts: 2 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp72,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.DuetsGuideQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", cosmetic: Cosmetic.DuetsGuideHeart1, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 3", cosmetic: Cosmetic.DuetsGuideQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: `${FriendAction.DuetBow} 1`,
				cosmetic: Cosmetic.DuetsGuideDuetBow1,
				emoji: FRIEND_ACTION_EMOJIS.DuetBow,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.DuetsGuideQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: `${FriendAction.DuetBow} 2`,
				cosmetic: Cosmetic.DuetsGuideDuetBow2,
				cost: { hearts: 2 },
				emoji: FRIEND_ACTION_EMOJIS.DuetBow,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.DuetsGuideQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", cosmetic: Cosmetic.DuetsGuideHeart2, emoji: MISCELLANEOUS_EMOJIS.Heart },
		],
	},
});
