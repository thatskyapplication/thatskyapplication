import { Realm, RealmName } from "@thatskyapplication/utility";
import ElderOfTheIsles from "./elder-of-the-isles.js";
import PointingCandlemaker from "./pointing-candlemaker.js";
import RejectingVoyager from "./rejecting-voyager.js";
import UsheringStargazer from "./ushering-stargazer.js";

export default new Realm({
	name: RealmName.IslesOfDawn,
	elder: ElderOfTheIsles,
	spirits: [PointingCandlemaker, UsheringStargazer, RejectingVoyager],
});
