import type { Cosmetic } from "../cosmetics.js";
import type { FriendshipTreeRaw, LegacyFriendshipTreeRaw } from "../models/spirits.js";
import type { SeasonIds } from "../season.js";
import type { EventIds } from "./event.js";
import type {
	FriendshipTree,
	Item,
	ItemCost,
	ItemRaw,
	ItemWithoutChildren,
	ItemWithPossibleChildren,
	LegacyFriendshipTree,
} from "./spirits.js";

export function getRandomElement<const T extends readonly unknown[]>(
	array: T,
): T[number] | undefined {
	return array[Math.floor(Math.random() * array.length)];
}

export function snakeCaseName(name: string) {
	return name
		.replaceAll("'s", "s")
		.replace("' ", "'")
		.replaceAll(/[ '-]/g, "_")
		.replaceAll(/[()]/g, "")
		.replaceAll("×", "x")
		.toLowerCase();
}

export function resolveAllCosmetics(
	friendshipTree: FriendshipTree | LegacyFriendshipTree,
): readonly Cosmetic[] {
	const result: Cosmetic[] = [];

	for (const items of friendshipTree) {
		result.push(...resolveAllCosmeticsFromItems(items));

		for (const item of items) {
			if (!item) {
				continue;
			}

			if ("children" in item) {
				result.push(...resolveAllCosmeticsFromItems(item.children));
			}
		}
	}

	return result;
}

export function resolveAllCosmeticsFromItems(
	items: readonly (ItemWithoutChildren | null | undefined)[],
) {
	const total = [];

	for (const item of items) {
		if (!item) {
			continue;
		}

		total.push(...item.cosmetics);
	}

	return total;
}

interface ResolveOfferOptions {
	seasonId?: SeasonIds;
	eventId?: EventIds;
}

export function resolveOffer(
	friendshipTree: FriendshipTreeRaw | LegacyFriendshipTreeRaw,
	options?: ResolveOfferOptions,
): FriendshipTree | LegacyFriendshipTree {
	return friendshipTree.map(
		(items) =>
			resolveOfferFromItems(items, options) as
				| [ItemWithoutChildren]
				| [ItemWithoutChildren, ItemWithPossibleChildren]
				| [ItemWithoutChildren, ItemWithPossibleChildren | null, ItemWithPossibleChildren],
	);
}

export function resolveOfferFromItems(
	items: readonly ItemRaw[],
	options?: ResolveOfferOptions,
): readonly Item[];

export function resolveOfferFromItems(
	items: readonly (null | undefined)[],
	options?: ResolveOfferOptions,
): readonly null[];

export function resolveOfferFromItems(
	items: readonly (ItemRaw | null | undefined)[],
	options?: ResolveOfferOptions,
): readonly (Item | null | undefined)[];

export function resolveOfferFromItems(
	items: readonly (ItemRaw | null | undefined)[],
	options: ResolveOfferOptions = {},
): readonly (Item | null | undefined)[] {
	const { seasonId, eventId } = options;

	return items.map((item) =>
		item
			? {
					translation:
						"packName" in item
							? { key: `cosmetic-pack-names.${item.packName}` }
							: !("translation" in item) || item.translation === undefined
								? { key: `cosmetic-names.${item.cosmetic}` }
								: typeof item.translation === "number"
									? { key: `cosmetic-common-names.${item.translation}` }
									: { ...item.translation, key: `cosmetic-common-names.${item.translation.key}` },
					cosmetics: Array.isArray(item.cosmetic)
						? // These assertions are necessary because the type is too complex to represent.
							(item.cosmetic as readonly [Cosmetic, ...Cosmetic[]])
						: ([item.cosmetic] as readonly [Cosmetic]),
					cosmeticDisplay: "cosmeticDisplay" in item ? item.cosmeticDisplay : item.cosmetic,
					level: item.level ?? null,
					seasonPass: item.seasonPass ?? false,
					cost: item.cost
						? {
								...item.cost,
								seasonalCandles:
									typeof seasonId === "number" && item.cost.seasonalCandles
										? [{ cost: item.cost.seasonalCandles, seasonId }]
										: [],
								seasonalHearts:
									typeof seasonId === "number" && item.cost.seasonalHearts
										? [{ cost: item.cost.seasonalHearts, seasonId }]
										: [],
								eventTickets:
									typeof eventId === "number" && item.cost.eventTickets
										? [{ cost: item.cost.eventTickets, eventId }]
										: [],
							}
						: null,
					regularHeart: "regularHeart" in item ? item.regularHeart : false,
					thirdHeight: "thirdHeight" in item ? item.thirdHeight : false,
					children: "children" in item ? resolveOfferFromItems(item.children, options) : [],
				}
			: null,
	);
}

export type CostEntry =
	| { readonly type: "money" | "candles" | "hearts" | "ascendedCandles"; readonly amount: number }
	| {
			readonly type: "seasonalCandles" | "seasonalHearts";
			readonly seasonId: SeasonIds;
			readonly amount: number;
	  }
	| { readonly type: "eventTickets"; readonly eventId: EventIds; readonly amount: number };

interface CostTally {
	money: number;
	candles: number;
	hearts: number;
	ascendedCandles: number;
	seasonalCandles: Map<SeasonIds, number>;
	seasonalHearts: Map<SeasonIds, number>;
	eventTickets: Map<EventIds, number>;
}

function createCostTally(): CostTally {
	return {
		money: 0,
		candles: 0,
		hearts: 0,
		ascendedCandles: 0,
		seasonalCandles: new Map(),
		seasonalHearts: new Map(),
		eventTickets: new Map(),
	};
}

function tallyById<Id>(tally: Map<Id, number>, id: Id, amount: number) {
	if (amount > 0) {
		tally.set(id, (tally.get(id) ?? 0) + amount);
	}
}

interface SumCostsOptions {
	includeSeasonalCurrency?: boolean;
}

export function sumCosts(
	costs: Iterable<ItemCost>,
	{ includeSeasonalCurrency = true }: SumCostsOptions = {},
): readonly CostEntry[] {
	const tally = createCostTally();

	for (const cost of costs) {
		tally.money += Math.round((cost.money ?? 0) * 100);
		tally.candles += cost.candles ?? 0;
		tally.hearts += cost.hearts ?? 0;
		tally.ascendedCandles += cost.ascendedCandles ?? 0;

		if (includeSeasonalCurrency) {
			for (const seasonalCandles of cost.seasonalCandles) {
				tallyById(tally.seasonalCandles, seasonalCandles.seasonId, seasonalCandles.cost);
			}

			for (const seasonalHearts of cost.seasonalHearts) {
				tallyById(tally.seasonalHearts, seasonalHearts.seasonId, seasonalHearts.cost);
			}
		}

		for (const eventTickets of cost.eventTickets) {
			tallyById(tally.eventTickets, eventTickets.eventId, eventTickets.cost);
		}
	}

	return tallyToEntries(tally);
}

function tallyToEntries(tally: CostTally): readonly CostEntry[] {
	const entries: CostEntry[] = [];

	if (tally.money > 0) {
		entries.push({ type: "money", amount: tally.money / 100 });
	}

	if (tally.candles > 0) {
		entries.push({ type: "candles", amount: tally.candles });
	}

	if (tally.hearts > 0) {
		entries.push({ type: "hearts", amount: tally.hearts });
	}

	if (tally.ascendedCandles > 0) {
		entries.push({ type: "ascendedCandles", amount: tally.ascendedCandles });
	}

	for (const [seasonId, amount] of [...tally.seasonalCandles].sort(([a], [b]) => a - b)) {
		entries.push({ type: "seasonalCandles", seasonId, amount });
	}

	for (const [seasonId, amount] of [...tally.seasonalHearts].sort(([a], [b]) => a - b)) {
		entries.push({ type: "seasonalHearts", seasonId, amount });
	}

	for (const [eventId, amount] of [...tally.eventTickets].sort(([a], [b]) => a - b)) {
		entries.push({ type: "eventTickets", eventId, amount });
	}

	return entries;
}
