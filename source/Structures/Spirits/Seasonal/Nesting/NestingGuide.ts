import { SeasonName } from "../../../Season.js";
import { SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.NestingGuide,
	season: SeasonName.Nesting,
	offer: {
		inProgress: true,
		hasInfographic: false,
	},
});
