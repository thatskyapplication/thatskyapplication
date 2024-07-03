import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import DuetsGuide from "./DuetsGuide.js";

export default new Season({
	name: SeasonName.Duets,
	start: skyDate(2_024, 7, 15),
	end: skyDate(2_024, 9, 29),
	guide: DuetsGuide,
	spirits: [],
	seasonalCandlesRotation: null,
});
