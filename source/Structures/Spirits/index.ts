import type { DateTime } from "luxon";
import type { SeasonalSpirit } from "./Base.js";
import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";
import Standard from "./Standard/index.js";

export default [...Standard, ...Elder, ...Seasonal] as const;

export function resolveTravellingSpirit(date: DateTime) {
	return (
		Seasonal.find((spirit): spirit is SeasonalSpirit => {
			if (!spirit.isSeasonalSpirit()) return false;
			const visit = spirit.visits.travelling.last();
			if (!visit) return false;
			return date >= visit && date <= visit.plus({ days: 3 }).endOf("day");
		}) ?? null
	);
}
