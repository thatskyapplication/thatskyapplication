import { Realm } from "../../../models/realm.js";
import { areasForRealm } from "../../areas.js";
import { RealmName } from "../../geography.js";
import ApologeticLumberjack from "./spirits/apologetic-lumberjack.js";
import BlushingProspector from "./spirits/blushing-prospector.js";
import DismayedHunter from "./spirits/dismayed-hunter.js";
import ElderOfTheForest from "./spirits/elder-of-the-forest.js";
import HideNSeekPioneer from "./spirits/hide-n-seek-pioneer.js";
import PoutyPorter from "./spirits/pouty-porter.js";
import ShiveringTrailblazer from "./spirits/shivering-trailblazer.js";
import TearfulLightMiner from "./spirits/tearful-light-miner.js";
import WhaleWhisperer from "./spirits/whale-whisperer.js";

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
	areas: areasForRealm(RealmName.HiddenForest),
});
