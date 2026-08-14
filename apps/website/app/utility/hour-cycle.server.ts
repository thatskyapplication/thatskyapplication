import { parseCookie } from "cookie";
import { HOUR_CYCLE_COOKIE_NAME, parseHour12 } from "~/utility/hour-cycle";

export function getPreferredHour12(request: Request) {
	return parseHour12(parseCookie(request.headers.get("Cookie") ?? "")[HOUR_CYCLE_COOKIE_NAME]);
}
