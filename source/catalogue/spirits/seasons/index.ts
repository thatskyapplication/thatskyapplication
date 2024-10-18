import type { DateTime } from "luxon";
import type { GuideSpirit, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { skyNow } from "../../../Utility/dates.js";
import AURORA from "./AURORA/index.js";
import Abyss from "./Abyss/index.js";
import Assembly from "./Assembly/index.js";
import Belonging from "./Belonging/index.js";
import Dreams from "./Dreams/index.js";
import Duets from "./Duets/index.js";
import Enchantment from "./Enchantment/index.js";
import Flight from "./Flight/index.js";
import Gratitude from "./Gratitude/index.js";
import Lightseekers from "./Lightseekers/index.js";
import LittlePrince from "./LittlePrince/index.js";
import Moments from "./Moments/index.js";
import Moomin from "./Moomin/index.js";
import Nesting from "./Nesting/index.js";
import NineColouredDeer from "./NineColouredDeer/index.js";
import Passage from "./Passage/index.js";
import Performance from "./Performance/index.js";
import Prophecy from "./Prophecy/index.js";
import Remembrance from "./Remembrance/index.js";
import Revival from "./Revival/index.js";
import Rhythm from "./Rhythm/index.js";
import Sanctuary from "./Sanctuary/index.js";
import Shattering from "./Shattering/index.js";

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
