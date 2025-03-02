import { Cosmetic, GuideSpirit, RealmName, SeasonId, SpiritId } from "@thatskyapplication/utility";

export default new GuideSpirit({
	id: SpiritId.TheRose,
	seasonId: SeasonId.LittlePrince,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.TheRoseQuest1 },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.TheRoseHeart1,
				cost: { candles: 3 },
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.LittlePrincePendant,
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.TheRoseUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.TheRoseUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Rose",
				cosmetic: Cosmetic.TheRoseRose,
				cost: { seasonalHearts: 1 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.TheRoseQuest2 },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.TheRoseHeart2,
				cost: { candles: 3 },
			},
			{ name: "Quest 3", cosmetic: Cosmetic.TheRoseQuest3 },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.TheRoseHeart3,
				cost: { candles: 3 },
			},
			{ name: "Quest 4", cosmetic: Cosmetic.TheRoseQuest4 },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.TheRoseHeart4,
				cost: { candles: 3 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.TheRoseQuest5 },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.TheRoseHeart5,
				cost: { candles: 3 },
			},
			{ name: "Quest 6", cosmetic: Cosmetic.TheRoseQuest6 },
			{
				name: "Heart 6",
				cosmetic: Cosmetic.TheRoseHeart6,
				cost: { candles: 3 },
			},
			{ name: "Quest 7", cosmetic: Cosmetic.TheRoseQuest7 },
			{
				name: "Heart 7",
				cosmetic: Cosmetic.TheRoseHeart7,
				cost: { candles: 3 },
			},
			{
				name: "Sword outfit",
				cosmetic: Cosmetic.SwordOutfit,
				cost: { candles: 200 },
			},
		],
	},
});
