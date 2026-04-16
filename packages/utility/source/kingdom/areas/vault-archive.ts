import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.VaultArchive,
	realm: RealmName.VaultOfKnowledge,
	wingedLight: 2,
} satisfies AreaDefinition;
