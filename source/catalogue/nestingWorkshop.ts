import { Collection } from "discord.js";
import { type ItemRaw, resolveOffer } from "../Utility/catalogue.js";
import { LARGE_PLACEABLE_PROPS_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer(
	new Collection<number, ItemRaw>()
		.set(1 << 0, {
			name: "Stone single bench",
			cost: { candles: 32 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp43,
		})
		.set(1 << 1, {
			name: "Stone wood-fired oven",
			cost: { ascendedCandles: 35 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp44,
		})
		.set(1 << 2, {
			name: "Stone single bed",
			cost: { hearts: 24 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp45,
		})
		.set(1 << 3, {
			name: "Stone tall cube",
			cost: { candles: 88 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp46,
		})
		.set(1 << 4, {
			name: "Stone chair",
			cost: { candles: 64 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp47,
		})
		.set(1 << 5, {
			name: "Stone small table",
			cost: { candles: 20 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp48,
		})
		.set(1 << 6, {
			name: "Decor pillow one colour",
			cost: { candles: 32 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp43,
		})
		.set(1 << 7, {
			name: "Stone tall shelf",
			cost: { ascendedCandles: 30 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp49,
		})
		.set(1 << 8, {
			name: "Stone bench",
			cost: { candles: 60 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp51,
		})
		.set(1 << 9, {
			name: "Stone desk",
			cost: { candles: 50 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp52,
		})
		.set(1 << 10, {
			name: "Decor pillow two colour",
			cost: { hearts: 48 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp45,
		})
		.set(1 << 11, {
			name: "Small solid rug",
			cost: { candles: 25 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp46,
		})
		.set(1 << 12, {
			name: "Stone armchair",
			cost: { hearts: 20 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp53,
		})
		.set(1 << 13, {
			name: "Stone console table",
			cost: { candles: 45 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp54,
		})
		.set(1 << 14, {
			name: "Decor folded cloth",
			cost: { hearts: 40 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp47,
		})
		.set(1 << 15, {
			name: "Small stripes rug",
			cost: { candles: 35 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp48,
		})
		.set(1 << 16, {
			name: "Stone loveseat",
			cost: { hearts: 33 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp55,
		})
		.set(1 << 17, {
			name: "Stone round dining table",
			cost: { hearts: 18 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp56,
		})
		.set(1 << 18, {
			name: "Stone plant stand",
			cost: { hearts: 24 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp57,
		})
		.set(1 << 19, {
			name: "Small classic rug",
			cost: { hearts: 15 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp49,
		})
		.set(1 << 20, {
			name: "Stone sofa corner",
			cost: { candles: 25 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp58,
		})
		.set(1 << 21, {
			name: "Stone square dining table",
			cost: { hearts: 23 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp59,
		})
		.set(1 << 22, {
			name: "Stone wall sconce",
			cost: { ascendedCandles: 32 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp50,
		})
		.set(1 << 23, {
			name: "Small half-circle rug",
			cost: { candles: 45 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp51,
		})
		.set(1 << 24, {
			name: "Stone sofa side",
			cost: { candles: 80 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp60,
		})
		.set(1 << 25, {
			name: "Stone long dining table",
			cost: { hearts: 33 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp61,
		})
		.set(1 << 26, {
			name: "Stone small bathtub",
			cost: { hearts: 25 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp62,
		})
		.set(1 << 27, {
			name: "Medium solid rug",
			cost: { candles: 40 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp52,
		})
		.set(1 << 28, {
			name: "Stone figurine",
			cost: { ascendedCandles: 99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp53,
		}),
	// From this point onwards, there are too many bits.
	// .set(1 << 29, {
	// 	name: "Stone kichen drawers",
	// 	cost: { candles: 50 },
	// 	emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp63,
	// })
	// .set(1 << 30, {
	// 	name: "Stone coffee table",
	// 	cost: { ascendedCandles: 28 },
	// 	emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp64,
	// })
	// .set(1 << 31, {
	// 	name: "Stone candle light",
	// 	cost: { ascendedCandles: 32 },
	// 	emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp65,
	// })
	// .set(1 << 32, {
	// 	name: "Medium stripes rug",
	// 	cost: { candles: 50 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp54,
	// })
	// .set(1 << 33, {
	// 	name: "Instrument stand",
	// 	cost: { ascendedCandles: 33 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp55,
	// })
	// .set(1 << 34, {
	// 	name: "Stone wall pot rack",
	// 	cost: { candles: 50 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp56,
	// })
	// .set(1 << 35, {
	// 	name: "Stone closed box",
	// 	cost: { candles: 30 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp57,
	// })
	// .set(1 << 36, {
	// 	name: "Stone washstand",
	// 	cost: { candles: 40 },
	// 	emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp66,
	// })
	// .set(1 << 37, {
	// 	name: "Medium diamonds rug",
	// 	cost: { hearts: 18 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp58,
	// })
	// .set(1 << 38, {
	// 	name: "Music player",
	// 	cost: { ascendedCandles: 66 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp59,
	// })
	// .set(1 << 39, {
	// 	name: "Stone empty box",
	// 	cost: { candles: 30 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp60,
	// })
	// .set(1 << 40, {
	// 	name: "Stone wall mirror",
	// 	cost: { candles: 60 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp61,
	// })
	// .set(1 << 41, {
	// 	name: "Medium argyle rug",
	// 	cost: { hearts: 20 },
	// 	emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp62,
	// })
);

export const NESTING_WORKSHOP = { items, maximumItemsBit: items.reduce((bits, { bit }) => bit | bits, 0) } as const;
