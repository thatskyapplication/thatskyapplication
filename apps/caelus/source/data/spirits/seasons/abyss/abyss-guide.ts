import { Cosmetic, GuideSpirit, RealmName, SeasonId, SpiritId } from "@thatskyapplication/utility";

export default new GuideSpirit({
	id: SpiritId.AbyssGuide,
	seasonId: SeasonId.Abyss,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.AbyssGuideQuest1 },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.AbyssGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.AbyssGuidePendant },
			{
				name: "Ultimate face accessory",
				cosmetic: Cosmetic.AbyssGuideUltimateFaceAccessory,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.AbyssGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.AbyssGuideUltimateMask,
				cost: { seasonalHearts: 1 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.AbyssGuideQuest2 },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.AbyssGuideHeart2,
				cost: { candles: 3 },
			},
			{ name: "Quest 3", cosmetic: Cosmetic.AbyssGuideQuest3 },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.AbyssGuideHeart3,
				cost: { candles: 3 },
			},
			{ name: "Quest 4", cosmetic: Cosmetic.AbyssGuideQuest4 },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.AbyssGuideHeart4,
				cost: { candles: 3 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.AbyssGuideQuest5 },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.AbyssGuideHeart5,
				cost: { candles: 3 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AbyssGuideMask,
				cost: { candles: 48 },
			},
		],
	},
});
