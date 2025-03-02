import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Somersault;

export default new SeasonalSpirit({
	id: SpiritId.TumblingTroublemaker,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSomersault1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSomersault2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Hair", cosmetic: Cosmetic.TumblingTroublemakerHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSomersault3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSomersault4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Cape", cosmetic: Cosmetic.TumblingTroublemakerCape },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing3,
				cost: { seasonalCandles: 32 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.TumblingTroublemakerFaceAccessory,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
