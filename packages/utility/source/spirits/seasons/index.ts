import { Collection } from "@discordjs/collection";
import type { DateTime } from "luxon";
import { skyNow } from "../../dates.js";
import type { Season } from "../../models/season.js";
import type { GuideSpirit, SeasonalSpirit } from "../../models/spirits.js";
import type { SeasonIds } from "../../season.js";
import { type SpiritIds, TRAVELLING_DATES } from "../../utility/spirits.js";
import Abyss from "./abyss/index.js";
import Assembly from "./assembly/index.js";
import AURORA from "./aurora/index.js";
import Belonging from "./belonging/index.js";
import Dreams from "./dreams/index.js";
import Duets from "./duets/index.js";
import Enchantment from "./enchantment/index.js";
import Flight from "./flight/index.js";
import Gratitude from "./gratitude/index.js";
import Lightseekers from "./lightseekers/index.js";
import LittlePrince from "./little-prince/index.js";
import Moments from "./moments/index.js";
import Moomin from "./moomin/index.js";
import Nesting from "./nesting/index.js";
import NineColouredDeer from "./nine-coloured-deer/index.js";
import Passage from "./passage/index.js";
import Performance from "./performance/index.js";
import Prophecy from "./prophecy/index.js";
import Radiance from "./radiance/index.js";
import Remembrance from "./remembrance/index.js";
import Revival from "./revival/index.js";
import Rhythm from "./rhythm/index.js";
import Sanctuary from "./sanctuary/index.js";
import Shattering from "./shattering/index.js";

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
	Radiance,
].reduce((seasons, season) => seasons.set(season.id, season), new Collection<SeasonIds, Season>());

export function skySeasons(date = skyNow()) {
	return SEASONS.filter(({ start }) => date >= start);
}

export function currentSeasonalSpirits() {
	return skySeasons().reduce((spirits, season) => {
		spirits.set(season.guide.id, season.guide);
		return spirits.concat(season.spirits);
	}, new Collection<SpiritIds, GuideSpirit | SeasonalSpirit>());
}

export function skyCurrentSeason(date: DateTime) {
	return skySeasons(date).find(({ start, end }) => date >= start && date < end) ?? null;
}

export function skyUpcomingSeason(date: DateTime) {
	return SEASONS.find(({ start }) => start > date) ?? null;
}

export function resolveTravellingSpirit(date: DateTime) {
	const travelling = TRAVELLING_DATES.findLast(({ start, end }) => date >= start && date < end);
	return typeof travelling?.spiritId === "number"
		? currentSeasonalSpirits().get(travelling.spiritId)
		: null;
}

export function resolveReturningSpirits(date: DateTime) {
	const returningSpirits = currentSeasonalSpirits().filter((spirit): spirit is SeasonalSpirit =>
		spirit.isSeasonalSpirit() ? spirit.visit(date).current.returning : false,
	);

	return returningSpirits.size === 0 ? null : returningSpirits;
}
