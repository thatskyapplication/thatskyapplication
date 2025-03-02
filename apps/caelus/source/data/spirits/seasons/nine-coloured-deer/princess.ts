import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.FloatSpin;

export default new SeasonalSpirit({
	id: SpiritId.Princess,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFloatSpin1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteFloatSpin2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.PrincessMask,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PrincessBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PrincessBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Hair", cosmetic: Cosmetic.PrincessHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFloatSpin3,
				cost: { seasonalCandles: 22 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteFloatSpin4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PrincessOutfit,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.PrincessBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.PrincessBlessing4,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Cape", cosmetic: Cosmetic.PrincessCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PrincessSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
