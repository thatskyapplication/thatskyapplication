import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import FlightGuide from "./FlightGuide.js";
import LightWhisperer from "./LightWhisperer.js";
import LivelyNavigator from "./LivelyNavigator.js";
import TalentedBuilder from "./TalentedBuilder.js";
import TinkeringChimesmith from "./TinkeringChimesmith.js";

export default new Season({
	name: SeasonName.Flight,
	start: skyDate(2_021, 10, 4),
	end: skyDate(2_021, 12, 19),
	guide: FlightGuide,
	spirits: [LivelyNavigator, LightWhisperer, TinkeringChimesmith, TalentedBuilder],
	seasonalCandlesRotation: null,
});
