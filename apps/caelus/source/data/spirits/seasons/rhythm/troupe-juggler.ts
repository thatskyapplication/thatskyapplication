import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Juggle;

export default new SeasonalSpirit({
	id: SpiritId.TroupeJuggler,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteJuggle1,
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteJuggle2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TroupeJugglerHair,
				cost: { seasonalCandles: 12 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TroupeJugglerBlessing1,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteJuggle3,
				cost: { seasonalCandles: 14 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteJuggle4,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TroupeJugglerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Cape", cosmetic: Cosmetic.TroupeJugglerCape },
			{
				name: "Outfit",
				cosmetic: Cosmetic.TroupeJugglerOutfit,
				cost: { seasonalCandles: 18 },
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.TroupeJugglerBlessing3,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TroupeJugglerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteJuggle1,
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteJuggle2,
				cost: { hearts: 4 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.TroupeJugglerProp,
				cost: { hearts: 14 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TroupeJugglerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TroupeJugglerHair,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TroupeJugglerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TroupeJugglerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteJuggle3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteJuggle4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TroupeJugglerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.TroupeJugglerCape,
				cost: { candles: 75 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TroupeJugglerOutfit,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [44, 99],
		returning: [7],
	},
});
