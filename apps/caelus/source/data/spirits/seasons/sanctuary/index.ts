import { URL } from "node:url";
import { SeasonId, skyDate } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
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
	patchNotesURL: String(new URL("p0100", LINK_REDIRECTOR_URL)),
});
