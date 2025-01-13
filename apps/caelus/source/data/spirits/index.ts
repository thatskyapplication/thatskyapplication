import { REALM_SPIRITS } from "./realms/index.js";
import { currentSeasonalSpirits } from "./seasons/index.js";

export function spirits() {
	return [...REALM_SPIRITS, ...currentSeasonalSpirits()];
}
