import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.ForestCavern,
	realm: RealmName.HiddenForest,
	wingedLight: 4,
} satisfies AreaDefinition;
