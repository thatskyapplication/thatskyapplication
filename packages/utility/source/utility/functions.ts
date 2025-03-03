import type { EventIds } from "../event.js";
import type { SeasonIds } from "../season.js";
import type { Item, ItemCost, ItemRaw } from "../spirits.js";

export function snakeCaseName(name: string) {
	return name
		.replaceAll("'s", "s")
		.replace("' ", "'")
		.replaceAll(/[ '-]/g, "_")
		.replaceAll(/[()]/g, "")
		.replaceAll("×", "x")
		.toLowerCase();
}

export function resolveAllCosmetics(items: readonly Item[]) {
	return items.reduce<number[]>((total, { cosmetics }) => {
		total.push(...cosmetics);
		return total;
	}, []);
}

interface ResolveOfferOptions {
	seasonId?: SeasonIds;
	eventId?: EventIds;
}

export function resolveOffer(
	items: readonly ItemRaw[],
	{ seasonId, eventId }: ResolveOfferOptions = {},
): Item[] {
	return items.map((item) => ({
		name: item.name,
		cosmetics: Array.isArray(item.cosmetic) ? item.cosmetic : [item.cosmetic],
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
