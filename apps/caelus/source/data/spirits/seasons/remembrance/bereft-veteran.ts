import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Grieving;

export default new SeasonalSpirit({
	id: SpiritId.BereftVeteran,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrieving1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrieving2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.BereftVeteranMask,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.BereftVeteranBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BereftVeteranBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Hair", cosmetic: Cosmetic.BereftVeteranHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrieving3,
				cost: { seasonalCandles: 30 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrieving4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.BereftVeteranCape,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.BereftVeteranBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BereftVeteranSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
