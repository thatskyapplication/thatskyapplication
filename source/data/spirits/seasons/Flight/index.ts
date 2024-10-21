import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import FlightGuide from "./FlightGuide.js";
import LightWhisperer from "./LightWhisperer.js";
import LivelyNavigator from "./LivelyNavigator.js";
import TalentedBuilder from "./TalentedBuilder.js";
import TinkeringChimesmith from "./TinkeringChimesmith.js";

export default new Season({
	id: SeasonId.Flight,
	start: skyDate(2_021, 10, 4),
	end: skyDate(2_021, 12, 20),
	guide: FlightGuide,
	spirits: [LivelyNavigator, LightWhisperer, TinkeringChimesmith, TalentedBuilder],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/841",
});
