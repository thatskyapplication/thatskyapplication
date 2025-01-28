import { URL } from "node:url";
import { Cosmetic, SeasonId } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import { CAPE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../../utility/emojis.js";
import BeckoningRuler from "./beckoning-ruler.js";
import GloatingNarcissist from "./gloating-narcissist.js";
import SlouchingSoldier from "./slouching-soldier.js";
import SneezingGeographer from "./sneezing-geographer.js";
import StarCollector from "./star-collector.js";
import StretchingLamplighter from "./stretching-lamplighter.js";
import TheRose from "./the-rose.js";

export default new Season({
	id: SeasonId.LittlePrince,
	start: skyDate(2_021, 7, 6),
	end: skyDate(2_021, 9, 20),
	guide: TheRose,
	spirits: [
		BeckoningRuler,
		GloatingNarcissist,
		StretchingLamplighter,
		SlouchingSoldier,
		SneezingGeographer,
		StarCollector,
	],
	items: [
		{
			name: "Little Prince Scarf",
			cosmetic: Cosmetic.LittlePrinceScarf,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape63,
		},
		{
			name: "Little Prince Fox",
			cosmetic: Cosmetic.LittlePrinceFox,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp06,
		},
		{
			name: "Little Prince Asteroid Jacket",
			cosmetic: Cosmetic.LittlePrinceAsteroidJacket,
			cost: { money: 24.99 },
			emoji: CAPE_EMOJIS.Cape64,
		},
	],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("p0140", LINK_REDIRECTOR_URL)),
});
