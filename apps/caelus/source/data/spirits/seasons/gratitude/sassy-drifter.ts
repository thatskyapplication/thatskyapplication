import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
	SpiritStance,
} from "@thatskyapplication/utility";

const stance = SpiritStance.Sassy;

export default new SeasonalSpirit({
	id: SpiritId.SassyDrifter,
	seasonId: SeasonId.Gratitude,
	stance,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSassy },
			{
				name: "Hair",
				cosmetic: Cosmetic.SassyDrifterHair,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.SassyDrifterBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SassyDrifterBlessing2,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Weasel mask", cosmetic: Cosmetic.SassyDrifterMask },
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSassy },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SassyDrifterBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SassyDrifterHair,
				cost: { candles: 26 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SassyDrifterHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SassyDrifterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SassyDrifterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Weasel mask",
				cosmetic: Cosmetic.SassyDrifterMask,
				cost: { candles: 48 },
			},
		],
	},
	visits: {
		travelling: [1, 10, 39, 76, 111],
	},
	keywords: ["weasel", "weasel mask"],
});
