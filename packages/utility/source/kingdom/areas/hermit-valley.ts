import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.HermitValley,
	realm: RealmName.ValleyOfTriumph,
	wingedLight: 2,
} satisfies AreaDefinition;
