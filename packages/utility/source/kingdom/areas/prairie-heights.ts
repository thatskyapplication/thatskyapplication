import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.PrairieHeights,
	realm: RealmName.DaylightPrairie,
	wingedLight: 1,
} satisfies AreaDefinition;
