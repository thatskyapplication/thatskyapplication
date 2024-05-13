import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import ForgetfulStoryteller from "./ForgetfulStoryteller.js";
import FranticStagehand from "./FranticStagehand.js";
import MellowMusician from "./MellowMusician.js";
import ModestDancer from "./ModestDancer.js";
import PerformanceGuide from "./PerformanceGuide.js";

export default new Season({
	name: SeasonName.Performance,
	start: skyDate(2_022, 4, 11),
	end: skyDate(2_022, 6, 26),
	guide: PerformanceGuide,
	spirits: [FranticStagehand, ForgetfulStoryteller, MellowMusician, ModestDancer],
	seasonalCandlesRotation: null,
});
