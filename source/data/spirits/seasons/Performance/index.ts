import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import ForgetfulStoryteller from "./ForgetfulStoryteller.js";
import FranticStagehand from "./FranticStagehand.js";
import MellowMusician from "./MellowMusician.js";
import ModestDancer from "./ModestDancer.js";
import PerformanceGuide from "./PerformanceGuide.js";

export default new Season({
	id: SeasonId.Performance,
	start: skyDate(2_022, 4, 11),
	end: skyDate(2_022, 6, 27),
	guide: PerformanceGuide,
	spirits: [FranticStagehand, ForgetfulStoryteller, MellowMusician, ModestDancer],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/16/faq/890",
});
