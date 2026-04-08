import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
import AURORA from "./aurora.js";
import MindfulMiner from "./mindful-miner.js";
import RunningWayfarer from "./running-wayfarer.js";
import SeedOfHope from "./seed-of-hope.js";
import WarriorOfLove from "./warrior-of-love.js";

export default new Season({
	id: SeasonId.AURORA,
	start: skyDate(2_022, 10, 17),
	end: skyDate(2_023, 1, 2, 2),
	guide: AURORA,
	spirits: [RunningWayfarer, MindfulMiner, WarriorOfLove, SeedOfHope],
	items: [
		{
			cosmetic: Cosmetic.RunawayHairstyle,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.TiaraWeCanTouch,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.VoiceOfAURORA,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.RunawayOutfit,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.ToTheLoveOutfit,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.GivingInCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.WingsOfAURORA,
			cost: { money: 24.99 },
		},
	],
	seasonalCandlesRotation: null,
	patchNotesURL: patchNotesRoute("0190"),
});
