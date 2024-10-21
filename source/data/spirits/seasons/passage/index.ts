import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import MelancholyMope from "./melancholy-mope.js";
import OddballOutcast from "./oddball-outcast.js";
import OveractiveOverachiever from "./overactive-overachiever.js";
import PassageGuide from "./passage-guide.js";
import TumblingTroublemaker from "./tumbling-troublemaker.js";

export default new Season({
	id: SeasonId.Passage,
	start: skyDate(2_023, 4, 17),
	end: skyDate(2_023, 7, 3),
	guide: PassageGuide,
	spirits: [OddballOutcast, TumblingTroublemaker, MelancholyMope, OveractiveOverachiever],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1111",
});
