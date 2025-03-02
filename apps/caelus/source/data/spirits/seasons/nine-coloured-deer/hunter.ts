import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Flex;

export default new SeasonalSpirit({
	id: SpiritId.Hunter,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFlex1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteFlex2 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.HunterOutfit,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.HunterBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFlex3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteFlex4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HunterBlessing2,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Hair", cosmetic: Cosmetic.HunterHair },
			{
				name: "Cape",
				cosmetic: Cosmetic.HunterCape,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.HunterBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HunterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
