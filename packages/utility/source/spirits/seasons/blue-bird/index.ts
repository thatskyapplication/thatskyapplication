import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import blueBirdGuide from "./blue-bird-guide.js";
import costumedConfettiCousin from "./costumed-confetti-cousin.js";
import diviningWiseGrandparent from "./divining-wise-grandparent.js";
import nostalgicSparklerParent from "./nostalgic-sparkler-parent.js";
import royalHairtousleTeen from "./royal-hairtousle-teen.js";
import woodcuttingPleafulParent from "./woodcutting-pleaful-parent.js";

export default new Season({
	id: SeasonId.BlueBird,
	start: skyDate(2_025, 4, 21),
	end: skyDate(2_025, 7, 7),
	guide: blueBirdGuide,
	spirits: [
		costumedConfettiCousin,
		diviningWiseGrandparent,
		woodcuttingPleafulParent,
		nostalgicSparklerParent,
		royalHairtousleTeen,
	],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
	],
	patchNotesURL: String(new URL("p0290", LINK_REDIRECTOR_URL)),
});
