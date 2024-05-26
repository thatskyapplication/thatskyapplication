import type { DateTime } from "luxon";
import type { SeasonalSpirit } from "../../../Structures/Spirits.js";
import {
	type SeasonName,
	SEASON_FLAGS_TO_SEASON_NAME_ENTRIES,
	SEASON_NAME_VALUES,
	SeasonNameToSeasonalEmoji,
} from "../../../Utility/catalogue.js";
import { todayDate } from "../../../Utility/dates.js";
import { formatEmoji } from "../../../Utility/emojis.js";
import AURORA from "./AURORA/index.js";
import Abyss from "./Abyss/index.js";
import Assembly from "./Assembly/index.js";
import Belonging from "./Belonging/index.js";
import Dreams from "./Dreams/index.js";
import Enchantment from "./Enchantment/index.js";
import Flight from "./Flight/index.js";
import Gratitude from "./Gratitude/index.js";
import Lightseekers from "./Lightseekers/index.js";
import LittlePrince from "./LittlePrince/index.js";
import Moments from "./Moments/index.js";
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
] as const;

export const CURRENT_SEASONS = SEASONS.filter((season) => todayDate() >= season.start);

export const SEASON_SPIRITS = [
	Gratitude.guide,
	...Gratitude.spirits,
	Lightseekers.guide,
	...Lightseekers.spirits,
	Belonging.guide,
	...Belonging.spirits,
	Rhythm.guide,
	...Rhythm.spirits,
	Enchantment.guide,
	...Enchantment.spirits,
	Sanctuary.guide,
	...Sanctuary.spirits,
	Prophecy.guide,
	...Prophecy.spirits,
	Dreams.guide,
	...Dreams.spirits,
	Assembly.guide,
	...Assembly.spirits,
	LittlePrince.guide,
	...LittlePrince.spirits,
	Flight.guide,
	...Flight.spirits,
	Abyss.guide,
	...Abyss.spirits,
	Performance.guide,
	...Performance.spirits,
	Shattering.guide,
	...Shattering.spirits,
	AURORA.guide,
	...AURORA.spirits,
	Remembrance.guide,
	...Remembrance.spirits,
	Passage.guide,
	...Passage.spirits,
	Moments.guide,
	...Moments.spirits,
	Revival.guide,
	...Revival.spirits,
	NineColouredDeer.guide,
	...NineColouredDeer.spirits,
	Nesting.guide,
	...Nesting.spirits,
] as const;

export function resolveSeason(date: DateTime) {
	return SEASONS.find(({ start, end }) => date >= start && date <= end) ?? null;
}

export function nextSeason(date: DateTime) {
	const closestSeasonIndex = SEASONS.findLastIndex(({ start }) => date >= start);
	return closestSeasonIndex === -1 ? null : SEASONS.at(closestSeasonIndex + 1) ?? null;
}

export function isSeasonName(season: string): season is SeasonName {
	return SEASON_NAME_VALUES.includes(season as SeasonName);
}

export function resolveBitsToSeasons(bits: number) {
	const platforms = [];

	for (const [bit, season] of SEASON_FLAGS_TO_SEASON_NAME_ENTRIES) {
		const bit_ = Number(bit);
		if ((bits & bit_) === bit_) platforms.push(formatEmoji(SeasonNameToSeasonalEmoji[season]));
	}

	return platforms;
}

export function resolveSeasonalSpirit(spiritName: string) {
	for (const season of SEASONS) {
		const spirit = season.spirits.find((spirit) => spirit.name === spiritName);
		if (spirit) return spirit;
	}

	return null;
}

export function resolveTravellingSpirit(date: DateTime) {
	return (
		SEASON_SPIRITS.find((spirit): spirit is SeasonalSpirit =>
			spirit.isSeasonalSpirit() ? spirit.visit(date).current.travelling : false,
		) ?? null
	);
}

export function resolveReturningSpirits(date: DateTime) {
	const returningSpirits = SEASON_SPIRITS.filter((spirit): spirit is SeasonalSpirit =>
		spirit.isSeasonalSpirit() ? spirit.visit(date).current.returning : false,
	);

	return returningSpirits.length === 0 ? null : returningSpirits;
}
