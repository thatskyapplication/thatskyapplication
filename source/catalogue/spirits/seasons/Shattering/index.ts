import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import AncientDarkness from "./AncientDarkness.js";
import AncientLight from "./AncientLight.js";
import TheVoidOfShattering from "./TheVoidOfShattering.js";

export default new Season({
	name: SeasonName.Shattering,
	start: skyDate(2_022, 7, 11),
	end: skyDate(2_022, 9, 26),
	guide: TheVoidOfShattering,
	spirits: [...AncientLight, ...AncientDarkness],
	seasonalCandlesRotation: null,
});
