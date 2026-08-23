import { getLocale } from "~/middleware/i18next.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server";
import type { TimePreferences } from "~/utility/time";
import { getPreferredTimeZone } from "~/utility/time-zone.server";

export function getTimePreferences(
	request: Request,
	context: Parameters<typeof getLocale>[0],
): TimePreferences {
	return {
		locale: getLocale(context),
		timeZone: getPreferredTimeZone(request),
		hour12: getPreferredHour12(request),
	};
}
