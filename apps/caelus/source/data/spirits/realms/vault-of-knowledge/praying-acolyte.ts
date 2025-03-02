import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Pray;

export default new StandardSpirit({
	id: SpiritId.PrayingAcolyte,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePray1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmotePray2,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PrayingAcolyteBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PrayingAcolyteHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PrayingAcolyteHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.PrayingAcolyteWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePray3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmotePray4,
				cost: { candles: 7 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PrayingAcolyteBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.PrayingAcolyteCape1,
				cost: { hearts: 25 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.PrayingAcolyteWingBuff2,
				cost: { ascendedCandles: 9 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.PrayingAcolyteCape2,
				cost: { hearts: 75 },
			},
		],
	},
});
