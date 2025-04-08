import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";

export default new Season({
	id: SeasonId.BlueBird,
	start: skyDate(2_025, 4, 21),
	end: skyDate(2_025, 7, 7),
	// @ts-expect-error Not yet added.
	guide: null,
	spirits: [],
});
