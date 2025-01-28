import { Cosmetic } from "@thatskyapplication/utility";
import { resolveAllCosmetics, resolveOffer } from "../utility/catalogue.js";
import { CAPE_EMOJIS, HELD_PROPS_EMOJIS } from "../utility/emojis.js";

const items = resolveOffer([
	{
		name: "Founder's Pack",
		cosmetic: Cosmetic.FoundersCape,
		cost: { money: 29.99 },
		emoji: CAPE_EMOJIS.Cape15,
	},
	{
		name: "TGC Guitar Pack",
		cosmetic: Cosmetic.TGCGuitar,
		cost: { money: 29.99 },
		emoji: HELD_PROPS_EMOJIS.HeldProp30,
	},
]);

export const SECRET_AREA = { items, allCosmetics: resolveAllCosmetics(items) } as const;
