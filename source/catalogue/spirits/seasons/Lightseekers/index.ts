import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { HELD_PROPS_EMOJIS, NECKLACE_EMOJIS } from "../../../../Utility/emojis.js";
import CrabWhisperer from "./CrabWhisperer.js";
import DoublefiveLightCatcher from "./DoublefiveLightCatcher.js";
import LaidbackPioneer from "./LaidbackPioneer.js";
import LightseekerGuide from "./LightseekerGuide.js";
import PiggybackLightseeker from "./PiggybackLightseeker.js";
import ShushingLightScholar from "./ShushingLightScholar.js";
import TwirlingChampion from "./TwirlingChampion.js";

export default new Season({
	name: SeasonName.Lightseekers,
	start: skyDate(2_019, 9, 23),
	end: skyDate(2_019, 11, 10),
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
		{ name: "Pendant", bit: 1 << 0, emoji: NECKLACE_EMOJIS.Necklace02 },
		{ name: "Ultimate prop", bit: 1 << 1, emoji: HELD_PROPS_EMOJIS.HeldProp12 },
	],
	seasonalCandlesRotation: null,
});
