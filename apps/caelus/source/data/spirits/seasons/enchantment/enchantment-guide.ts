import {
	Cosmetic,
	FriendAction,
	GuideSpirit,
	RealmName,
	SeasonId,
	SpiritId,
} from "@thatskyapplication/utility";

export default new GuideSpirit({
	id: SpiritId.EnchantmentGuide,
	seasonId: SeasonId.Enchantment,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.EnchantmentGuideQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.EnchantmentGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.EnchantmentPendant },
			{
				name: "Ultimate face accessory",
				cosmetic: Cosmetic.EnchantmentUltimateFaceAccessory,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Turban",
				cosmetic: Cosmetic.EnchantmentTurban,
				cost: { seasonalHearts: 4 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.EnchantmentGuideQuest2,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.EnchantmentGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.EnchantmentGuideQuest3,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.EnchantmentGuideHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.EnchantmentGuideQuest4,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.EnchantmentGuideHeart4,
				cost: { candles: 3 },
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.EnchantmentGuideQuest5,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.EnchantmentGuideHeart5,
				cost: { candles: 3 },
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.EnchantmentGuideQuest6,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.EnchantmentGuideHeart6,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.EnchantmentGuideHug,
			},
		],
	},
});
