import { resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer([
	{ name: "Journey Pack", bit: 1 << 0, cost: { money: 24.99 }, emoji: CAPE_EMOJIS.Cape94 },
	{
		name: "Moth Appreciation Pack",
		bit: 1 << 1,
		cost: { money: 9.99 },
		emoji: CAPE_EMOJIS.Cape119,
	},
	{
		name: "Sparrow Appreciation Pack",
		bit: 1 << 2,
		cost: { money: 9.99 },
		emoji: CAPE_EMOJIS.Cape118,
	},
	{
		name: "Course Creation Prop",
		bit: 1 << 3,
		cost: { candles: 150 },
		emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp33,
	},
	{
		name: "Companion Cube",
		bit: 1 << 4,
		cost: { candles: 50 },
		emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp36,
	},
]);

export const PERMANENT_EVENT_STORE = {
	items,
	maximumItemsBit: items.reduce((bits, { bit }) => bit | bits, 0),
} as const;
