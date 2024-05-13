import { Season } from "../../../Structures/Season.js";
import { RealmName } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import { SeasonName } from "../../../Utility/seasons.js";
import FeudalLord from "./FeudalLord.js";
import HerbGatherer from "./HerbGatherer.js";
import Hunter from "./Hunter.js";
import Princess from "./Princess.js";
import SpiritOfMural from "./SpiritOfMural.js";

export default new Season({
	name: SeasonName.NineColoredDeer,
	start: skyDate(2_024, 1, 15),
	end: skyDate(2_024, 3, 31),
	guide: SpiritOfMural,
	spirits: [HerbGatherer, Hunter, FeudalLord, Princess],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
	],
});
