import { Cosmetic, resolveAllCosmetics, resolveOffer } from "@thatskyapplication/utility";

const items = resolveOffer([
	{
		cosmetic: Cosmetic.FoundersCape,
		cost: { money: 29.99 },
	},
	{
		cosmetic: Cosmetic.TGCGuitar,
		cost: { money: 29.99 },
	},
	{
		cosmetic: Cosmetic.TGCWireframeCape,
		cost: { money: 19.99 },
	},
]);

export const SECRET_AREA = { items, allCosmetics: resolveAllCosmetics(items) } as const;
