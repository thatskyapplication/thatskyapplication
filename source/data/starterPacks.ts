import { Cosmetic, resolveAllCosmetics, resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer([
	{
		name: "Starter Pack",
		cosmetic: Cosmetic.MobileCape,
		cost: { money: 4.99 },
		emoji: CAPE_EMOJIS.Cape03,
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
		emoji: CAPE_EMOJIS.Cape57,
	},
]);

export const STARTER_PACKS = { items, allCosmetics: resolveAllCosmetics(items) } as const;
