import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.HackySack;

export default new SeasonalSpirit({
	id: SpiritId.OddballOutcast,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHackySack1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteHackySack2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.OddballOutcastHair,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.OddballOutcastBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.OddballOutcastBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.OddballOutcastNeckAccessory,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHackySack3,
				cost: { seasonalCandles: 24 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteHackySack4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.OddballOutcastOutfit,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.OddballOutcastBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.OddballOutcastSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHackySack1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHackySack2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.OddballOutcastBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.OddballOutcastHair,
				cost: { candles: 40 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.OddballOutcastSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.OddballOutcastWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHackySack3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHackySack4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.OddballOutcastBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.OddballOutcastNeckAccessory,
				cost: { candles: 65 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.OddballOutcastOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		returning: [7],
	},
});
