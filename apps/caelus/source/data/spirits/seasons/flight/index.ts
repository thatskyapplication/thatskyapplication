import { URL } from "node:url";
import { Season, SeasonId, skyDate } from "@thatskyapplication/utility";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import FlightGuide from "./flight-guide.js";
import LightWhisperer from "./light-whisperer.js";
import LivelyNavigator from "./lively-navigator.js";
import TalentedBuilder from "./talented-builder.js";
import TinkeringChimesmith from "./tinkering-chimesmith.js";

export default new Season({
	id: SeasonId.Flight,
	start: skyDate(2_021, 10, 4),
	end: skyDate(2_021, 12, 20),
	guide: FlightGuide,
	spirits: [LivelyNavigator, LightWhisperer, TinkeringChimesmith, TalentedBuilder],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("0150", LINK_REDIRECTOR_URL)),
});
