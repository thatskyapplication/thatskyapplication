import { SeasonName } from "../../../Season.js";
import { SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.SpiritOfMural,
	season: SeasonName.NineColoredDeer,
	offer: {
		inProgress: true,
		hasInfographic: false,
	},
});
