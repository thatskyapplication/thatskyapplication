import { Cosmetic, resolveAllCosmetics, resolveOffer } from "@thatskyapplication/utility";

const items = resolveOffer([
	{
		name: "Journey Pack",
		cosmetic: [Cosmetic.JourneyCape, Cosmetic.JourneyHood, Cosmetic.JourneyMask],
		cost: { money: 24.99 },
	},
	{
		name: "Companion Cube",
		cosmetic: Cosmetic.CompanionCube,
		cost: { candles: 50 },
	},
	{
		name: "Tracendent Journey Pack",
		cosmetic: [
			Cosmetic.TranscendentJourneyCape,
			Cosmetic.TranscendentJourneyHood,
			Cosmetic.TranscendentJourneyMask,
		],
		cost: { money: 24.99 },
	},
]);

export const PERMANENT_EVENT_STORE = { items, allCosmetics: resolveAllCosmetics(items) } as const;
