import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.Moominvalley,
	realm: RealmName.VaultOfKnowledge,
	wingedLight: 1,
} satisfies AreaDefinition;
