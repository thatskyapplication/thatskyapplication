import type { ReadonlyCollection } from "@discordjs/collection";
import { Temporal } from "temporal-polyfill";
import { skyNow } from "../dates.js";
import type { GuideSpirit, SeasonalSpirit, Spirit } from "../models/spirits.js";
import type { SpiritIds } from "../utility/spirits.js";
import { REALM_SPIRITS } from "./realms/index.js";
import { SEASONS, currentSeasonalSpirits } from "./seasons/index.js";

let known: {
	from: Temporal.ZonedDateTime;
	spirits: ReadonlyCollection<SpiritIds, Spirit>;
	until: Temporal.ZonedDateTime | null;
} | null = null;

export function spirits(): ReadonlyCollection<SpiritIds, Spirit> {
	const now = skyNow();

	if (
		known !== null &&
		Temporal.ZonedDateTime.compare(now, known.from) >= 0 &&
		(known.until === null || Temporal.ZonedDateTime.compare(now, known.until) < 0)
	) {
		return known.spirits;
	}

	let until: Temporal.ZonedDateTime | null = null;

	for (const { start } of SEASONS.values()) {
		if (
			Temporal.ZonedDateTime.compare(now, start) < 0 &&
			(until === null || Temporal.ZonedDateTime.compare(start, until) < 0)
		) {
			until = start;
		}
	}

	const merged = REALM_SPIRITS.merge<SeasonalSpirit | GuideSpirit, Spirit>(
		currentSeasonalSpirits(),
		(value) => ({ keep: true, value }),
		(value) => ({ keep: true, value }),
		() => {
			throw new Error("Duplicate spirits detected.");
		},
	);

	known = { from: now, spirits: merged, until };
	return merged;
}
