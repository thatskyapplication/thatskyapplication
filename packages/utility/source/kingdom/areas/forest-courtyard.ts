import { Area } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default new Area({
	name: AreaName.ForestCourtyard,
	realm: RealmName.HiddenForest,
	wingedLight: 2,
});
