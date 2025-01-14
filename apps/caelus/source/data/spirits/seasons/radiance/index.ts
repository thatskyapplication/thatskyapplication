import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import RadianceGuide from "./radiance-guide.js";

export default new Season({
	id: SeasonId.Remembrance,
	start: skyDate(2_025, 1, 20),
	end: skyDate(2_025, 4, 7),
	guide: RadianceGuide,
	spirits: [],
	seasonalCandlesRotation: null,
});
