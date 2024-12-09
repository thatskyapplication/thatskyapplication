import { URL } from "node:url";
import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import AncientDarkness from "./ancient-darkness.js";
import AncientLight from "./ancient-light.js";
import TheVoidOfShattering from "./the-void-of-shattering.js";

export default new Season({
	id: SeasonId.Shattering,
	start: skyDate(2_022, 7, 11),
	end: skyDate(2_022, 9, 27),
	guide: TheVoidOfShattering,
	spirits: [...AncientLight, ...AncientDarkness],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("p0180", LINK_REDIRECTOR_URL)),
});
