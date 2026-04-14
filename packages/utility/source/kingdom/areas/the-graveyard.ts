import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.TheGraveyard,
	realm: RealmName.GoldenWasteland,
	wingedLight: 6,
} satisfies AreaDefinition;
