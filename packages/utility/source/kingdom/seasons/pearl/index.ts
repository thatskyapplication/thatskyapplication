import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import fishermansLantern from "./fishermans-lantern.js";

export default new Season({
	id: SeasonId.Pearl,
	start: skyDate(2026, 10, 16),
	end: skyDate(2027, 1, 1),
	guide: fishermansLantern,
	spirits: [],
});
