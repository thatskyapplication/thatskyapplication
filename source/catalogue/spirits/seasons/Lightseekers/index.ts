import { Collection } from "discord.js";
import { Season } from "../../../../Structures/Season.js";
import { type ItemRaw, SeasonName } from "../../../../Utility/catalogue.js";
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
	items: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace02 })
		.set(1 << 1, { name: "Ultimate prop", cost: null, emoji: HELD_PROPS_EMOJIS.HeldProp12 }),
	seasonalCandlesRotation: null,
});
