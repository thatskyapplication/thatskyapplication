import { resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer([
	{ name: "Starter Pack", bit: 1 << 0, cost: { money: 4.99 }, emoji: CAPE_EMOJIS.Cape03 },
	{ name: "Nintendo Pack", bit: 1 << 1, cost: { money: 29.99 }, emoji: CAPE_EMOJIS.Cape57 },
]);

export const STARTER_PACKS = {
	items,
	maximumItemsBit: items.reduce((bits, { bit }) => bit | bits, 0),
} as const;
