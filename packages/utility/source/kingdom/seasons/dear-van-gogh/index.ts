import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import VanGoghGuide from "./dear-van-gogh-guide.js";

export default new Season({
	id: SeasonId.DearVanGogh,
	start: skyDate(2026, 7, 17),
	end: skyDate(2026, 10, 2),
	guide: VanGoghGuide,
	spirits: [],
});
