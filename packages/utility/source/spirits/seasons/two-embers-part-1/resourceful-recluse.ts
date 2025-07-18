import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ResourcefulRecluse,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		hasInfographicSeasonal: false,
		hasInfographic: false,
		seasonal: [],
	},
});
