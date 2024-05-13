import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import BearhugHermit from "./BearhugHermit.js";
import DancingPerformer from "./DancingPerformer.js";
import DreamsGuide from "./DreamsGuide.js";
import PeekingPostman from "./PeekingPostman.js";
import SpinningMentor from "./SpinningMentor.js";

export default new Season({
	name: SeasonName.Dreams,
	start: skyDate(2_021, 1, 4),
	end: skyDate(2_021, 3, 15),
	guide: DreamsGuide,
	spirits: [SpinningMentor, DancingPerformer, PeekingPostman, BearhugHermit],
	seasonalCandlesRotation: null,
});
