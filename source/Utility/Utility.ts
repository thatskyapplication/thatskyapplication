import { inspect } from "node:util";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { Map, Realm, VALID_REALM } from "./Constants.js";

dayjs.extend(timezone);
dayjs.extend(utc);

export function consoleLog(consoleLog: any, stamp = new Date().toISOString()): void {
	console.log(`- - - - - ${stamp} - - - - -`);
	console.log(inspect(consoleLog, false, Number.POSITIVE_INFINITY, true));
}

export function notNull<T>(value: T | null): value is T {
	return value !== null;
}

export function todayDate() {
	return dayjs.tz(Date.now(), "America/Los_Angeles").hour(0).minute(0).second(0).millisecond(0).toDate();
}

export function isRealm(realm: string): realm is Realm {
	return Object.values(Realm).includes(realm as Realm);
}

export function resolveValidRealm(realm: string) {
	const upperRealm = realm.toUpperCase();
	return Object.values(VALID_REALM).find((validRealm) => validRealm.toUpperCase() === upperRealm) ?? null;
}

export function resolveMap(rawMap: string) {
	const upperRawMap = rawMap.toUpperCase();

	// Account for wonderful inconsistencies.
	switch (upperRawMap) {
		case "FOREST'S BROOK":
			return Map.ForestBrook;
		case "RACE END":
			return Map.Coliseum;
	}

	return Object.values(Map).find((map) => map.toUpperCase() === upperRawMap) ?? null;
}
