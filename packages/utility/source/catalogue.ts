import { Cosmetic, CosmeticPackName } from "./cosmetics.js";
import { skyEvents } from "./events/index.js";
import { REALM_SPIRITS } from "./kingdom/realms/index.js";
import { skySeasons } from "./kingdom/seasons/index.js";
import type { Event } from "./models/event.js";
import type { Season } from "./models/season.js";
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit } from "./models/spirits.js";
import { resolveAllCosmeticsFromItems, resolveOfferFromItems } from "./utility/functions.js";
import { friendshipTreeToItems, type Item } from "./utility/spirits.js";

export interface CataloguePacket {
	user_id: string;
	last_updated_at: Date | null;
	data: number[];
	show_everything_button: boolean;
}

const starterPackItems = resolveOfferFromItems([
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
		packName: CosmeticPackName.NintendoSwitchPack,
		cost: { money: 29.99 },
	},
]);

export const STARTER_PACKS = {
	items: starterPackItems,
	allCosmetics: resolveAllCosmeticsFromItems(starterPackItems),
} as const;

const secretAreaItems = resolveOfferFromItems([
	{
		cosmetic: Cosmetic.FoundersCape,
		cost: { money: 29.99 },
	},
	{
		cosmetic: Cosmetic.TGCGuitar,
		cost: { money: 29.99 },
	},
	{
		cosmetic: [Cosmetic.JourneyCape, Cosmetic.JourneyHood, Cosmetic.JourneyMask],
		cosmeticDisplay: Cosmetic.JourneyCape,
		packName: CosmeticPackName.JourneyPack,
		cost: { money: 24.99 },
	},
	{
		cosmetic: [
			Cosmetic.TranscendentJourneyCape,
			Cosmetic.TranscendentJourneyHood,
			Cosmetic.TranscendentJourneyMask,
		],
		cosmeticDisplay: Cosmetic.TranscendentJourneyCape,
		packName: CosmeticPackName.TranscendentJourneyPack,
		cost: { money: 24.99 },
	},
	{
		cosmetic: Cosmetic.TGCWireframeCape,
		cost: { money: 19.99 },
	},
	{
		cosmetic: [Cosmetic.FlOwCape, Cosmetic.FlOwFlower],
		cosmeticDisplay: Cosmetic.FlOwCape,
		packName: CosmeticPackName.FlOwPack,
		cost: { money: 14.99 },
	},
]);

export const SECRET_AREA = {
	items: secretAreaItems,
	allCosmetics: resolveAllCosmeticsFromItems(secretAreaItems),
} as const;

const clothingShopItems = resolveOfferFromItems([
	{
		cosmetic: Cosmetic.CompanionCube,
		cost: { candles: 50 },
	},
	// {
	// 	cosmetic: Cosmetic.SpringCloverSprout,
	// 	cost: { money: 0.99 },
	// },
]);

export const CLOTHING_SHOP = {
	items: clothingShopItems,
	allCosmetics: resolveAllCosmeticsFromItems(clothingShopItems),
} as const;

const nestingWorkshopItems = resolveOfferFromItems([
	{ cosmetic: Cosmetic.StoneSingleBench, cost: { candles: 32 } },
	{ cosmetic: Cosmetic.StoneWoodFiredOven, cost: { ascendedCandles: 35 } },
	{ cosmetic: Cosmetic.StoneTallCube, cost: { candles: 88 } },
	{ cosmetic: Cosmetic.StoneSingleBed, cost: { hearts: 24 } },
	{ cosmetic: Cosmetic.StoneChair, cost: { candles: 64 } },
	{ cosmetic: Cosmetic.StoneSmallTable, cost: { candles: 20 } },
	{ cosmetic: Cosmetic.DecorPillowOneColour, cost: { candles: 32 } },
	{ cosmetic: Cosmetic.StoneTallShelf, cost: { ascendedCandles: 30 } },
	{ cosmetic: Cosmetic.StoneBench, cost: { candles: 60 } },
	{ cosmetic: Cosmetic.StoneDesk, cost: { candles: 50 } },
	{ cosmetic: Cosmetic.DecorPillowTwoColour, cost: { candles: 48 } },
	{ cosmetic: Cosmetic.SmallSolidRug, cost: { candles: 25 } },
	{ cosmetic: Cosmetic.StoneArmchair, cost: { hearts: 20 } },
	{ cosmetic: Cosmetic.StoneConsoleTable, cost: { candles: 45 } },
	{ cosmetic: Cosmetic.DecorFoldedCloth, cost: { candles: 40 } },
	{ cosmetic: Cosmetic.SmallStripesRug, cost: { candles: 35 } },
	{ cosmetic: Cosmetic.StoneLoveseat, cost: { hearts: 33 } },
	{ cosmetic: Cosmetic.StoneRoundDiningTable, cost: { hearts: 18 } },
	{ cosmetic: Cosmetic.StonePlantStand, cost: { hearts: 24 } },
	{ cosmetic: Cosmetic.SmallClassicRug, cost: { hearts: 15 } },
	{ cosmetic: Cosmetic.StoneSofaCorner, cost: { candles: 25 } },
	{ cosmetic: Cosmetic.StoneSquareDiningTable, cost: { hearts: 23 } },
	{ cosmetic: Cosmetic.StoneWallSconce, cost: { ascendedCandles: 32 } },
	{ cosmetic: Cosmetic.SmallHalfCircleRug, cost: { candles: 45 } },
	{ cosmetic: Cosmetic.StoneSofaSide, cost: { candles: 80 } },
	{ cosmetic: Cosmetic.StoneLongDiningTable, cost: { hearts: 33 } },
	{ cosmetic: Cosmetic.StoneSmallBathtub, cost: { hearts: 25 } },
	{ cosmetic: Cosmetic.MediumSolidRug, cost: { candles: 40 } },
	{ cosmetic: Cosmetic.StoneFigurine, cost: { ascendedCandles: 99 } },
	{ cosmetic: Cosmetic.StoneKichenDrawers, cost: { candles: 50 } },
	{ cosmetic: Cosmetic.StoneCoffeeTable, cost: { ascendedCandles: 28 } },
	{ cosmetic: Cosmetic.StoneCandleLight, cost: { ascendedCandles: 32 } },
	{ cosmetic: Cosmetic.MediumStripesRug, cost: { candles: 50 } },
	{ cosmetic: Cosmetic.InstrumentStand, cost: { ascendedCandles: 33 } },
	{ cosmetic: Cosmetic.StoneWallPotRack, cost: { candles: 50 } },
	{ cosmetic: Cosmetic.StoneClosedBox, cost: { candles: 30 } },
	{ cosmetic: Cosmetic.StoneWashstand, cost: { candles: 40 } },
	{ cosmetic: Cosmetic.MediumDiamondsRug, cost: { hearts: 18 } },
	{ cosmetic: Cosmetic.MusicPlayer, cost: { ascendedCandles: 66 } },
	{ cosmetic: Cosmetic.StoneEmptyBox, cost: { candles: 30 } },
	{ cosmetic: Cosmetic.StoneWallMirror, cost: { candles: 60 } },
	{ cosmetic: Cosmetic.MediumArgyleRug, cost: { hearts: 20 } },
	{ cosmetic: Cosmetic.StoneWallMugRack, cost: { candles: 40 } },
	{ cosmetic: Cosmetic.StoneWallTowelRack, cost: { candles: 30 } },
	{ cosmetic: Cosmetic.MediumCircleRug, cost: { candles: 70 } },
	{ cosmetic: Cosmetic.StoneKitchenCabinet, cost: { candles: 40 } },
	{ cosmetic: Cosmetic.StoneWallShelf, cost: { candles: 30 } },
	{ cosmetic: Cosmetic.LargeSolidRug, cost: { candles: 80 } },
	{ cosmetic: Cosmetic.StoneKitchenStove, cost: { ascendedCandles: 25 } },
	{ cosmetic: Cosmetic.StoneWideCube, cost: { candles: 80 } },
	{ cosmetic: Cosmetic.LargeBathtub, cost: { hearts: 45 } },
	{ cosmetic: Cosmetic.LargeCircleRug, cost: { candles: 90 } },
	{ cosmetic: Cosmetic.HangingMask, cost: { ascendedCandles: 33 } },
	{ cosmetic: Cosmetic.CandleStand, cost: { ascendedCandles: 6 } },
]);

export const NESTING_WORKSHOP = {
	items: nestingWorkshopItems,
	allCosmetics: resolveAllCosmeticsFromItems(nestingWorkshopItems),
} as const;

type CatalogueSpirit = StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit;

export interface CatalogueProgress {
	readonly owned: number;
	readonly total: number;
}

export function catalogueProgress(
	items: Iterable<Item>,
	data: ReadonlySet<number> = new Set(),
): CatalogueProgress {
	const cosmetics = new Set<number>();

	for (const item of items) {
		for (const cosmetic of item.cosmetics) {
			cosmetics.add(cosmetic);
		}
	}

	return { owned: cosmetics.intersection(data).size, total: cosmetics.size };
}

export function cataloguePercentage({ owned, total }: CatalogueProgress) {
	if (total === 0) {
		return null;
	}

	if (owned >= total) {
		return 100;
	}

	if (owned === 0) {
		return 0;
	}

	return Math.min(99, Math.max(1, Math.round((owned / total) * 100)));
}

export function catalogueSpiritItems(spirits: Iterable<CatalogueSpirit>): readonly Item[] {
	const items: Item[] = [];

	for (const spirit of spirits) {
		items.push(...friendshipTreeToItems(spirit.isSeasonalSpirit() ? spirit.items : spirit.current));
	}

	return items;
}

export function catalogueSeasonItems(seasons: Iterable<Season>): readonly Item[] {
	const items: Item[] = [];

	for (const season of seasons) {
		items.push(
			...catalogueSpiritItems([season.guide, ...season.spirits.values()]),
			...season.items,
		);
	}

	return items;
}

export function catalogueEventItems(events: Iterable<Event>): readonly Item[] {
	const items: Item[] = [];

	for (const event of events) {
		items.push(...event.offer);
	}

	return items;
}

export function catalogueItems(): readonly Item[] {
	return [
		...catalogueSpiritItems(REALM_SPIRITS.values()),
		...catalogueSeasonItems(skySeasons().values()),
		...catalogueEventItems(skyEvents().values()),
		...STARTER_PACKS.items,
		...SECRET_AREA.items,
		...CLOTHING_SHOP.items,
		...NESTING_WORKSHOP.items,
	];
}
