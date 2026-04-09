import { Area } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default new Area({
	name: AreaName.TheBattlefield,
	realm: RealmName.GoldenWasteland,
	wingedLight: 2,
});
