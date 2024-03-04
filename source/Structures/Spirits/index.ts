import type { DateTime } from "luxon";
import type { SeasonalSpirit } from "./Base.js";
import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";
import Standard from "./Standard/index.js";

export default [...Standard, ...Elder, ...Seasonal] as const;

export function resolveTravellingSpirit(date: DateTime) {
	return (
		Seasonal.find((spirit): spirit is SeasonalSpirit =>
			spirit.isSeasonalSpirit() ? spirit.visit(date).current.travelling : false,
		) ?? null
	);
}

export function resolveReturningSpirits(date: DateTime) {
	const returningSpirits = Seasonal.filter((spirit): spirit is SeasonalSpirit =>
		spirit.isSeasonalSpirit() ? spirit.visit(date).current.returning : false,
	);

	return returningSpirits.length === 0 ? null : returningSpirits;
}
