import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.TempleOfThePrairie,
	realm: RealmName.DaylightPrairie,
	wingedLight: 2,
} satisfies AreaDefinition;
