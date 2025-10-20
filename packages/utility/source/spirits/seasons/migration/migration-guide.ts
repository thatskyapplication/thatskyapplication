import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.MigrationGuide,
	seasonId: SeasonId.Migration,
	realm: RealmName.IslesOfDawn,
	offer: {
		inProgress: true,
	},
});
