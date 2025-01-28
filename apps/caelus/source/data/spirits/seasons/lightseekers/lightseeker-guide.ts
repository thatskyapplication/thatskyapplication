import { SeasonId } from "@thatskyapplication/utility";
import { GuideSpirit } from "../../../../models/Spirits.js";
import { SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.LightseekerGuide,
	seasonId: SeasonId.Lightseekers,
});
