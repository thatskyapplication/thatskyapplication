import { Realm } from "../../../../Structures/Realm.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import ElderOfTheIsles from "./ElderOfTheIsles.js";
import PointingCandlemaker from "./PointingCandlemaker.js";
import RejectingVoyager from "./RejectingVoyager.js";
import UsheringStargazer from "./UsheringStargazer.js";

export default new Realm({
	name: RealmName.IslesOfDawn,
	elder: ElderOfTheIsles,
	spirits: [PointingCandlemaker, UsheringStargazer, RejectingVoyager],
});
