import { Cosmetic, CosmeticPackName } from "./cosmetics.js";
import { skyEvents } from "./events/index.js";
import { REALM_SPIRITS } from "./kingdom/realms/index.js";
import { skySeasons } from "./kingdom/seasons/index.js";
import type { Event } from "./models/event.js";
import type { Season } from "./models/season.js";
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit } from "./models/spirits.js";
import {
	addCosts,
	resolveAllCosmeticsFromItems,
	resolveOfferFromItems,
} from "./utility/functions.js";
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
		cosmetic: Cosmetic.TGCWireframeCape,
		cost: { money: 19.99 },
	},
]);

export const SECRET_AREA = {
	items: secretAreaItems,
	allCosmetics: resolveAllCosmeticsFromItems(secretAreaItems),
} as const;

const permanentEventStoreItems = resolveOfferFromItems([
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
		packName: CosmeticPackName.TranscendentJourneyPack,
		cost: { money: 24.99 },
	},
	{
		cosmetic: Cosmetic.SpringCloverSprout,
		cost: { money: 0.99 },
	},
	{
		cosmetic: [Cosmetic.FlOwCape, Cosmetic.FlOwFlower],
		cosmeticDisplay: Cosmetic.FlOwCape,
		packName: CosmeticPackName.FlOwPack,
		cost: { money: 14.99 },
	},
]);

export const PERMANENT_EVENT_STORE = {
	items: permanentEventStoreItems,
	allCosmetics: resolveAllCosmeticsFromItems(permanentEventStoreItems),
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

export function catalogueOwnedProgress(items: readonly Item[], data: ReadonlySet<number>) {
	return {
		owned: resolveAllCosmeticsFromItems(items).filter((cosmetic) => data.has(cosmetic)),
		total: items.reduce((total, item) => total + item.cosmetics.length, 0),
	};
}

export function catalogueProgressPercentage(
	owned: readonly number[],
	total: number,
	round?: boolean,
) {
	if (total === 0) {
		return null;
	}

	const percentage = (owned.length / total) * 100;

	if (!round) {
		return percentage;
	}

	const integer = Math.trunc(percentage);

	return integer === 0
		? Math.ceil(percentage)
		: integer === 99
			? Math.floor(percentage)
			: Math.round(percentage);
}

export function catalogueSpiritOwnedProgress(
	spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
	data: ReadonlySet<number>,
) {
	const totalOwned = [];
	let total = 0;

	for (const spirit of spirits) {
		const offer =
			spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
				? spirit.current
				: spirit.items;

		const { owned, total: offerTotal } = catalogueOwnedProgress(friendshipTreeToItems(offer), data);
		totalOwned.push(...owned);
		total += offerTotal;
	}

	return { owned: totalOwned, total };
}

export function catalogueSpiritProgress(
	spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = catalogueSpiritOwnedProgress(spirits, data);
	return catalogueProgressPercentage(owned, total, round);
}

export function catalogueSeasonOwnedProgress(
	seasons: readonly Season[],
	data: ReadonlySet<number>,
) {
	const totalOwned = [];
	let total = 0;

	for (const season of seasons) {
		const friendshipTrees = [season.guide.current, ...season.spirits.map((spirit) => spirit.items)];

		for (const friendshipTree of friendshipTrees) {
			const { owned, total: offerTotal } = catalogueOwnedProgress(
				friendshipTreeToItems(friendshipTree),
				data,
			);
			totalOwned.push(...owned);
			total += offerTotal;
		}

		const { owned, total: offerTotal } = catalogueOwnedProgress(season.items, data);
		totalOwned.push(...owned);
		total += offerTotal;
	}

	return { owned: totalOwned, total };
}

export function catalogueSeasonProgress(
	seasons: readonly Season[],
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = catalogueSeasonOwnedProgress(seasons, data);
	return catalogueProgressPercentage(owned, total, round);
}

export function catalogueEventOwnedProgress(events: readonly Event[], data: ReadonlySet<number>) {
	const totalOwned = [];
	let total = 0;

	for (const event of events) {
		const { owned, total: offerTotal } = catalogueOwnedProgress(event.offer, data);

		totalOwned.push(...owned);
		total += offerTotal;
	}

	return { owned: totalOwned, total };
}

export function catalogueEventProgress(
	events: readonly Event[],
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = catalogueEventOwnedProgress(events, data);
	return catalogueProgressPercentage(owned, total, round);
}

export function catalogueStarterPackOwnedProgress(data: ReadonlySet<number>) {
	return catalogueOwnedProgress(STARTER_PACKS.items, data);
}

export function catalogueStarterPackProgress(
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = catalogueStarterPackOwnedProgress(data);
	return catalogueProgressPercentage(owned, total, round);
}

export function catalogueSecretAreaOwnedProgress(data: ReadonlySet<number>) {
	return catalogueOwnedProgress(SECRET_AREA.items, data);
}

export function catalogueSecretAreaProgress(
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = catalogueSecretAreaOwnedProgress(data);
	return catalogueProgressPercentage(owned, total, round);
}

export function cataloguePermanentEventStoreOwnedProgress(data: ReadonlySet<number>) {
	return catalogueOwnedProgress(PERMANENT_EVENT_STORE.items, data);
}

export function cataloguePermanentEventStoreProgress(
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = cataloguePermanentEventStoreOwnedProgress(data);
	return catalogueProgressPercentage(owned, total, round);
}

export function catalogueNestingWorkshopOwnedProgress(data: ReadonlySet<number>) {
	return catalogueOwnedProgress(NESTING_WORKSHOP.items, data);
}

export function catalogueNestingWorkshopProgress(
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = catalogueNestingWorkshopOwnedProgress(data);
	return catalogueProgressPercentage(owned, total, round);
}

export function catalogueAllProgress(data: ReadonlySet<number> = new Set(), round?: boolean) {
	const progresses = [
		catalogueSpiritOwnedProgress([...REALM_SPIRITS.values()], data),
		catalogueSeasonOwnedProgress([...skySeasons().values()], data),
		catalogueEventOwnedProgress([...skyEvents().values()], data),
		catalogueStarterPackOwnedProgress(data),
		catalogueSecretAreaOwnedProgress(data),
		cataloguePermanentEventStoreOwnedProgress(data),
		catalogueNestingWorkshopOwnedProgress(data),
	];

	return catalogueProgressPercentage(
		progresses.reduce<number[]>((totalOwned, { owned }) => {
			totalOwned.push(...owned);
			return totalOwned;
		}, []),
		progresses.reduce((totalTotal, { total }) => totalTotal + total, 0),
		round,
	);
}

export function catalogueRemainingCurrency(
	items: readonly Item[],
	data: ReadonlySet<number> = new Set(),
	includeSeasonalCurrency?: boolean,
) {
	const itemCosts = [];

	for (const { cosmetics, cost } of items) {
		if (cost && cosmetics.some((cosmetic) => !data.has(cosmetic))) {
			itemCosts.push(cost);
		}
	}

	const result = addCosts(itemCosts);

	if (!includeSeasonalCurrency) {
		for (const seasonalCandle of result.seasonalCandles) {
			seasonalCandle.cost = 0;
		}

		for (const seasonalHeart of result.seasonalHearts) {
			seasonalHeart.cost = 0;
		}
	}

	return result;
}
