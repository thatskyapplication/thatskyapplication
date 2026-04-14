import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.TempleOfTheVault,
	realm: RealmName.VaultOfKnowledge,
	wingedLight: 1,
} satisfies AreaDefinition;
