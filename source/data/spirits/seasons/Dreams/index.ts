import { Season } from "../../../../Structures/Season.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import { NECKLACE_EMOJIS } from "../../../../utility/emojis.js";
import BearhugHermit from "./BearhugHermit.js";
import DancingPerformer from "./DancingPerformer.js";
import DreamsGuide from "./DreamsGuide.js";
import PeekingPostman from "./PeekingPostman.js";
import SpinningMentor from "./SpinningMentor.js";

export default new Season({
	id: SeasonId.Dreams,
	start: skyDate(2_021, 1, 4),
	end: skyDate(2_021, 3, 15),
	guide: DreamsGuide,
	spirits: [SpinningMentor, DancingPerformer, PeekingPostman, BearhugHermit],
	items: [{ name: "Pendant", cosmetic: Cosmetic.DreamsPendant, emoji: NECKLACE_EMOJIS.Necklace10 }],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/745",
});
