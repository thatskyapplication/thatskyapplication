import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import migrationGuide from "./migration-guide.js";

export default new Season({
	id: SeasonId.Migration,
	start: skyDate(2_025, 10, 20),
	// Assuming 77 days after since this is not yet announced.
	end: skyDate(2_026, 1, 5),
	guide: migrationGuide,
	spirits: [],
});
