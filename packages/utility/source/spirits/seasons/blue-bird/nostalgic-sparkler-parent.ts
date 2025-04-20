import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NostalgicSparklerParent,
	seasonId: SeasonId.BlueBird,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [],
	},
});
