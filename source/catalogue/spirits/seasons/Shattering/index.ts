import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import AncientDarkness from "./AncientDarkness.js";
import AncientLight from "./AncientLight.js";
import TheVoidOfShattering from "./TheVoidOfShattering.js";

export default new Season({
	id: SeasonId.Shattering,
	start: skyDate(2_022, 7, 11),
	end: skyDate(2_022, 9, 27),
	guide: TheVoidOfShattering,
	spirits: [...AncientLight, ...AncientDarkness],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/909",
});
