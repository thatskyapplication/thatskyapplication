import { getLocale } from "~/middleware/i18next.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server";
import type { TimePreferences } from "~/utility/time";
import { resolvePreferredTimeZone } from "~/utility/time-zone.server";

export function getTimePreferences(
	request: Request,
	context: Parameters<typeof getLocale>[0],
): TimePreferences & { timeZoneEstimated: boolean } {
	return {
		locale: getLocale(context),
		...resolvePreferredTimeZone(request),
		hour12: getPreferredHour12(request),
	};
}
