import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.ElevatedClearing,
	realm: RealmName.HiddenForest,
	wingedLight: 2,
} satisfies AreaDefinition;
