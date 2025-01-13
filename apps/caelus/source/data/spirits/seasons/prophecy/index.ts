import { URL } from "node:url";
import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
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
	patchNotesURL: String(new URL("p0110", LINK_REDIRECTOR_URL)),
});
