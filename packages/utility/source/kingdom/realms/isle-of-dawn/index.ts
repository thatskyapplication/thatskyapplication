import { Realm } from "../../../models/realm.js";
import { areasForRealm } from "../../areas.js";
import { RealmName } from "../../geography.js";
import ElderOfTheIsles from "./spirits/elder-of-the-isle.js";
import PointingCandlemaker from "./spirits/pointing-candlemaker.js";
import RejectingVoyager from "./spirits/rejecting-voyager.js";
import UsheringStargazer from "./spirits/ushering-stargazer.js";

export default new Realm({
	name: RealmName.IsleOfDawn,
	elder: ElderOfTheIsles,
	spirits: [PointingCandlemaker, UsheringStargazer, RejectingVoyager],
	areas: areasForRealm(RealmName.IsleOfDawn),
});
