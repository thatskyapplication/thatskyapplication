import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import MelancholyMope from "./MelancholyMope.js";
import OddballOutcast from "./OddballOutcast.js";
import OveractiveOverachiever from "./OveractiveOverachiever.js";
import PassageGuide from "./PassageGuide.js";
import TumblingTroublemaker from "./TumblingTroublemaker.js";

export default new Season({
	name: SeasonName.Passage,
	start: skyDate(2_023, 4, 17),
	end: skyDate(2_023, 7, 2),
	guide: PassageGuide,
	spirits: [OddballOutcast, TumblingTroublemaker, MelancholyMope, OveractiveOverachiever],
	seasonalCandlesRotation: null,
});
