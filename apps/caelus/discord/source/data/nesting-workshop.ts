import {
	Cosmetic,
	resolveAllCosmeticsFromItems,
	resolveOfferFromItems,
} from "@thatskyapplication/utility";

const items = resolveOfferFromItems([
	{
		cosmetic: Cosmetic.StoneSingleBench,
		cost: { candles: 32 },
	},
	{
		cosmetic: Cosmetic.StoneWoodFiredOven,
		cost: { ascendedCandles: 35 },
	},
	{
		cosmetic: Cosmetic.StoneTallCube,
		cost: { candles: 88 },
	},
	{
		cosmetic: Cosmetic.StoneSingleBed,
		cost: { hearts: 24 },
	},
	{
		cosmetic: Cosmetic.StoneChair,
		cost: { candles: 64 },
	},
	{
		cosmetic: Cosmetic.StoneSmallTable,
		cost: { candles: 20 },
	},
	{
		cosmetic: Cosmetic.DecorPillowOneColour,
		cost: { candles: 32 },
	},
	{
		cosmetic: Cosmetic.StoneTallShelf,
		cost: { ascendedCandles: 30 },
	},
	{
		cosmetic: Cosmetic.StoneBench,
		cost: { candles: 60 },
	},
	{
		cosmetic: Cosmetic.StoneDesk,
		cost: { candles: 50 },
	},
	{
		cosmetic: Cosmetic.DecorPillowTwoColour,
		cost: { candles: 48 },
	},
	{
		cosmetic: Cosmetic.SmallSolidRug,
		cost: { candles: 25 },
	},
	{
		cosmetic: Cosmetic.StoneArmchair,
		cost: { hearts: 20 },
	},
	{
		cosmetic: Cosmetic.StoneConsoleTable,
		cost: { candles: 45 },
	},
	{
		cosmetic: Cosmetic.DecorFoldedCloth,
		cost: { candles: 40 },
	},
	{
		cosmetic: Cosmetic.SmallStripesRug,
		cost: { candles: 35 },
	},
	{
		cosmetic: Cosmetic.StoneLoveseat,
		cost: { hearts: 33 },
	},
	{
		cosmetic: Cosmetic.StoneRoundDiningTable,
		cost: { hearts: 18 },
	},
	{
		cosmetic: Cosmetic.StonePlantStand,
		cost: { hearts: 24 },
	},
	{
		cosmetic: Cosmetic.SmallClassicRug,
		cost: { hearts: 15 },
	},
	{
		cosmetic: Cosmetic.StoneSofaCorner,
		cost: { candles: 25 },
	},
	{
		cosmetic: Cosmetic.StoneSquareDiningTable,
		cost: { hearts: 23 },
	},
	{
		cosmetic: Cosmetic.StoneWallSconce,
		cost: { ascendedCandles: 32 },
	},
	{
		cosmetic: Cosmetic.SmallHalfCircleRug,
		cost: { candles: 45 },
	},
	{
		cosmetic: Cosmetic.StoneSofaSide,
		cost: { candles: 80 },
	},
	{
		cosmetic: Cosmetic.StoneLongDiningTable,
		cost: { hearts: 33 },
	},
	{
		cosmetic: Cosmetic.StoneSmallBathtub,
		cost: { hearts: 25 },
	},
	{
		cosmetic: Cosmetic.MediumSolidRug,
		cost: { candles: 40 },
	},
	{
		cosmetic: Cosmetic.StoneFigurine,
		cost: { ascendedCandles: 99 },
	},
	{
		cosmetic: Cosmetic.StoneKichenDrawers,
		cost: { candles: 50 },
	},
	{
		cosmetic: Cosmetic.StoneCoffeeTable,
		cost: { ascendedCandles: 28 },
	},
	{
		cosmetic: Cosmetic.StoneCandleLight,
		cost: { ascendedCandles: 32 },
	},
	{
		cosmetic: Cosmetic.MediumStripesRug,
		cost: { candles: 50 },
	},
	{
		cosmetic: Cosmetic.InstrumentStand,
		cost: { ascendedCandles: 33 },
	},
	{
		cosmetic: Cosmetic.StoneWallPotRack,
		cost: { candles: 50 },
	},
	{
		cosmetic: Cosmetic.StoneClosedBox,
		cost: { candles: 30 },
	},
	{
		cosmetic: Cosmetic.StoneWashstand,
		cost: { candles: 40 },
	},
	{
		cosmetic: Cosmetic.MediumDiamondsRug,
		cost: { hearts: 18 },
	},
	{
		cosmetic: Cosmetic.MusicPlayer,
		cost: { ascendedCandles: 66 },
	},
	{
		cosmetic: Cosmetic.StoneEmptyBox,
		cost: { candles: 30 },
	},
	{
		cosmetic: Cosmetic.StoneWallMirror,
		cost: { candles: 60 },
	},
	{
		cosmetic: Cosmetic.MediumArgyleRug,
		cost: { hearts: 20 },
	},
	{
		cosmetic: Cosmetic.StoneWallMugRack,
		cost: { candles: 40 },
	},
	{
		cosmetic: Cosmetic.StoneWallTowelRack,
		cost: { candles: 30 },
	},
	{
		cosmetic: Cosmetic.MediumCircleRug,
		cost: { candles: 70 },
	},
	{
		cosmetic: Cosmetic.StoneKitchenCabinet,
		cost: { candles: 40 },
	},
	{
		cosmetic: Cosmetic.StoneWallShelf,
		cost: { candles: 30 },
	},
	{
		cosmetic: Cosmetic.LargeSolidRug,
		cost: { candles: 80 },
	},
	{
		cosmetic: Cosmetic.StoneKitchenStove,
		cost: { ascendedCandles: 25 },
	},
	{
		cosmetic: Cosmetic.StoneWideCube,
		cost: { candles: 80 },
	},
	{
		cosmetic: Cosmetic.LargeBathtub,
		cost: { hearts: 45 },
	},
	{
		cosmetic: Cosmetic.LargeCircleRug,
		cost: { candles: 90 },
	},
	{
		cosmetic: Cosmetic.HangingMask,
		cost: { ascendedCandles: 33 },
	},
]);

export const NESTING_WORKSHOP = {
	items,
	allCosmetics: resolveAllCosmeticsFromItems(items),
} as const;
