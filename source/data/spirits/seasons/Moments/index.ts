import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import AsceticMonk from "./AsceticMonk.js";
import JollyGeologist from "./JollyGeologist.js";
import MomentsGuide from "./MomentsGuide.js";
import NightbirdWhisperer from "./NightbirdWhisperer.js";
import ReassuringRanger from "./ReassuringRanger.js";

export default new Season({
	id: SeasonId.Moments,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 10, 2),
	guide: MomentsGuide,
	spirits: [ReassuringRanger, NightbirdWhisperer, JollyGeologist, AsceticMonk],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1124",
});
