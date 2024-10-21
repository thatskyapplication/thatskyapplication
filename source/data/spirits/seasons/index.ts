import type { DateTime } from "luxon";
import type { GuideSpirit, SeasonalSpirit } from "../../../models/Spirits.js";
import { skyNow } from "../../../utility/dates.js";
import AURORA from "./AURORA2/index.js";
import Assembly from "./Assembly2/index.js";
import Belonging from "./Belonging2/index.js";
import Dreams from "./Dreams2/index.js";
import Duets from "./Duets2/index.js";
import Enchantment from "./Enchantment2/index.js";
import Flight from "./Flight2/index.js";
import Gratitude from "./Gratitude2/index.js";
import Lightseekers from "./Lightseekers2/index.js";
import LittlePrince from "./LittlePrince2/index.js";
import Moments from "./Moments2/index.js";
import Moomin from "./Moomin2/index.js";
import Nesting from "./Nesting2/index.js";
import NineColouredDeer from "./NineColouredDeer2/index.js";
import Passage from "./Passage2/index.js";
import Performance from "./Performance2/index.js";
import Prophecy from "./Prophecy2/index.js";
import Remembrance from "./Remembrance2/index.js";
import Revival from "./Revival2/index.js";
import Rhythm from "./Rhythm2/index.js";
import Sanctuary from "./Sanctuary2/index.js";
import Shattering from "./Shattering2/index.js";
import Abyss from "./abyss2/index.js";

const SEASONS = [
	Gratitude,
	Lightseekers,
	Belonging,
	Rhythm,
	Enchantment,
	Sanctuary,
	Prophecy,
	Dreams,
	Assembly,
	LittlePrince,
	Flight,
	Abyss,
	Performance,
	Shattering,
	AURORA,
	Remembrance,
	Passage,
	Moments,
	Revival,
	NineColouredDeer,
	Nesting,
	Duets,
	Moomin,
] as const;

export function skySeasons(date = skyNow()) {
	return SEASONS.filter(({ start }) => date >= start);
}

export function currentSeasonalSpirits() {
	return skySeasons().reduce<(GuideSpirit | SeasonalSpirit)[]>((seasonalSpirits, season) => {
		seasonalSpirits.push(season.guide, ...season.spirits);
		return seasonalSpirits;
	}, []);
}

export function skyCurrentSeason(date: DateTime) {
	return skySeasons(date).find(({ start, end }) => date >= start && date < end) ?? null;
}

export function skyUpcomingSeason(date: DateTime) {
	return SEASONS.find(({ start }) => start > date) ?? null;
}

export function resolveSeasonalSpirit(spiritName: string) {
	for (const season of skySeasons()) {
		const spirit = season.spirits.find((spirit) => spirit.name === spiritName);

		if (spirit) {
			return spirit;
		}
	}

	return null;
}

export function resolveTravellingSpirit(date: DateTime) {
	return (
		currentSeasonalSpirits().find((spirit): spirit is SeasonalSpirit =>
			spirit.isSeasonalSpirit() ? spirit.visit(date).current.travelling : false,
		) ?? null
	);
}

export function resolveReturningSpirits(date: DateTime) {
	const returningSpirits = currentSeasonalSpirits().filter((spirit): spirit is SeasonalSpirit =>
		spirit.isSeasonalSpirit() ? spirit.visit(date).current.returning : false,
	);

	return returningSpirits.length === 0 ? null : returningSpirits;
}
