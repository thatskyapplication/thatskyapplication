import {
	Cosmetic,
	resolveAllCosmeticsFromItems,
	resolveOfferFromItems,
} from "@thatskyapplication/utility";

const items = resolveOfferFromItems([
	{
		cosmetic: Cosmetic.MobileCape,
		cost: { money: 4.99 },
	},
	{
		cosmetic: [
			Cosmetic.SwitchBlueCape,
			Cosmetic.SwitchRedCape,
			Cosmetic.VesselFlute,
			Cosmetic.ElvishHairstyle,
		],
		cosmeticDisplay: Cosmetic.SwitchRedCape,
		cost: { money: 29.99 },
	},
]);

export const STARTER_PACKS = { items, allCosmetics: resolveAllCosmeticsFromItems(items) } as const;
