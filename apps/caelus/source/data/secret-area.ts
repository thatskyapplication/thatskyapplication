import { Cosmetic, resolveAllCosmetics, resolveOffer } from "@thatskyapplication/utility";

const items = resolveOffer([
	{
		name: "Founder's Pack",
		cosmetic: Cosmetic.FoundersCape,
		cost: { money: 29.99 },
	},
	{
		name: "TGC Guitar Pack",
		cosmetic: Cosmetic.TGCGuitar,
		cost: { money: 29.99 },
	},
	{
		name: "TGC Wireframe Cape",
		cosmetic: Cosmetic.TGCWireframeCape,
		cost: { money: 19.99 },
	},
]);

export const SECRET_AREA = { items, allCosmetics: resolveAllCosmetics(items) } as const;
