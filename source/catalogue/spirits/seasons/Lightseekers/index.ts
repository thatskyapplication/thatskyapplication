import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import CrabWhisperer from "./CrabWhisperer.js";
import DoublefiveLightCatcher from "./DoublefiveLightCatcher.js";
import LaidbackPioneer from "./LaidbackPioneer.js";
import LightseekerGuide from "./LightseekerGuide.js";
import PiggybackLightseeker from "./PiggybackLightseeker.js";
import ShushingLightScholar from "./ShushingLightScholar.js";
import TwirlingChampion from "./TwirlingChampion.js";

export default new Season({
	name: SeasonName.Lightseekers,
	start: skyDate(2_019, 9, 23),
	end: skyDate(2_019, 11, 10),
	guide: LightseekerGuide,
	spirits: [
		PiggybackLightseeker,
		DoublefiveLightCatcher,
		LaidbackPioneer,
		TwirlingChampion,
		CrabWhisperer,
		ShushingLightScholar,
	],
	seasonalCandlesRotation: null,
});
