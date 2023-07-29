import { Season } from "../../../../Utility/Constants.js";
import { SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.LightseekersGuide,
	season: Season.Lightseekers,
	offer: {
		hasInfographic: false,
	},
});
