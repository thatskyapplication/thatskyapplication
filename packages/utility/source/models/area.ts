import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { AreaName, RealmName } from "../kingdom/geography.js";
import type { SeasonIds } from "../season.js";
import type { SpiritIds } from "../utility/spirits.js";
import type { Realm } from "./realm.js";
import type { Season } from "./season.js";
import type {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	Spirit,
	StandardSpirit,
} from "./spirits.js";

export interface AreaDefinition {
	name: AreaName;
	realm?: RealmName;
	wingedLight?: number;
}

export interface Area {
	name: AreaName;
	realm: Realm | null;
	wingedLight: number;
	standardSpirits: ReadonlyCollection<SpiritIds, StandardSpirit>;
	elderSpirits: ReadonlyCollection<SpiritIds, ElderSpirit>;
	seasonalSpirits: ReadonlyCollection<SpiritIds, SeasonalSpirit>;
	guideSpirits: ReadonlyCollection<SpiritIds, GuideSpirit>;
	spirits: ReadonlyCollection<SpiritIds, Spirit>;
	seasons: ReadonlyCollection<SeasonIds, Season>;
}

export function createArea(data: AreaDefinition): Area {
	return {
		name: data.name,
		realm: null,
		wingedLight: data.wingedLight ?? 0,
		standardSpirits: new Collection<SpiritIds, StandardSpirit>(),
		elderSpirits: new Collection<SpiritIds, ElderSpirit>(),
		seasonalSpirits: new Collection<SpiritIds, SeasonalSpirit>(),
		guideSpirits: new Collection<SpiritIds, GuideSpirit>(),
		spirits: new Collection<SpiritIds, Spirit>(),
		seasons: new Collection<SeasonIds, Season>(),
	};
}
