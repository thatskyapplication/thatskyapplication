import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.DawnOverlook,
	realm: RealmName.IsleOfDawn,
	wingedLight: 1,
} satisfies AreaDefinition;
