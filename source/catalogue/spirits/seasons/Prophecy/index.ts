import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import ProphecyGuide from "./ProphecyGuide.js";
import ProphetOfAir from "./ProphetOfAir.js";
import ProphetOfEarth from "./ProphetOfEarth.js";
import ProphetOfFire from "./ProphetOfFire.js";
import ProphetOfWater from "./ProphetOfWater.js";

export default new Season({
	name: SeasonName.Prophecy,
	start: skyDate(2_020, 10, 5),
	end: skyDate(2_020, 12, 13),
	guide: ProphecyGuide,
	spirits: [ProphetOfWater, ProphetOfEarth, ProphetOfAir, ProphetOfFire],
	seasonalCandlesRotation: null,
});
