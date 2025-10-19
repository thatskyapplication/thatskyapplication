import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.MigratingButterflyCharmer,
	seasonId: SeasonId.Migration,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [],
	},
});
