import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
import BearhugHermit from "./bearhug-hermit.js";
import DancingPerformer from "./dancing-performer.js";
import DreamsGuide from "./dreams-guide.js";
import PeekingPostman from "./peeking-postman.js";
import SpinningMentor from "./spinning-mentor.js";

export default new Season({
	id: SeasonId.Dreams,
	start: skyDate(2_021, 1, 4),
	end: skyDate(2_021, 3, 15),
	guide: DreamsGuide,
	spirits: [SpinningMentor, DancingPerformer, PeekingPostman, BearhugHermit],
	items: [{ cosmetic: Cosmetic.DreamsPendant }],
	seasonalCandlesRotation: null,
	patchNotesURL: patchNotesRoute("0120"),
});
