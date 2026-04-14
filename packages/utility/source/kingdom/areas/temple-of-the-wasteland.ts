import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.TempleOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	wingedLight: 1,
} satisfies AreaDefinition;
