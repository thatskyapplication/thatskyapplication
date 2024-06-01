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
		}),
);

export const NESTING_WORKSHOP = { items, maximumItemsBit: items.reduce((bits, _, bit) => bit | bits, 0) } as const;
