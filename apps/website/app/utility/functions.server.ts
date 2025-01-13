import { randomBytes } from "node:crypto";

export function generateState() {
	return randomBytes(16).toString("hex");
}
