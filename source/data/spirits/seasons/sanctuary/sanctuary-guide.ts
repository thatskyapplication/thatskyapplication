import { GuideSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.SanctuaryGuide,
	seasonId: SeasonId.Sanctuary,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.SanctuaryGuideQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.SanctuaryGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Pendant", cosmetic: Cosmetic.SanctuaryPendant, emoji: NECKLACE_EMOJIS.Necklace06 },
			{
				name: "Handpan",
				cosmetic: Cosmetic.SanctuaryHandpan,
				cost: { seasonalHearts: 3 },
				emoji: HELD_PROPS_EMOJIS.HeldProp17,
			},
			{
				name: "Manta cape",
				cosmetic: Cosmetic.SanctuaryGuideMantaCape,
				cost: { seasonalHearts: 3 },
				emoji: CAPE_EMOJIS.Cape31,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.SanctuaryGuideQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.SanctuaryGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.SanctuaryGuideQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.SanctuaryGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.SanctuaryGuideQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.SanctuaryGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.SanctuaryGuideQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.SanctuaryGuideHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.SanctuaryGuideQuest6,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.SanctuaryGuideHeart6,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.SanctuaryGuideFriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
		],
	},
});
