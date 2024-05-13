import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import AsceticMonk from "./AsceticMonk.js";
import JollyGeologist from "./JollyGeologist.js";
import MomentsGuide from "./MomentsGuide.js";
import NightbirdWhisperer from "./NightbirdWhisperer.js";
import ReassuringRanger from "./ReassuringRanger.js";

export default new Season({
	name: SeasonName.Moments,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 10, 1),
	guide: MomentsGuide,
	spirits: [ReassuringRanger, NightbirdWhisperer, JollyGeologist, AsceticMonk],
	seasonalCandlesRotation: null,
});
