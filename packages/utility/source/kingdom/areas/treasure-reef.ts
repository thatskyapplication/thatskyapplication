import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.TreasureReef,
	realm: RealmName.GoldenWasteland,
	wingedLight: 2,
} satisfies AreaDefinition;
