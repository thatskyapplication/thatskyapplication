import { inspect } from "node:util";
import type { RealmValue } from "./Constants.js";
import { Realm, RealmString } from "./Constants.js";

export function consoleLog(consoleLog: any, stamp = new Date().toISOString()): void {
	console.log(`- - - - - ${stamp} - - - - -`);
	console.log(inspect(consoleLog, false, Number.POSITIVE_INFINITY, true));
}

export function notNull<T>(value: (T | null)): value is T {
	return value !== null;
}

export function isRealm(realm: number): realm is RealmValue {
	return Object.values(Realm).includes(realm as RealmValue);
}

export function realmToString(realm: RealmValue): RealmString {
	return Object.values(RealmString)[realm];
}
