import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.TempleOfTheValley,
	realm: RealmName.ValleyOfTriumph,
	wingedLight: 3,
} satisfies AreaDefinition;
