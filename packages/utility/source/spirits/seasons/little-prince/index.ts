import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
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
			cosmetic: Cosmetic.LittlePrinceScarf,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.LittlePrinceFox,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.LittlePrinceAsteroidJacket,
			cost: { money: 24.99 },
		},
	],
	seasonalCandlesRotation: null,
	patchNotesURL: patchNotesRoute("p0140"),
});
