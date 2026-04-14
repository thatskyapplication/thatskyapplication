import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.ForgottenArk,
	realm: RealmName.GoldenWasteland,
	wingedLight: 2,
} satisfies AreaDefinition;
