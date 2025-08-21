import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
import ProphecyGuide from "./prophecy-guide.js";
import ProphetOfAir from "./prophet-of-air.js";
import ProphetOfEarth from "./prophet-of-earth.js";
import ProphetOfFire from "./prophet-of-fire.js";
import ProphetOfWater from "./prophet-of-water.js";

export default new Season({
	id: SeasonId.Prophecy,
	start: skyDate(2_020, 10, 5),
	end: skyDate(2_020, 12, 14),
	guide: ProphecyGuide,
	spirits: [ProphetOfWater, ProphetOfEarth, ProphetOfAir, ProphetOfFire],
	seasonalCandlesRotation: null,
	patchNotesURL: patchNotesRoute("p0110"),
});
