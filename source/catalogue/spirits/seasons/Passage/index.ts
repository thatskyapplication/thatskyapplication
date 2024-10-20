import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import MelancholyMope from "./MelancholyMope.js";
import OddballOutcast from "./OddballOutcast.js";
import OveractiveOverachiever from "./OveractiveOverachiever.js";
import PassageGuide from "./PassageGuide.js";
import TumblingTroublemaker from "./TumblingTroublemaker.js";

export default new Season({
	id: SeasonId.Passage,
	start: skyDate(2_023, 4, 17),
	end: skyDate(2_023, 7, 3),
	guide: PassageGuide,
	spirits: [OddballOutcast, TumblingTroublemaker, MelancholyMope, OveractiveOverachiever],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1111",
});
