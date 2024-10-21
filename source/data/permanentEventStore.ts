import { Cosmetic, resolveAllCosmetics, resolveOffer } from "../Utility/catalogue.js";
import { CAPE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../Utility/emojis.js";

const items = resolveOffer([
	{
		name: "Journey Pack",
		cosmetic: [Cosmetic.JourneyCape, Cosmetic.JourneyHood, Cosmetic.JourneyMask],
		cost: { money: 24.99 },
		emoji: CAPE_EMOJIS.Cape94,
	},
	{
		name: "Companion Cube",
		cosmetic: Cosmetic.CompanionCube,
		cost: { candles: 50 },
		emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp36,
	},
]);

export const PERMANENT_EVENT_STORE = { items, allCosmetics: resolveAllCosmetics(items) } as const;
