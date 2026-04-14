import type { AreaDefinition } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default {
	name: AreaName.BlueBirdTheatre,
	realm: RealmName.HiddenForest,
	wingedLight: 1,
} satisfies AreaDefinition;
