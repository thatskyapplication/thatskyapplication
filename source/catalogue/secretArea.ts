import { Collection } from "discord.js";
import { type ItemRaw, resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS, HELD_PROPS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer(
	new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Founder's Pack", cost: { money: 29.99 }, emoji: CAPE_EMOJIS.Cape15 })
		.set(1 << 1, { name: "TGC Guitar Pack", cost: { money: 29.99 }, emoji: HELD_PROPS_EMOJIS.HeldProp30 }),
);

export const SECRET_AREA = { items, maximumItemsBit: items.reduce((bits, { bit }) => bit | bits, 0) } as const;
