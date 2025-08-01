import type { Cosmetic } from "../cosmetics.js";
import type { FriendshipTreeRaw } from "../models/spirits.js";
import type { SeasonIds } from "../season.js";
import type { EventIds } from "./event.js";
import type {
	FriendshipTree,
	Item,
	ItemCost,
	ItemRaw,
	ItemWithoutChildren,
	ItemWithPossibleChildren,
} from "./spirits.js";

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

export function resolveAllCosmetics(friendshipTree: FriendshipTree): readonly Cosmetic[] {
	const result: Cosmetic[] = [];

	for (const items of friendshipTree) {
		for (const item of items) {
			if ("children" in item) {
				result.push(...resolveAllCosmeticsFromItems(item.children));
			}
		}

		result.push(...resolveAllCosmeticsFromItems(items));
	}

	return result;
}

export function resolveAllCosmeticsFromItems(items: readonly ItemWithoutChildren[]) {
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
				| [ItemWithoutChildren]
				| [ItemWithoutChildren, ItemWithPossibleChildren]
				| [ItemWithoutChildren, ItemWithPossibleChildren, ItemWithPossibleChildren],
	);
}

export function resolveOfferFromItems(
	items: readonly ItemRaw[],
	options: ResolveOfferOptions = {},
): readonly Item[] {
	const { seasonId, eventId } = options;

	return items.map((item) => ({
		translation:
			item.translation === undefined
				? null
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
		thirdHeight: "thirdHeight" in item ? item.thirdHeight : false,
		children: "children" in item ? resolveOfferFromItems(item.children, options) : [],
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
