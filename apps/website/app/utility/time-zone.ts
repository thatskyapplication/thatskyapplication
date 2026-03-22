export const TIME_ZONE_COOKIE_NAME = "time_zone";
export const TIME_ZONE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isValidTimeZone(timeZone: string | null | undefined): timeZone is string {
	if (!timeZone) {
		return false;
	}

	try {
		new Intl.DateTimeFormat("en", { timeZone });
		return true;
	} catch {
		return false;
	}
}

export function getBrowserTimeZone() {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	return isValidTimeZone(timeZone) ? timeZone : null;
}
