import {
	Cosmetic,
	FriendAction,
	GuideSpirit,
	SeasonId,
	SpiritId,
} from "@thatskyapplication/utility";

export default new GuideSpirit({
	id: SpiritId.HopefulSteward,
	seasonId: SeasonId.Revival,
	offer: {
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.HopefulStewardQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.HopefulStewardHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.RevivalPendant },
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.HopefulStewardUltimateHair,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.HopefulStewardUltimateCape,
				cost: { seasonalHearts: 2 },
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
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.HopefulStewardHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.HopefulStewardQuest4,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.HopefulStewardHeart4,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.HopefulStewardFriendActionHug,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.HopefulStewardQuest5,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.HopefulStewardHeart5,
				cost: { candles: 3 },
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.HopefulStewardQuest6,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.HopefulStewardHeart6,
				cost: { candles: 3 },
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.HopefulStewardQuest7,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.HopefulStewardHeart7,
				cost: { candles: 3 },
			},
			{
				name: "Quest 7",
				cosmetic: Cosmetic.HopefulStewardQuest8,
			},
			{
				name: "Quest 8",
				cosmetic: Cosmetic.HopefulStewardQuest9,
			},
			{
				name: "Quest 9",
				cosmetic: Cosmetic.HopefulStewardQuest10,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.HopefulStewardHair,
				cost: { candles: 46 },
			},
		],
	},
});
