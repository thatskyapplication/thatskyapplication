import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import { isActive, skyNow } from "../../dates.js";
import type { Season } from "../../models/season.js";
import type { GuideSpirit, SeasonalSpirit } from "../../models/spirits.js";
import type { SeasonIds } from "../../season.js";
import { type Visit, VisitType } from "../../types/index.js";
import type { SpiritIds } from "../../utility/spirits.js";
import Abyss from "./abyss/index.js";
import Assembly from "./assembly/index.js";
import AURORA from "./aurora/index.js";
import Belonging from "./belonging/index.js";
import BlueBird from "./blue-bird/index.js";
import carnival from "./carnival/index.js";
import dearVanGogh from "./dear-van-gogh/index.js";
import Dreams from "./dreams/index.js";
import Duets from "./duets/index.js";
import Enchantment from "./enchantment/index.js";
import Flight from "./flight/index.js";
import Gratitude from "./gratitude/index.js";
import lightmending from "./lightmending/index.js";
import Lightseekers from "./lightseekers/index.js";
import LittlePrince from "./little-prince/index.js";
import migration from "./migration/index.js";
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
import twoEmbersPart1 from "./two-embers-part-1/index.js";

export const SEASONS: ReadonlyCollection<SeasonIds, Season> = [
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
	BlueBird,
	twoEmbersPart1,
	migration,
	lightmending,
	carnival,
	dearVanGogh,
].reduce((seasons, season) => seasons.set(season.id, season), new Collection<SeasonIds, Season>());

export const TRAVELLING_DATES: ReadonlyCollection<number, Visit> = new Collection<number, Visit>(
	SEASONS.reduce<Omit<Visit, "visit">[]>((travellingDates, season) => {
		for (const spirit of season.spirits.values()) {
			for (const dates of spirit.visits.travelling) {
				travellingDates.push({ ...dates, spiritId: spirit.id, type: VisitType.Travelling });
			}
		}

		return travellingDates;
	}, [])
		.sort((a, b) => Temporal.ZonedDateTime.compare(a.start, b.start))
		.map((dates, index) => [index + 1, { ...dates, visit: index + 1 }]),
);

const returningDates: Readonly<Visit[]> = SEASONS.reduce<Visit[]>((returningDates, season) => {
	for (const spirit of season.spirits.values()) {
		for (const [visit, dates] of spirit.visits.returning) {
			returningDates.push({ ...dates, spiritId: spirit.id, visit, type: VisitType.Returning });
		}
	}

	return returningDates;
}, []);

const allVisits = [];

for (const travellingDate of TRAVELLING_DATES.values()) {
	allVisits.push(travellingDate);
}

for (const returningDate of returningDates) {
	allVisits.push(returningDate);
}

export const VISITS_ABSENT: Readonly<Visit[]> = allVisits
	.sort((a, b) => Temporal.ZonedDateTime.compare(a.start, b.start))
	.reduceRight<Visit[]>((visits, visit) => {
		if (visits.some((storedVisit) => storedVisit.spiritId === visit.spiritId)) {
			return visits;
		}

		visits.push(visit);
		return visits;
	}, [])
	.reverse();

export function skySeasons(date = skyNow()): ReadonlyCollection<SeasonIds, Season> {
	return SEASONS.filter(({ start }) => Temporal.ZonedDateTime.compare(date, start) >= 0);
}

export function currentSeasonalSpirits(): ReadonlyCollection<
	SpiritIds,
	GuideSpirit | SeasonalSpirit
> {
	return skySeasons().reduce(
		(spirits, season) => spirits.concat(season.spiritsWithGuide),
		new Collection<SpiritIds, GuideSpirit | SeasonalSpirit>(),
	);
}

export function skyCurrentSeason(date: Temporal.ZonedDateTime) {
	return skySeasons(date).find(({ start, end }) => isActive(start, end, date)) ?? null;
}

export function skyUpcomingSeason(date: Temporal.ZonedDateTime) {
	return SEASONS.find(({ start }) => Temporal.ZonedDateTime.compare(start, date) > 0) ?? null;
}

export function resolveTravellingSpirit(date: Temporal.ZonedDateTime) {
	const travelling = TRAVELLING_DATES.findLast(({ start, end }) => isActive(start, end, date));

	return typeof travelling?.spiritId === "number"
		? currentSeasonalSpirits().get(travelling.spiritId)
		: null;
}

export function resolveReturningSpirits(date: Temporal.ZonedDateTime) {
	const returningSpirits = currentSeasonalSpirits().filter((spirit) =>
		spirit.isSeasonalSpirit() ? spirit.visit(date).current.returning : false,
	);

	return returningSpirits.size === 0 ? null : returningSpirits;
}
