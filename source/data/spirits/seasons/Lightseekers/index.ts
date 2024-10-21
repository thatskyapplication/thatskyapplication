import { Season } from "../../../../Structures/Season.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import { HELD_PROPS_EMOJIS, NECKLACE_EMOJIS } from "../../../../Utility2/emojis.js";
import CrabWhisperer from "./CrabWhisperer.js";
import DoublefiveLightCatcher from "./DoublefiveLightCatcher.js";
import LaidbackPioneer from "./LaidbackPioneer.js";
import LightseekerGuide from "./LightseekerGuide.js";
import PiggybackLightseeker from "./PiggybackLightseeker.js";
import ShushingLightScholar from "./ShushingLightScholar.js";
import TwirlingChampion from "./TwirlingChampion.js";

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
