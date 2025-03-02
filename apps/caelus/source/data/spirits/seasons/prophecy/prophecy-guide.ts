import {
	Cosmetic,
	FriendAction,
	GuideSpirit,
	RealmName,
	SeasonId,
	SpiritId,
} from "@thatskyapplication/utility";

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
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.ProphecyGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.ProphecyPendant },
			{
				name: "Dunun",
				cosmetic: Cosmetic.ProphecyGuideDunun,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Anubis mask",
				cosmetic: Cosmetic.ProphecyGuideAnubisMask,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.ProphecyGuideQuest2,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.ProphecyGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.ProphecyGuideQuest3,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.ProphecyGuideHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.ProphecyGuideQuest4,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.ProphecyGuideHeart4,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.ProphecyGuideFriendActionHug,
			},
		],
	},
});
