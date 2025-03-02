import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
	SpiritStance,
} from "@thatskyapplication/utility";

const stance = SpiritStance.Injured;

export default new SeasonalSpirit({
	id: SpiritId.WoundedWarrior,
	seasonId: SeasonId.Remembrance,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceInjured },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WoundedWarriorBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Mask", cosmetic: Cosmetic.WoundedWarriorMask },
			{
				name: "Outfit",
				cosmetic: Cosmetic.WoundedWarriorOutfit,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.WoundedWarriorBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.WoundedWarriorBlessing3,
				cost: { seasonalCandles: 36 },
			},
			{ name: "Cape", cosmetic: Cosmetic.WoundedWarriorCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.WoundedWarriorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
