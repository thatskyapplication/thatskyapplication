import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
import ChillSunbather from "./chill-sunbather.js";
import GratefulShellCollector from "./grateful-shell-collector.js";
import HikingGrouch from "./hiking-grouch.js";
import JellyWhisperer from "./jelly-whisperer.js";
import RallyingThrillseeker from "./rallying-thrillseeker.js";
import SanctuaryGuide from "./sanctuary-guide.js";
import TimidBookworm from "./timid-bookworm.js";

export default new Season({
	id: SeasonId.Sanctuary,
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
	patchNotesURL: patchNotesRoute("p0100"),
});
