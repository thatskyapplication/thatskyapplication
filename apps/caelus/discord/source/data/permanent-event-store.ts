import {
	Cosmetic,
	CosmeticCommon,
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
	{
		cosmetic: Cosmetic.SpringCloverSprout,
		cost: { money: 0.99 },
	},
	{
		cosmetic: [Cosmetic.FlOwCape, Cosmetic.FlOwFlower],
		cosmeticDisplay: Cosmetic.FlOwCape,
		cost: { money: 14.99 },
	},
	{
		translation: { key: CosmeticCommon.BouncePadMultiple, number: 2 },
		cosmetic: Cosmetic.BouncePad2,
		cost: { candles: 6 },
	},
	{
		translation: { key: CosmeticCommon.BouncePadMultiple, number: 3 },
		cosmetic: Cosmetic.BouncePad3,
		cost: { candles: 8 },
	},
]);

export const PERMANENT_EVENT_STORE = {
	items,
	allCosmetics: resolveAllCosmeticsFromItems(items),
} as const;
