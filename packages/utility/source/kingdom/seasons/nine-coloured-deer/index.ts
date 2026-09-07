import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import FeudalLord from "./feudal-lord.js";
import HerbGatherer from "./herb-gatherer.js";
import Hunter from "./hunter.js";
import Princess from "./princess.js";
import SpiritOfMural from "./spirit-of-mural.js";

export default new Season({
	id: SeasonId.NineColouredDeer,
	start: skyDate(2_024, 1, 15),
	end: skyDate(2_024, 4, 1),
	guide: SpiritOfMural,
	spirits: [HerbGatherer, Hunter, FeudalLord, Princess],
	items: [
		{
			cosmetic: Cosmetic.GiftOfTheNineColouredDeer,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.RadianceOfTheNineColouredDeer,
			cost: { money: 19.99 },
		},
	],
	seasonalCandlesRotation: [
		{ rotation: "1", realm: RealmName.HiddenForest },
		{ rotation: "1", realm: RealmName.ValleyOfTriumph },
		{ rotation: "1", realm: RealmName.GoldenWasteland },
		{ rotation: "1", realm: RealmName.VaultOfKnowledge },
		{ rotation: "1", realm: RealmName.DaylightPrairie },
		{ rotation: "2", realm: RealmName.HiddenForest },
		{ rotation: "2", realm: RealmName.ValleyOfTriumph },
		{ rotation: "2", realm: RealmName.GoldenWasteland },
		{ rotation: "2", realm: RealmName.VaultOfKnowledge },
		{ rotation: "2", realm: RealmName.DaylightPrairie },
	],
	doubleSeasonalLight: [{ start: skyDate(2024, 3, 11), end: skyDate(2024, 3, 18) }],
});
