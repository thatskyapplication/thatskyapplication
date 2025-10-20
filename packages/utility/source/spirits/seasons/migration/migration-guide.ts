import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
		hasInfographic: false,
		current: [
			[
				{
					translation: { key: CosmeticCommon.Quest },
					cosmetic: Cosmetic.MigrationGuideQuest1,
				},
				null,
				{
					cosmetic: Cosmetic.MigrationPendant,
					seasonPass: true,
				},
			],
		],
	},
});
