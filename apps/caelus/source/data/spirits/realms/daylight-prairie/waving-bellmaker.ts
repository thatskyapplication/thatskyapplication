import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Wave;

export default new StandardSpirit({
	id: SpiritId.WavingBellmaker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWave1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteWave2,
				cost: { candles: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WavingBellmakerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.WavingBellmakerHair,
				cost: { hearts: 2 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WavingBellmakerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.WavingBellmakerWingBuff1,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWave3,
				cost: { candles: 2 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteWave4,
				cost: { candles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WavingBellmakerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.WavingBellmakerMask,
				cost: { hearts: 5 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.WavingBellmakerWingBuff2,
				cost: { ascendedCandles: 6 },
			},
			{
				name: `${emote} 5`,
				cosmetic: Cosmetic.EmoteWave5,
				cost: { candles: 3 },
			},
			{
				name: `${emote} 6`,
				cosmetic: Cosmetic.EmoteWave6,
				cost: { candles: 3 },
			},
		],
	},
});
