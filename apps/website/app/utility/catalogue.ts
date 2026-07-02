import {
	CLOTHING_SHOP,
	Cosmetic,
	collectSpiritCosmetics,
	ELDER_SPIRITS,
	type ElderSpirit,
	type EventIds,
	type GuideSpirit,
	type Item,
	isRealm,
	NESTING_WORKSHOP,
	REALMS,
	type RealmName,
	SECRET_AREA,
	type SeasonalSpirit,
	type SeasonIds,
	type SpiritIds,
	STANDARD_SPIRITS,
	STARTER_PACKS,
	type StandardSpirit,
	skyEvents,
	skySeasons,
	spirits,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { CosmeticToEmoji, MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";

const VALID_COSMETICS = new Set(
	Object.values(Cosmetic).filter((value): value is number => typeof value === "number"),
);

export const CARD_CLASS =
	"rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-900" as const;
export const LINK_CARD_CLASS = clsx(
	CARD_CLASS,
	"transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-900/50",
);
export const VIEW_LINK_CLASS =
	"shrink-0 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" as const;
export const NOTE_CLASS = "m-0 text-xs text-gray-500 dark:text-gray-400" as const;
export const TREE_COLUMN_CLASS = "flex w-60 shrink-0 flex-col justify-end gap-2 sm:w-64" as const;
export const TREE_COLUMN_LABEL_CLASS =
	"line-clamp-2 min-h-10 text-sm font-medium text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300" as const;

export function itemEmoji(item: Item) {
	return item.regularHeart ? MISCELLANEOUS_EMOJIS.Heart : CosmeticToEmoji[item.cosmeticDisplay];
}

export function realmAnchor(realm: RealmName) {
	return `realm-${realm.toLowerCase().replaceAll(" ", "-")}`;
}

export function spiritItemsGroup(
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
) {
	if (spirit.isStandardSpirit()) {
		return REALMS.find(({ name }) => name === spirit.realm)?.spirits;
	}

	if (spirit.isElderSpirit()) {
		return ELDER_SPIRITS;
	}

	const season = skySeasons().get(spirit.seasonId);
	return season ? [season.guide, ...season.spirits.values()] : undefined;
}

export function resolveSpiritTree(
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
) {
	if (spirit.isSeasonalSpirit() && spirit.current.length === 0) {
		return spirit.seasonal;
	}

	return spirit.current;
}

export function parseCosmetics(value: FormDataEntryValue | null) {
	if (typeof value !== "string") {
		return null;
	}

	try {
		const parsed: unknown = JSON.parse(value);

		return Array.isArray(parsed) &&
			parsed.length > 0 &&
			parsed.every(
				(cosmetic): cosmetic is number =>
					typeof cosmetic === "number" && VALID_COSMETICS.has(cosmetic),
			)
			? parsed
			: null;
	} catch {
		return null;
	}
}

export function resolveScopeCosmetics(
	scope: FormDataEntryValue | null,
): ReadonlySet<number> | null {
	if (typeof scope !== "string") {
		return null;
	}

	switch (scope) {
		case "elders":
			return collectSpiritCosmetics(ELDER_SPIRITS.values());
		case "starter-packs":
			return new Set(STARTER_PACKS.allCosmetics);
		case "secret-area":
			return new Set(SECRET_AREA.allCosmetics);
		case "clothing-shop":
			return new Set(CLOTHING_SHOP.allCosmetics);
		case "nesting-workshop":
			return new Set(NESTING_WORKSHOP.allCosmetics);
		default:
	}

	const separatorIndex = scope.indexOf(":");

	if (separatorIndex === -1) {
		return null;
	}

	const type = scope.slice(0, separatorIndex);
	const value = scope.slice(separatorIndex + 1);

	if (type === "realm" && isRealm(value)) {
		return collectSpiritCosmetics(
			STANDARD_SPIRITS.filter((spirit) => spirit.realm === value).values(),
		);
	}

	if (type === "season") {
		const season = skySeasons().get(Number(value) as SeasonIds);

		if (!season) {
			return null;
		}

		const cosmetics = collectSpiritCosmetics([season.guide, ...season.spirits.values()]);

		for (const cosmetic of season.allCosmetics) {
			cosmetics.add(cosmetic);
		}

		return cosmetics;
	}

	if (type === "spirit") {
		const spirit = spirits().get(Number(value) as SpiritIds);
		return spirit ? new Set(spirit.allCosmetics) : null;
	}

	if (type === "event") {
		const event = skyEvents().get(Number(value) as EventIds);
		return event ? new Set(event.allCosmetics) : null;
	}

	return null;
}
