import type { ReadonlyCollection } from "@discordjs/collection";
import type {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	StandardSpirit,
} from "../models/spirits.js";
import type { SpiritIds } from "../utility/spirits.js";
import { REALM_SPIRITS } from "./realms/index.js";
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
