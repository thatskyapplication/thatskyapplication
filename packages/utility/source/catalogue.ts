import { Cosmetic, CosmeticPackName } from "./cosmetics.js";
import { skyEventFamilies, skyEvents } from "./events/index.js";
import { REALM_SPIRITS } from "./kingdom/realms/index.js";
import { skySeasons } from "./kingdom/seasons/index.js";
import { spirits } from "./kingdom/spirits.js";
import type { EventFamily, EventFamilyOccurrences } from "./models/event-family.js";
import type { Event } from "./models/event.js";
import type { Season } from "./models/season.js";
import type { Spirit } from "./models/spirits.js";
import { SeasonId } from "./season.js";
import { resolveAllCosmeticsFromItems, resolveOfferFromItems } from "./utility/functions.js";
import { friendshipTreeToItems, type Item, type ItemCost } from "./utility/spirits.js";

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

export function catalogueComplete({ owned, total }: CatalogueProgress) {
	return total > 0 && owned >= total;
}

export function partitionItemCosts(items: Iterable<Item>, data: ReadonlySet<number> = new Set()) {
	const obtained: ItemCost[] = [];
	const remaining: ItemCost[] = [];
	const seen = new Set<string>();

	for (const { cosmetics, cost } of items) {
		if (!cost) {
			continue;
		}

		const key = cosmetics.toSorted((a, b) => a - b).join(",");

		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		(cosmetics.every((cosmetic) => data.has(cosmetic)) ? obtained : remaining).push(cost);
	}

	return { obtained, remaining };
}

export function catalogueSpiritItems(spirits: Iterable<Spirit>): readonly Item[] {
	const items: Item[] = [];

	for (const spirit of spirits) {
		items.push(...friendshipTreeToItems(spirit.displayFriendshipTree));
	}

	return items;
}

export function collectSpiritCosmetics(spirits: Iterable<Spirit>): Set<number> {
	const cosmetics = new Set<number>();

	for (const spirit of spirits) {
		for (const cosmetic of spirit.allCosmetics) {
			cosmetics.add(cosmetic);
		}
	}

	return cosmetics;
}

export function catalogueSeasonItems(seasons: Iterable<Season>): readonly Item[] {
	const items: Item[] = [];

	for (const season of seasons) {
		items.push(...catalogueSpiritItems(season.spiritsWithGuide.values()), ...season.items);
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

export enum CatalogueSearchType {
	Season = 0,
	Event = 1,
	Spirit = 2,
	Collection = 3,
	EventFamily = 4,
}

export enum CatalogueCollection {
	StarterPacks = 0,
	SecretArea = 1,
	ClothingShop = 2,
	NestingWorkshop = 3,
}

export type CatalogueSearchTarget =
	| { readonly type: CatalogueSearchType.Season; readonly season: Season }
	| { readonly type: CatalogueSearchType.Event; readonly event: Event }
	| {
			readonly type: CatalogueSearchType.EventFamily;
			readonly family: EventFamily;
			readonly occurrences: EventFamilyOccurrences;
	  }
	| { readonly type: CatalogueSearchType.Spirit; readonly spirit: Spirit }
	| { readonly type: CatalogueSearchType.Collection; readonly collection: CatalogueCollection };

export function spiritOriginTranslationKey(spirit: Spirit) {
	return spirit.isSeasonalSpirit() || spirit.isGuideSpirit()
		? (`seasons.${spirit.seasonId}` as const)
		: (`realms.${spirit.realm}` as const);
}

export function spiritNotReturnedTranslationKey(spirit: Spirit, date: Temporal.ZonedDateTime) {
	if (!spirit.isSeasonalSpirit() || spirit.visit(date).visited) {
		return null;
	}

	return spirit.seasonId === SeasonId.Shattering || spirit.seasonId === SeasonId.Nesting
		? ("spirits.not-yet-returned-entity" as const)
		: spirit.seasonId === SeasonId.Revival
			? ("spirits.not-yet-returned-shop" as const)
			: ("spirits.not-yet-returned-spirit" as const);
}

export type CatalogueSearchTargetWithoutEventFamily = Exclude<
	CatalogueSearchTarget,
	{ readonly type: CatalogueSearchType.EventFamily }
>;

export interface CatalogueSearchEntry<
	Target extends CatalogueSearchTarget = CatalogueSearchTarget,
> {
	readonly name: string;
	readonly keywords: readonly string[];
	readonly cosmeticDisplay: Cosmetic | null;
	readonly target: Target;
}

export type CatalogueSpiritSearchTarget = Extract<
	CatalogueSearchTarget,
	{ readonly type: CatalogueSearchType.Spirit }
>;

export type CatalogueSpiritSearchEntry = CatalogueSearchEntry<CatalogueSpiritSearchTarget>;

export function catalogueSpiritSearchEntries(
	resolveName: (key: string) => string,
): readonly CatalogueSpiritSearchEntry[] {
	return spirits().map((spirit) => {
		const keywords = [...spirit.keywords, resolveName(spiritOriginTranslationKey(spirit))];

		if (spirit.isStandardSpirit() || spirit.isSeasonalSpirit()) {
			if (spirit.emote) {
				keywords.push(spirit.emote);
			}

			if (spirit.stance) {
				keywords.push(resolveName(`cosmetic-names.${spirit.stance}`));
			}

			if (spirit.call) {
				keywords.push(resolveName(`cosmetic-names.${spirit.call}`));
			}

			if (spirit.action) {
				keywords.push(spirit.action);
			}
		}

		return {
			name: resolveName(`spirits.${spirit.id}`),
			keywords,
			cosmeticDisplay: null,
			target: { type: CatalogueSearchType.Spirit, spirit },
		};
	});
}

function inAppPurchaseEntries(
	items: Iterable<Item>,
	target: CatalogueSearchTarget,
	resolveName: (key: string) => string,
): CatalogueSearchEntry[] {
	const entries: CatalogueSearchEntry[] = [];

	for (const { cost, cosmeticDisplay, translation } of items) {
		if (cost?.money !== undefined) {
			entries.push({
				name: resolveName(translation.key),
				keywords: [],
				cosmeticDisplay,
				target,
			});
		}
	}

	return entries;
}

interface CatalogueSearchEntriesOptions<GroupEventFamilies extends boolean> {
	readonly groupEventFamilies: GroupEventFamilies;
}

export function catalogueSearchEntries(
	resolveName: (key: string) => string,
	options: CatalogueSearchEntriesOptions<true>,
): readonly CatalogueSearchEntry[];

export function catalogueSearchEntries(
	resolveName: (key: string) => string,
	options: CatalogueSearchEntriesOptions<false>,
): readonly CatalogueSearchEntry<CatalogueSearchTargetWithoutEventFamily>[];

export function catalogueSearchEntries(
	resolveName: (key: string) => string,
	{ groupEventFamilies }: CatalogueSearchEntriesOptions<boolean>,
): readonly CatalogueSearchEntry[] {
	const entries: CatalogueSearchEntry[] = [];

	for (const season of skySeasons().toReversed().values()) {
		const target = { type: CatalogueSearchType.Season, season } as const;
		entries.push({
			name: resolveName(`seasons.${season.id}`),
			keywords: [],
			cosmeticDisplay: null,
			target,
		});
		entries.push(...inAppPurchaseEntries(season.items, target, resolveName));
	}

	if (groupEventFamilies) {
		for (const family of skyEventFamilies().values()) {
			for (const [name, occurrences] of family.names) {
				entries.push({
					name: resolveName(name),
					keywords: [],
					cosmeticDisplay: null,
					target: { type: CatalogueSearchType.EventFamily, family, occurrences },
				});
			}
		}
	}

	for (const event of skyEvents().toReversed().values()) {
		const target = { type: CatalogueSearchType.Event, event } as const;

		if (!groupEventFamilies) {
			entries.push({
				name: resolveName(event.name),
				keywords: [],
				cosmeticDisplay: null,
				target,
			});
		}

		entries.push(...inAppPurchaseEntries(event.offer, target, resolveName));
	}

	entries.push(...catalogueSpiritSearchEntries(resolveName));

	for (const [collection, { items }] of [
		[CatalogueCollection.StarterPacks, STARTER_PACKS],
		[CatalogueCollection.SecretArea, SECRET_AREA],
		[CatalogueCollection.ClothingShop, CLOTHING_SHOP],
		[CatalogueCollection.NestingWorkshop, NESTING_WORKSHOP],
	] as const) {
		entries.push(
			...inAppPurchaseEntries(
				items,
				{ type: CatalogueSearchType.Collection, collection },
				resolveName,
			),
		);
	}

	return entries;
}

export function catalogueSearch<Entry extends CatalogueSearchEntry>(
	entries: readonly Entry[],
	query: string,
	limit?: number,
): readonly Entry[] {
	const normalisedQuery = query.trim().toUpperCase();

	if (normalisedQuery.length === 0) {
		return [];
	}

	const exactMatches: Entry[] = [];
	const prefixMatches: Entry[] = [];
	const nameMatches: Entry[] = [];
	const keywordMatches: Entry[] = [];

	for (const entry of entries) {
		const name = entry.name.toUpperCase();

		if (name === normalisedQuery) {
			exactMatches.push(entry);
		} else if (name.startsWith(normalisedQuery)) {
			prefixMatches.push(entry);
		} else if (name.includes(normalisedQuery)) {
			nameMatches.push(entry);
		} else if (entry.keywords.some((keyword) => keyword.toUpperCase().includes(normalisedQuery))) {
			keywordMatches.push(entry);
		}
	}

	return [...exactMatches, ...prefixMatches, ...nameMatches, ...keywordMatches].slice(0, limit);
}
