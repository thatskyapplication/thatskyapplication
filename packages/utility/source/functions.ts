import type { EventIds } from "./event.js";
import type { SeasonIds } from "./season.js";
import type { Item, ItemRaw } from "./spirits.js";

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
) {
	return items.map((item) => ({
		name: item.name,
		cosmetics: Array.isArray(item.cosmetic) ? item.cosmetic : [item.cosmetic],
		emoji: item.emoji ?? null,
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
