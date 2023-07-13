import { Realm, Season } from "../../../../Utility/Constants.js";
import { SeasonalSpirit, SpiritName } from "../../Base.js";

// TODO: Add expression, call, or stance.
const expression = undefined;

export default new SeasonalSpirit({
	name: SpiritName.NightbirdWhisperer,
	season: Season.Moments,
	expression,
	realm: Realm.DaylightPrairie,
	hasInfographic: false,
	// TODO: Add offer.
});
