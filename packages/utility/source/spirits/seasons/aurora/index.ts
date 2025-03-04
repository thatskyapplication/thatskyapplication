import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
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
			name: "Runaway Hairstyle",
			cosmetic: Cosmetic.RunawayHairstyle,
			cost: { money: 2.99 },
		},
		{
			name: "Tiara We Can Touch",
			cosmetic: Cosmetic.TiaraWeCanTouch,
			cost: { money: 4.99 },
		},
		{
			name: "Voice of AURORA",
			cosmetic: Cosmetic.VoiceOfAURORA,
			cost: { money: 14.99 },
		},
		{
			name: "Runaway Outfit",
			cosmetic: Cosmetic.RunawayOutfit,
			cost: { money: 9.99 },
		},
		{
			name: "To The Love Outfit",
			cosmetic: Cosmetic.ToTheLoveOutfit,
			cost: { money: 9.99 },
		},
		{
			name: "Giving In Cape",
			cosmetic: Cosmetic.GivingInCape,
			cost: { money: 14.99 },
		},
		{
			name: "Wings of AURORA",
			cosmetic: Cosmetic.WingsOfAURORA,
			cost: { money: 24.99 },
		},
	],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("p0190", LINK_REDIRECTOR_URL)),
});
