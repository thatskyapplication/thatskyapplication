import { Area } from "../../models/area.js";
import { AreaName, RealmName } from "../geography.js";

export default new Area({
	name: AreaName.FrozenLake,
	realm: RealmName.ValleyOfTriumph,
	wingedLight: 2,
});
