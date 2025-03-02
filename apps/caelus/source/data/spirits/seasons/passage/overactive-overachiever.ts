import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.PullUp;

export default new SeasonalSpirit({
	id: SpiritId.OveractiveOverachiever,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePullUp1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePullUp2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.OveractiveOverachieverBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{
				name: "Manta ocarina",
				cosmetic: Cosmetic.OveractiveOverachieverMantaOcarina,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePullUp3,
				cost: { seasonalCandles: 22 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePullUp4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.OveractiveOverachieverCape,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.OveractiveOverachieverBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.OveractiveOverachieverBlessing3,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Hair", cosmetic: Cosmetic.OveractiveOverachieverHair },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.OveractiveOverachieverSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
