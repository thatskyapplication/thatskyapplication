import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
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
	patchNotesURL: patchNotesRoute("p0210"),
});
