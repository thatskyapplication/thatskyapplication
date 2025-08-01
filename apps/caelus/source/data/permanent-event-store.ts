import {
	Cosmetic,
	resolveAllCosmeticsFromItems,
	resolveOfferFromItems,
} from "@thatskyapplication/utility";

const items = resolveOfferFromItems([
	{
		cosmetic: [Cosmetic.JourneyCape, Cosmetic.JourneyHood, Cosmetic.JourneyMask],
		cosmeticDisplay: Cosmetic.JourneyCape,
		cost: { money: 24.99 },
	},
	{
		cosmetic: Cosmetic.CompanionCube,
		cost: { candles: 50 },
	},
	{
		cosmetic: [
			Cosmetic.TranscendentJourneyCape,
			Cosmetic.TranscendentJourneyHood,
			Cosmetic.TranscendentJourneyMask,
		],
		cosmeticDisplay: Cosmetic.TranscendentJourneyCape,
		cost: { money: 24.99 },
	},
]);

export const PERMANENT_EVENT_STORE = {
	items,
	allCosmetics: resolveAllCosmeticsFromItems(items),
} as const;
