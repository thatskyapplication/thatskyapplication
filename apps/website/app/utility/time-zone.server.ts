import { TIME_ZONE } from "@thatskyapplication/utility";
import { parse } from "cookie";
import { isValidTimeZone, TIME_ZONE_COOKIE_NAME } from "~/utility/time-zone";

export async function getPreferredTimeZone(request: Request) {
	const cookieTimeZone = parse(request.headers.get("Cookie") ?? "")[TIME_ZONE_COOKIE_NAME];

	if (isValidTimeZone(cookieTimeZone)) {
		return cookieTimeZone;
	}

	const cloudflareTimeZone = request.headers.get("cf-timezone");

	if (isValidTimeZone(cloudflareTimeZone)) {
		return cloudflareTimeZone;
	}

	return TIME_ZONE;
}
