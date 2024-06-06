import { resolveAllCosmetics, resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS, HELD_PROPS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer([
	{ name: "Founder's Pack", bit: 1 << 0, cost: { money: 29.99 }, emoji: CAPE_EMOJIS.Cape15 },
	{
		name: "TGC Guitar Pack",
		bit: 1 << 1,
		cost: { money: 29.99 },
		emoji: HELD_PROPS_EMOJIS.HeldProp30,
	},
]);

export const SECRET_AREA = { items, allCosmetics: resolveAllCosmetics(items) } as const;
