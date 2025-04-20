import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import blueBirdGuide from "./blue-bird-guide.js";

export default new Season({
	id: SeasonId.BlueBird,
	start: skyDate(2_025, 4, 21),
	end: skyDate(2_025, 7, 7),
	guide: blueBirdGuide,
	spirits: [],
});
