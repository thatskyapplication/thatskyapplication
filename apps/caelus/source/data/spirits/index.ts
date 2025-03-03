import type { ReadonlyCollection } from "@discordjs/collection";
import {
	type ElderSpirit,
	type GuideSpirit,
	REALM_SPIRITS,
	type SeasonalSpirit,
	type SpiritIds,
	type StandardSpirit,
} from "@thatskyapplication/utility";
import { currentSeasonalSpirits } from "./seasons/index.js";

export function spirits(): ReadonlyCollection<
	SpiritIds,
	StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit
> {
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
