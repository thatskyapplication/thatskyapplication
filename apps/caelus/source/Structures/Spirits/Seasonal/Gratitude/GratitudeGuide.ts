import { Season } from "../../../../Utility/Constants.js";
import { SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.GratitudeGuide,
	season: Season.Gratitude,
	offer: {
		hasInfographic: false,
	},
});
