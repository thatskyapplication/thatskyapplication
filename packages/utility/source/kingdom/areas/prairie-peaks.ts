import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.PrairiePeaks,
	realm: RealmName.DaylightPrairie,
	wingedLight: 3,
} satisfies AreaDefinition;
