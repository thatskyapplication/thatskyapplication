import { Realm } from "../../../../models/Realm.js";
import { RealmName } from "../../../../utility/constants-2.js";
import CourageousSoldier from "./courageous-soldier.js";
import ElderOfTheWasteland from "./elder-of-the-wasteland.js";
import FaintingWarrior from "./fainting-warrior.js";
import FrightenedRefugee from "./frightened-refugee.js";
import LookoutScout from "./lookout-scout.js";
import SalutingCaptain from "./saluting-captain.js";
import StealthySurvivor from "./stealthy-survivor.js";

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
