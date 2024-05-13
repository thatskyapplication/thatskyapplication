import { Season } from "../../../Structures/Season.js";
import { skyDate } from "../../../Utility/dates.js";
import { SeasonName } from "../../../Utility/seasons.js";
import AURORA from "./AURORA.js";
import MindfulMiner from "./MindfulMiner.js";
import RunningWayfarer from "./RunningWayfarer.js";
import SeedOfHope from "./SeedOfHope.js";
import WarriorOfLove from "./WarriorOfLove.js";

export default new Season({
	name: SeasonName.Aurora,
	start: skyDate(2_022, 10, 17),
	end: skyDate(2_023, 1, 2),
	guide: AURORA,
	spirits: [RunningWayfarer, MindfulMiner, WarriorOfLove, SeedOfHope],
	seasonalCandlesRotation: null,
});
