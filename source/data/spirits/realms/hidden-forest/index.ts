import { Realm } from "../../../../models/Realm.js";
import { RealmName } from "../../../../utility/constants-2.js";
import ApologeticLumberjack from "./apologetic-lumberjack.js";
import BlushingProspector from "./blushing-prospector.js";
import DismayedHunter from "./dismayed-hunter.js";
import ElderOfTheForest from "./elder-of-the-forest.js";
import HideNSeekPioneer from "./hide-n-seek-pioneer.js";
import PoutyPorter from "./pouty-porter.js";
import ShiveringTrailblazer from "./shivering-trailblazer.js";
import TearfulLightMiner from "./tearful-light-miner.js";
import WhaleWhisperer from "./whale-whisperer.js";

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
