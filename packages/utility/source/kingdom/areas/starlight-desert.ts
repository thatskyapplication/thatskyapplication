import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.StarlightDesert,
	realm: RealmName.VaultOfKnowledge,
	wingedLight: 3,
} satisfies AreaDefinition;
