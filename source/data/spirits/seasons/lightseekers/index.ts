import { Season } from "../../../../models/Season.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import { HELD_PROPS_EMOJIS, NECKLACE_EMOJIS } from "../../../../utility/emojis.js";
import CrabWhisperer from "./crab-whisperer.js";
import DoublefiveLightCatcher from "./doublefive-light-catcher.js";
import LaidbackPioneer from "./laidback-pioneer.js";
import LightseekerGuide from "./lightseeker-guide.js";
import PiggybackLightseeker from "./piggyback-lightseeker.js";
import ShushingLightScholar from "./shushing-light-scholar.js";
import TwirlingChampion from "./twirling-champion.js";

export default new Season({
	id: SeasonId.Lightseekers,
	start: skyDate(2_019, 9, 23, 12),
	end: skyDate(2_019, 11, 11, 12),
	guide: LightseekerGuide,
	spirits: [
		PiggybackLightseeker,
		DoublefiveLightCatcher,
		LaidbackPioneer,
		TwirlingChampion,
		CrabWhisperer,
		ShushingLightScholar,
	],
	items: [
		{ name: "Pendant", cosmetic: Cosmetic.LightseekerPendant, emoji: NECKLACE_EMOJIS.Necklace02 },
		{
			name: "Ultimate prop",
			cosmetic: Cosmetic.LightseekerUltimateProp,
			emoji: HELD_PROPS_EMOJIS.HeldProp12,
		},
	],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.6.0",
});
