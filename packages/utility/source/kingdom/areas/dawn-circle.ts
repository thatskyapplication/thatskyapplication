import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.DawnCircle,
	realm: RealmName.IsleOfDawn,
	wingedLight: 3,
} satisfies AreaDefinition;
