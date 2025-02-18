import { URL } from "node:url";
import { SeasonId, skyDate } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import AsceticMonk from "./ascetic-monk.js";
import JollyGeologist from "./jolly-geologist.js";
import MomentsGuide from "./moments-guide.js";
import NightbirdWhisperer from "./nightbird-whisperer.js";
import ReassuringRanger from "./reassuring-ranger.js";

export default new Season({
	id: SeasonId.Moments,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 10, 2),
	guide: MomentsGuide,
	spirits: [ReassuringRanger, NightbirdWhisperer, JollyGeologist, AsceticMonk],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("p0220", LINK_REDIRECTOR_URL)),
});
