import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.PassageRock,
	realm: RealmName.IsleOfDawn,
	wingedLight: 2,
} satisfies AreaDefinition;
