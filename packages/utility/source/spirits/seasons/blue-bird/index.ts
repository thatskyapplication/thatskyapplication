import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
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
	seasonalCandlesRotation: (now) =>
		now >= skyDate(2_025, 5, 1)
			? [
					{ rotation: RotationIdentifier.Three, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.Three, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
				]
			: [
					{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
				],
	patchNotesURL: String(new URL("p0290", LINK_REDIRECTOR_URL)),
});
