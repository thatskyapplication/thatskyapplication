import {
	Cosmetic,
	FriendAction,
	GuideSpirit,
	SeasonId,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../utility/emojis.js";

export default new GuideSpirit({
	id: SpiritId.HopefulSteward,
	seasonId: SeasonId.Revival,
	offer: {
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.HopefulStewardQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.HopefulStewardHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Pendant", cosmetic: Cosmetic.RevivalPendant, emoji: NECKLACE_EMOJIS.Necklace32 },
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.HopefulStewardUltimateHair,
				cost: { seasonalHearts: 2 },
				emoji: HAIR_EMOJIS.Hair132,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.HopefulStewardUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape115,
			},
			// {
			// 	name: "Quest 2",
			// 	cosmetic: Cosmetic.HopefulStewardQuest2,
			// 	emoji: MISCELLANEOUS_EMOJIS.Quest,
			// },
			// {
			// 	name: "Heart 2",
			// 	cosmetic: Cosmetic.HopefulStewardHeart2,
			// 	cost: { candles: 3 },
			// 	emoji: MISCELLANEOUS_EMOJIS.Heart,
			// },
			{
				name: "Quest 2",
				cosmetic: Cosmetic.HopefulStewardQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.HopefulStewardHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.HopefulStewardQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.HopefulStewardHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.HopefulStewardFriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.HopefulStewardQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.HopefulStewardHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.HopefulStewardQuest6,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.HopefulStewardHeart6,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.HopefulStewardQuest7,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.HopefulStewardHeart7,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 7",
				cosmetic: Cosmetic.HopefulStewardQuest8,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Quest 8",
				cosmetic: Cosmetic.HopefulStewardQuest9,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Quest 9",
				cosmetic: Cosmetic.HopefulStewardQuest10,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.HopefulStewardHair,
				cost: { candles: 46 },
				emoji: HAIR_EMOJIS.Hair133,
			},
		],
	},
});
