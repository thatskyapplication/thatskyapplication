import {
	type ElderSpirit,
	type GuideSpirit,
	REALM_SPIRITS,
	type SeasonalSpirit,
	type StandardSpirit,
} from "@thatskyapplication/utility";
import { currentSeasonalSpirits } from "./seasons/index.js";

export function spirits() {
	return REALM_SPIRITS.merge<
		SeasonalSpirit | GuideSpirit,
		StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit
	>(
		currentSeasonalSpirits(),
		(value) => ({ keep: true, value }),
		(value) => ({ keep: true, value }),
		() => {
			throw new Error("Duplicate spirits detected.");
		},
	);
}
