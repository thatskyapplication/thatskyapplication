import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import CrabWhisperer from "./crab-whisperer.js";
import DoublefiveLightCatcher from "./doublefive-light-catcher.js";
import LaidbackPioneer from "./laidback-pioneer.js";
import LightseekerGuide from "./lightseeker-guide.js";
import PiggybackLightseeker from "./piggyback-lightseeker.js";
import ShushingLightScholar from "./shushing-light-scholar.js";
import TwirlingChampion from "./twirling-champion.js";

export default new Season({
	id: SeasonId.Lightseekers,
	start: skyDate(2_019, 9, 23, 12),
	end: skyDate(2_019, 11, 11, 12),
	guide: LightseekerGuide,
	spirits: [
		PiggybackLightseeker,
		DoublefiveLightCatcher,
		LaidbackPioneer,
		TwirlingChampion,
		CrabWhisperer,
		ShushingLightScholar,
	],
	items: [
		{ name: "Pendant", cosmetic: Cosmetic.LightseekerPendant },
		{
			name: "Ultimate prop",
			cosmetic: Cosmetic.LightseekerUltimateProp,
		},
	],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.6.0",
});
