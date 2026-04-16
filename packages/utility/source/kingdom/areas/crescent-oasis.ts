import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.CrescentOasis,
	realm: RealmName.VaultOfKnowledge,
	wingedLight: 3,
} satisfies AreaDefinition;
