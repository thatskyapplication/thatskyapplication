import { GuideSpirit } from "../../../../models/Spirits.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RadianceGuide,
	seasonId: SeasonId.Radiance,
	offer: {
		inProgress: true,
		hasInfographic: false,
	},
});
