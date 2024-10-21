import { GuideSpirit } from "../../../../models/Spirits.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.GratitudeGuide,
	seasonId: SeasonId.Gratitude,
});
