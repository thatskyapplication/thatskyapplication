import { URL } from "node:url";
import { Cosmetic, SeasonId, skyDate } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { NECKLACE_EMOJIS } from "../../../../utility/emojis.js";
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
	items: [{ name: "Pendant", cosmetic: Cosmetic.DreamsPendant, emoji: NECKLACE_EMOJIS.Necklace10 }],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("p0120", LINK_REDIRECTOR_URL)),
});
