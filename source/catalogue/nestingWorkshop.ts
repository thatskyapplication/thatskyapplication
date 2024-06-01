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
		}),
);

export const NESTING_WORKSHOP = { items, maximumItemsBit: items.reduce((bits, _, bit) => bit | bits, 0) } as const;
