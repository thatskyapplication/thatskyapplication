import { Cosmetic, resolveAllCosmetics, resolveOffer } from "@thatskyapplication/utility";

const items = resolveOffer([
	{
		name: "Starter Pack",
		cosmetic: Cosmetic.MobileCape,
		cost: { money: 4.99 },
	},
	{
		name: "Nintendo Pack",
		cosmetic: [
			Cosmetic.SwitchBlueCape,
			Cosmetic.SwitchRedCape,
			Cosmetic.VesselFlute,
			Cosmetic.ElvishHairstyle,
		],
		cost: { money: 29.99 },
	},
]);

export const STARTER_PACKS = { items, allCosmetics: resolveAllCosmetics(items) } as const;
