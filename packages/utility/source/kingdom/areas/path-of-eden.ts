import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.PathOfEden,
	realm: RealmName.EyeOfEden,
	wingedLight: 9,
} satisfies AreaDefinition;
