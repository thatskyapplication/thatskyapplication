import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.WrestlingSailor,
	seasonId: SeasonId.Pearl,
	area: AreaName.PearlVillage,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [],
	},
});
