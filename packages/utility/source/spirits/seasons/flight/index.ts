import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
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
	patchNotesURL: patchNotesRoute("0150"),
});
