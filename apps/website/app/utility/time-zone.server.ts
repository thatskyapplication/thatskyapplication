import { parseCookie } from "cookie";
import { TIME_ZONE } from "@thatskyapplication/utility";
import { isValidTimeZone, TIME_ZONE_COOKIE_NAME } from "~/utility/time-zone";

export function resolvePreferredTimeZone(request: Request) {
	const cookieTimeZone = parseCookie(request.headers.get("Cookie") ?? "")[TIME_ZONE_COOKIE_NAME];

	if (isValidTimeZone(cookieTimeZone)) {
		return { timeZone: cookieTimeZone, timeZoneEstimated: false };
	}

	const cloudflareTimeZone = request.headers.get("cf-timezone");

	if (isValidTimeZone(cloudflareTimeZone)) {
		return { timeZone: cloudflareTimeZone, timeZoneEstimated: true };
	}

	return { timeZone: TIME_ZONE, timeZoneEstimated: true };
}
