import { Collection } from "discord.js";
import { type ItemRaw, resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer(
	new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Starter Pack", cost: { money: 4.99 }, emoji: CAPE_EMOJIS.Cape03 })
		.set(1 << 1, { name: "Nintendo Pack", cost: { money: 29.99 }, emoji: CAPE_EMOJIS.Cape57 }),
);

export const STARTER_PACKS = { items, maximumItemsBit: items.reduce((bits, _, bit) => bit | bits, 0) } as const;
