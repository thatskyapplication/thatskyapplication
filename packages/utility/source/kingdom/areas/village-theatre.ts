import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.VillageTheatre,
	realm: RealmName.ValleyOfTriumph,
	wingedLight: 1,
} satisfies AreaDefinition;
