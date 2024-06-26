import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import ChillSunbather from "./ChillSunbather.js";
import GratefulShellCollector from "./GratefulShellCollector.js";
import HikingGrouch from "./HikingGrouch.js";
import JellyWhisperer from "./JellyWhisperer.js";
import RallyingThrillseeker from "./RallyingThrillseeker.js";
import SanctuaryGuide from "./SanctuaryGuide.js";
import TimidBookworm from "./TimidBookworm.js";

export default new Season({
	name: SeasonName.Sanctuary,
	start: skyDate(2_020, 7, 13),
	end: skyDate(2_020, 9, 21),
	guide: SanctuaryGuide,
	spirits: [
		JellyWhisperer,
		TimidBookworm,
		RallyingThrillseeker,
		HikingGrouch,
		GratefulShellCollector,
		ChillSunbather,
	],
	seasonalCandlesRotation: null,
});
