import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.ChestPound;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfFire,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChestPound1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteChestPound2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfFireBlessing1,
				cost: { seasonalCandles: 13 },
			},
			{ name: "Hair", cosmetic: Cosmetic.ProphetOfFireHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChestPound3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteChestPound4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfFireBlessing2,
				cost: { seasonalCandles: 23 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.ProphetOfFireMusicSheet },
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfFireMask,
				cost: { seasonalCandles: 29 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.ProphetOfFireOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfFireSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChestPound1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteChestPound2,
				cost: { hearts: 4 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ProphetOfFireProp,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfFireBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfFireHair,
				cost: { candles: 44 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfFireSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProphetOfFireWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChestPound3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteChestPound4,
				cost: { hearts: 6 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProphetOfFireMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfFireBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfFireMask,
				cost: { candles: 54 },
			},
			{
				name: "Cauldron",
				cosmetic: Cosmetic.ProphetOfFireCauldron,
				cost: { hearts: 13 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ProphetOfFireOutfit,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [50, 93],
	},
});
