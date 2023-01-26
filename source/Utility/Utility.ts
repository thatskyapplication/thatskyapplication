import { inspect } from "node:util";
import time from "date-fns-tz";
import { Realm } from "./Constants.js";

export function consoleLog(consoleLog: any, stamp = new Date().toISOString()): void {
	console.log(`- - - - - ${stamp} - - - - -`);
	console.log(inspect(consoleLog, false, Number.POSITIVE_INFINITY, true));
}

export function notNull<T>(value: T | null): value is T {
	return value !== null;
}

export function todayTimestamp() {
	const date = time.utcToZonedTime(Date.now(), "America/Los_Angeles");
	date.setUTCHours(0);
	date.setUTCMinutes(0);
	date.setUTCSeconds(0);
	date.setUTCMilliseconds(0);
	return time.zonedTimeToUtc(date, "America/Los_Angeles");
}

export function isRealm(realm: string): realm is Realm {
	return Object.values(Realm).includes(realm as Realm);
}
