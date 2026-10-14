import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import anglersLantern from "./anglers-lantern.js";
import cuddlyRollingChild from "./cuddly-rolling-child.js";
import oldAngler from "./old-angler.js";
import showyMerchant from "./showy-merchant.js";
import wrestlingSailor from "./wrestling-sailor.js";

export default new Season({
	id: SeasonId.Pearl,
	start: skyDate(2026, 10, 16),
	end: skyDate(2027, 1, 1),
	guide: anglersLantern,
	spirits: [cuddlyRollingChild, oldAngler, showyMerchant, wrestlingSailor],
});
