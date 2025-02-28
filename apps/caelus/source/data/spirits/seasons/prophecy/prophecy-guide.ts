import { Cosmetic, FriendAction, RealmName, SeasonId, SpiritId } from "@thatskyapplication/utility";
import { GuideSpirit } from "../../../../models/Spirits.js";
import {
	FRIEND_ACTION_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../utility/emojis.js";

export default new GuideSpirit({
	id: SpiritId.ProphecyGuide,
	seasonId: SeasonId.Prophecy,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.ProphecyGuideQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.ProphecyGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Pendant", cosmetic: Cosmetic.ProphecyPendant, emoji: NECKLACE_EMOJIS.Necklace08 },
			{
				name: "Dunun",
				cosmetic: Cosmetic.ProphecyGuideDunun,
				cost: { seasonalHearts: 2 },
				emoji: HELD_PROPS_EMOJIS.HeldProp19,
			},
			{
				name: "Anubis mask",
				cosmetic: Cosmetic.ProphecyGuideAnubisMask,
				cost: { seasonalHearts: 2 },
				emoji: MASK_EMOJIS.Mask36,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.ProphecyGuideQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.ProphecyGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.ProphecyGuideQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.ProphecyGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.ProphecyGuideQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.ProphecyGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.ProphecyGuideFriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
		],
	},
});
