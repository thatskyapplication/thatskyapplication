import { Realm } from "../../../../Structures/Realm.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import ApologeticLumberjack from "./ApologeticLumberjack.js";
import BlushingProspector from "./BlushingProspector.js";
import DismayedHunter from "./DismayedHunter.js";
import ElderOfTheForest from "./ElderOfTheForest.js";
import HideNSeekPioneer from "./HideNSeekPioneer.js";
import PoutyPorter from "./PoutyPorter.js";
import ShiveringTrailblazer from "./ShiveringTrailblazer.js";
import TearfulLightMiner from "./TearfulLightMiner.js";
import WhaleWhisperer from "./WhaleWhisperer.js";

export default new Realm({
	name: RealmName.HiddenForest,
	elder: ElderOfTheForest,
	spirits: [
		ShiveringTrailblazer,
		BlushingProspector,
		HideNSeekPioneer,
		PoutyPorter,
		DismayedHunter,
		ApologeticLumberjack,
		TearfulLightMiner,
		WhaleWhisperer,
	],
});
