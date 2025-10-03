import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import migrationGuide from "./migration-guide.js";

export default new Season({
	id: SeasonId.Migration,
	start: skyDate(2_025, 10, 20),
	// @ts-expect-error Not yet announced.
	end: null,
	guide: migrationGuide,
	spirits: [],
});
