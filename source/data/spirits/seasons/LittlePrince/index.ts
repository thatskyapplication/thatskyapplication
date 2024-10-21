import { Season } from "../../../../Structures/Season.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import { CAPE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../../Utility2/emojis.js";
import BeckoningRuler from "./BeckoningRuler.js";
import GloatingNarcissist from "./GloatingNarcissist.js";
import SlouchingSoldier from "./SlouchingSoldier.js";
import SneezingGeographer from "./SneezingGeographer.js";
import StarCollector from "./StarCollector.js";
import StretchingLamplighter from "./StretchingLamplighter.js";
import TheRose from "./TheRose.js";

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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/809",
});
