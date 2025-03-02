import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.WavingLight;

export default new SeasonalSpirit({
	id: SpiritId.RunningWayfarer,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWavingLight1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteWavingLight2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.RunningWayfarerMask,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.RunningWayfarerBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RunningWayfarerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Hair", cosmetic: Cosmetic.RunningWayfarerHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWavingLight3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteWavingLight4 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.RunningWayfarerBlessing3,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.RunningWayfarerMusicSheet },
			{
				name: "Cape",
				cosmetic: Cosmetic.RunningWayfarerCape,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.RunningWayfarerBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RunningWayfarerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
