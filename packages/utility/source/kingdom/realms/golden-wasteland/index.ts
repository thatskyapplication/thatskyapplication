import type { RealmDefinition } from "../../../models/realm.js";
import { RealmName } from "../../geography.js";
import CourageousSoldier from "./spirits/courageous-soldier.js";
import ElderOfTheWasteland from "./spirits/elder-of-the-wasteland.js";
import FaintingWarrior from "./spirits/fainting-warrior.js";
import FrightenedRefugee from "./spirits/frightened-refugee.js";
import LookoutScout from "./spirits/lookout-scout.js";
import SalutingCaptain from "./spirits/saluting-captain.js";
import StealthySurvivor from "./spirits/stealthy-survivor.js";

export default {
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
} satisfies RealmDefinition;
