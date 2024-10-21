import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import ProphecyGuide from "./ProphecyGuide.js";
import ProphetOfAir from "./ProphetOfAir.js";
import ProphetOfEarth from "./ProphetOfEarth.js";
import ProphetOfFire from "./ProphetOfFire.js";
import ProphetOfWater from "./ProphetOfWater.js";

export default new Season({
	id: SeasonId.Prophecy,
	start: skyDate(2_020, 10, 5),
	end: skyDate(2_020, 12, 14),
	guide: ProphecyGuide,
	spirits: [ProphetOfWater, ProphetOfEarth, ProphetOfAir, ProphetOfFire],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/718",
});
