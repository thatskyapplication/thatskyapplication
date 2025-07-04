import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import ForgetfulStoryteller from "./forgetful-storyteller.js";
import FranticStagehand from "./frantic-stagehand.js";
import MellowMusician from "./mellow-musician.js";
import ModestDancer from "./modest-dancer.js";
import PerformanceGuide from "./performance-guide.js";

export default new Season({
	id: SeasonId.Performance,
	start: skyDate(2_022, 4, 11),
	end: skyDate(2_022, 6, 27),
	guide: PerformanceGuide,
	spirits: [FranticStagehand, ForgetfulStoryteller, MellowMusician, ModestDancer],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("p0170", LINK_REDIRECTOR_URL)),
});
