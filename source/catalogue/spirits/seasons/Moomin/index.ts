import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import TheMoominStorybook from "./TheMoominStorybook.js";

export default new Season({
	name: SeasonName.Moomin,
	start: skyDate(2_024, 10, 14),
	end: skyDate(2_024, 12, 30),
	guide: TheMoominStorybook,
	spirits: [],
	seasonalCandlesRotation: null,
});
