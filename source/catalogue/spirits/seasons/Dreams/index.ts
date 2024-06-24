import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { NECKLACE_EMOJIS } from "../../../../Utility/emojis.js";
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
	items: [{ name: "Pendant", bit: 1 << 0, emoji: NECKLACE_EMOJIS.Necklace10 }],
	seasonalCandlesRotation: null,
});
