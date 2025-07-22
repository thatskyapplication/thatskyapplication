import type { FriendshipTreeRaw } from "../models/spirits.js";
import type { SeasonIds } from "../season.js";
import type { EventIds } from "./event.js";
import type { FriendshipTree, Item, ItemCost, ItemRaw } from "./spirits.js";

export function getRandomElement<const T>(array: readonly T[]) {
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

export function resolveAllCosmetics(friendshipTree: FriendshipTree) {
	const total = [];

	for (const items of friendshipTree) {
		total.push(...resolveAllCosmeticsFromItems(items));
	}

	return total;
}

export function resolveAllCosmeticsFromItems(items: readonly Item[]) {
	const total = [];

	for (const { cosmetics } of items) {
		total.push(...cosmetics);
	}

	return total;
}

interface ResolveOfferOptions {
	seasonId?: SeasonIds;
	eventId?: EventIds;
}

export function resolveOffer(
	friendshipTree: FriendshipTreeRaw,
	options?: ResolveOfferOptions,
): FriendshipTree {
	return friendshipTree.map(
		(items) =>
			resolveOfferFromItems(items, options) as
				| [Item]
				| [Item, Item]
				| [Item, Item, Item]
				| [Item, Item, Item, Item],
	);
}

export function resolveOfferFromItems(
	items: readonly ItemRaw[],
	{ seasonId, eventId }: ResolveOfferOptions = {},
): Item[] {
	return items.map((item) => ({
		translation:
			item.translation === undefined
				? null
				: typeof item.translation === "number"
					? { key: `cosmetic-common-names.${item.translation}` }
					: { ...item.translation, key: `cosmetic-common-names.${item.translation.key}` },
		cosmetics: Array.isArray(item.cosmetic) ? item.cosmetic : [item.cosmetic],
		cosmeticDisplay: "cosmeticDisplay" in item ? item.cosmeticDisplay : item.cosmetic,
		level: item.level ?? null,
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
	}));
}

export function addCosts(items: ItemCost[]) {
	const result = items.reduce<Required<ItemCost>>(
		(
			total,
			{
				money = 0,
				candles = 0,
				hearts = 0,
				ascendedCandles = 0,
				seasonalCandles = [],
				seasonalHearts = [],
				eventTickets = [],
			},
		) => {
			total.money += Math.round(money * 100);
			total.candles += candles;
			total.hearts += hearts;
			total.ascendedCandles += ascendedCandles;

			for (const seasonalCandle of seasonalCandles) {
				const sameSeason = total.seasonalCandles.findIndex(
					({ seasonId }) => seasonId === seasonalCandle.seasonId,
				);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalCandles.push({ ...seasonalCandle });
				} else {
					total.seasonalCandles.at(sameSeason)!.cost += seasonalCandle.cost;
				}
			}

			for (const seasonalHeart of seasonalHearts) {
				const sameSeason = total.seasonalHearts.findIndex(
					({ seasonId }) => seasonId === seasonalHeart.seasonId,
				);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalHearts.push({ ...seasonalHeart });
				} else {
					total.seasonalHearts.at(sameSeason)!.cost += seasonalHeart.cost;
				}
			}

			for (const event of eventTickets) {
				const sameEvent = total.eventTickets.findIndex(({ eventId }) => eventId === event.eventId);

				if (sameEvent === -1) {
					// Prevents mutation.
					total.eventTickets.push({ ...event });
				} else {
					total.eventTickets.at(sameEvent)!.cost += event.cost;
				}
			}

			return total;
		},
		{
			money: 0,
			candles: 0,
			hearts: 0,
			ascendedCandles: 0,
			seasonalCandles: [],
			seasonalHearts: [],
			eventTickets: [],
		},
	);

	result.money /= 100;
	return result;
}
