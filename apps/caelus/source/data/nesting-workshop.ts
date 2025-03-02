import { Cosmetic, resolveAllCosmetics, resolveOffer } from "@thatskyapplication/utility";

const items = resolveOffer([
	{
		name: "Stone single bench",
		cosmetic: Cosmetic.StoneSingleBench,
		cost: { candles: 32 },
	},
	{
		name: "Stone wood-fired oven",
		cosmetic: Cosmetic.StoneWoodFiredOven,
		cost: { ascendedCandles: 35 },
	},
	{
		name: "Stone tall cube",
		cosmetic: Cosmetic.StoneTallCube,
		cost: { candles: 88 },
	},
	{
		name: "Stone single bed",
		cosmetic: Cosmetic.StoneSingleBed,
		cost: { hearts: 24 },
	},
	{
		name: "Stone chair",
		cosmetic: Cosmetic.StoneChair,
		cost: { candles: 64 },
	},
	{
		name: "Stone small table",
		cosmetic: Cosmetic.StoneSmallTable,
		cost: { candles: 20 },
	},
	{
		name: "Decor pillow one colour",
		cosmetic: Cosmetic.DecorPillowOneColour,
		cost: { candles: 32 },
	},
	{
		name: "Stone tall shelf",
		cosmetic: Cosmetic.StoneTallShelf,
		cost: { ascendedCandles: 30 },
	},
	{
		name: "Stone bench",
		cosmetic: Cosmetic.StoneBench,
		cost: { candles: 60 },
	},
	{
		name: "Stone desk",
		cosmetic: Cosmetic.StoneDesk,
		cost: { candles: 50 },
	},
	{
		name: "Decor pillow two colour",
		cosmetic: Cosmetic.DecorPillowTwoColour,
		cost: { candles: 48 },
	},
	{
		name: "Small solid rug",
		cosmetic: Cosmetic.SmallSolidRug,
		cost: { candles: 25 },
	},
	{
		name: "Stone armchair",
		cosmetic: Cosmetic.StoneArmchair,
		cost: { hearts: 20 },
	},
	{
		name: "Stone console table",
		cosmetic: Cosmetic.StoneConsoleTable,
		cost: { candles: 45 },
	},
	{
		name: "Decor folded cloth",
		cosmetic: Cosmetic.DecorFoldedCloth,
		cost: { candles: 40 },
	},
	{
		name: "Small stripes rug",
		cosmetic: Cosmetic.SmallStripesRug,
		cost: { candles: 35 },
	},
	{
		name: "Stone loveseat",
		cosmetic: Cosmetic.StoneLoveseat,
		cost: { hearts: 33 },
	},
	{
		name: "Stone round dining table",
		cosmetic: Cosmetic.StoneRoundDiningTable,
		cost: { hearts: 18 },
	},
	{
		name: "Stone plant stand",
		cosmetic: Cosmetic.StonePlantStand,
		cost: { hearts: 24 },
	},
	{
		name: "Small classic rug",
		cosmetic: Cosmetic.SmallClassicRug,
		cost: { hearts: 15 },
	},
	{
		name: "Stone sofa corner",
		cosmetic: Cosmetic.StoneSofaCorner,
		cost: { candles: 25 },
	},
	{
		name: "Stone square dining table",
		cosmetic: Cosmetic.StoneSquareDiningTable,
		cost: { hearts: 23 },
	},
	{
		name: "Stone wall sconce",
		cosmetic: Cosmetic.StoneWallSconce,
		cost: { ascendedCandles: 32 },
	},
	{
		name: "Small half-circle rug",
		cosmetic: Cosmetic.SmallHalfCircleRug,
		cost: { candles: 45 },
	},
	{
		name: "Stone sofa side",
		cosmetic: Cosmetic.StoneSofaSide,
		cost: { candles: 80 },
	},
	{
		name: "Stone long dining table",
		cosmetic: Cosmetic.StoneLongDiningTable,
		cost: { hearts: 33 },
	},
	{
		name: "Stone small bathtub",
		cosmetic: Cosmetic.StoneSmallBathtub,
		cost: { hearts: 25 },
	},
	{
		name: "Medium solid rug",
		cosmetic: Cosmetic.MediumSolidRug,
		cost: { candles: 40 },
	},
	{
		name: "Stone figurine",
		cosmetic: Cosmetic.StoneFigurine,
		cost: { ascendedCandles: 99 },
	},
	{
		name: "Stone kichen drawers",
		cosmetic: Cosmetic.StoneKichenDrawers,
		cost: { candles: 50 },
	},
	{
		name: "Stone coffee table",
		cosmetic: Cosmetic.StoneCoffeeTable,
		cost: { ascendedCandles: 28 },
	},
	{
		name: "Stone candle light",
		cosmetic: Cosmetic.StoneCandleLight,
		cost: { ascendedCandles: 32 },
	},
	{
		name: "Medium stripes rug",
		cosmetic: Cosmetic.MediumStripesRug,
		cost: { candles: 50 },
	},
	{
		name: "Instrument stand",
		cosmetic: Cosmetic.InstrumentStand,
		cost: { ascendedCandles: 33 },
	},
	{
		name: "Stone wall pot rack",
		cosmetic: Cosmetic.StoneWallPotRack,
		cost: { candles: 50 },
	},
	{
		name: "Stone closed box",
		cosmetic: Cosmetic.StoneClosedBox,
		cost: { candles: 30 },
	},
	{
		name: "Stone washstand",
		cosmetic: Cosmetic.StoneWashstand,
		cost: { candles: 40 },
	},
	{
		name: "Medium diamonds rug",
		cosmetic: Cosmetic.MediumDiamondsRug,
		cost: { hearts: 18 },
	},
	{
		name: "Music player",
		cosmetic: Cosmetic.MusicPlayer,
		cost: { ascendedCandles: 66 },
	},
	{
		name: "Stone empty box",
		cosmetic: Cosmetic.StoneEmptyBox,
		cost: { candles: 30 },
	},
	{
		name: "Stone wall mirror",
		cosmetic: Cosmetic.StoneWallMirror,
		cost: { candles: 60 },
	},
	{
		name: "Medium argyle rug",
		cosmetic: Cosmetic.MediumArgyleRug,
		cost: { hearts: 20 },
	},
	{
		name: "Stone wall mug rack",
		cosmetic: Cosmetic.StoneWallMugRack,
		cost: { candles: 40 },
	},
	{
		name: "Stone wall towel rack",
		cosmetic: Cosmetic.StoneWallTowelRack,
		cost: { candles: 30 },
	},
	{
		name: "Medium circle rug",
		cosmetic: Cosmetic.MediumCircleRug,
		cost: { candles: 70 },
	},
	{
		name: "Stone kitchen cabinet",
		cosmetic: Cosmetic.StoneKitchenCabinet,
		cost: { candles: 40 },
	},
	{
		name: "Stone wall shelf",
		cosmetic: Cosmetic.StoneWallShelf,
		cost: { candles: 30 },
	},
	{
		name: "Large solid rug",
		cosmetic: Cosmetic.LargeSolidRug,
		cost: { candles: 80 },
	},
	{
		name: "Stone kitchen stove",
		cosmetic: Cosmetic.StoneKitchenStove,
		cost: { ascendedCandles: 25 },
	},
	{
		name: "Stone wide cube",
		cosmetic: Cosmetic.StoneWideCube,
		cost: { candles: 80 },
	},
	{
		name: "Large bathtub",
		cosmetic: Cosmetic.LargeBathtub,
		cost: { hearts: 45 },
	},
	{
		name: "Large circle rug",
		cosmetic: Cosmetic.LargeCircleRug,
		cost: { candles: 90 },
	},
	{
		name: "Hanging mask",
		cosmetic: Cosmetic.HangingMask,
		cost: { ascendedCandles: 33 },
	},
]);

export const NESTING_WORKSHOP = { items, allCosmetics: resolveAllCosmetics(items) } as const;
