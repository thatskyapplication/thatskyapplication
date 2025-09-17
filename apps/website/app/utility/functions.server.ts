import { randomBytes } from "node:crypto";

export function generateState() {
	return randomBytes(16).toString("hex");
}

export function hasAnyHeaders(headers: Headers) {
	return [...headers].length > 0;
}
