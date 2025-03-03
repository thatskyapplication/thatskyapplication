import { REALM_SPIRITS } from "@thatskyapplication/utility";
import { currentSeasonalSpirits } from "./seasons/index.js";

export function spirits() {
	return [...REALM_SPIRITS, ...currentSeasonalSpirits()];
}
