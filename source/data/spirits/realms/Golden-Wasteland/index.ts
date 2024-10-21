import { Realm } from "../../../../models/Realm.js";
import { RealmName } from "../../../../utility/Constants.js";
import CourageousSoldier from "./CourageousSoldier.js";
import ElderOfTheWasteland from "./ElderOfTheWasteland.js";
import FaintingWarrior from "./FaintingWarrior.js";
import FrightenedRefugee from "./FrightenedRefugee.js";
import LookoutScout from "./LookoutScout.js";
import SalutingCaptain from "./SalutingCaptain.js";
import StealthySurvivor from "./StealthySurvivor.js";

export default new Realm({
	name: RealmName.GoldenWasteland,
	elder: ElderOfTheWasteland,
	spirits: [
		FrightenedRefugee,
		FaintingWarrior,
		CourageousSoldier,
		StealthySurvivor,
		SalutingCaptain,
		LookoutScout,
	],
});
