import { RealmName, Season, SeasonId, skyDate } from "@thatskyapplication/utility";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import RadianceGreetingShaman from "./radiance-greeting-shaman.js";
import RadianceGuide from "./radiance-guide.js";
import RadianceLeapingDancer from "./radiance-leaping-dancer.js";
import RadianceProvokingPerformer from "./radiance-provoking-performer.js";

export default new Season({
	id: SeasonId.Radiance,
	start: skyDate(2_025, 1, 20),
	end: skyDate(2_025, 4, 7),
	guide: RadianceGuide,
	spirits: [RadianceLeapingDancer, RadianceProvokingPerformer, RadianceGreetingShaman],
	seasonalCandlesRotation: (now) =>
		now >= skyDate(2_025, 3, 3)
			? [
					{ rotation: 2, realm: RealmName.ValleyOfTriumph },
					{ rotation: 2, realm: RealmName.GoldenWasteland },
					{ rotation: 2, realm: RealmName.VaultOfKnowledge },
					{ rotation: 1, realm: RealmName.DaylightPrairie },
					{ rotation: 1, realm: RealmName.HiddenForest },
					{ rotation: 1, realm: RealmName.ValleyOfTriumph },
					{ rotation: 1, realm: RealmName.GoldenWasteland },
					{ rotation: 1, realm: RealmName.VaultOfKnowledge },
					{ rotation: 2, realm: RealmName.DaylightPrairie },
					{ rotation: 2, realm: RealmName.HiddenForest },
				]
			: now >= skyDate(2_025, 2, 4)
				? [
						{ rotation: 2, realm: RealmName.ValleyOfTriumph },
						{ rotation: 2, realm: RealmName.GoldenWasteland },
						{ rotation: 1, realm: RealmName.VaultOfKnowledge },
						{ rotation: 1, realm: RealmName.DaylightPrairie },
						{ rotation: 1, realm: RealmName.HiddenForest },
						{ rotation: 1, realm: RealmName.ValleyOfTriumph },
						{ rotation: 1, realm: RealmName.GoldenWasteland },
						{ rotation: 2, realm: RealmName.VaultOfKnowledge },
						{ rotation: 2, realm: RealmName.DaylightPrairie },
						{ rotation: 2, realm: RealmName.HiddenForest },
					]
				: [
						{ rotation: 1, realm: RealmName.ValleyOfTriumph },
						{ rotation: 1, realm: RealmName.GoldenWasteland },
						{ rotation: 1, realm: RealmName.VaultOfKnowledge },
						{ rotation: 1, realm: RealmName.DaylightPrairie },
						{ rotation: 1, realm: RealmName.HiddenForest },
						{ rotation: 2, realm: RealmName.ValleyOfTriumph },
						{ rotation: 2, realm: RealmName.GoldenWasteland },
						{ rotation: 2, realm: RealmName.VaultOfKnowledge },
						{ rotation: 2, realm: RealmName.DaylightPrairie },
						{ rotation: 2, realm: RealmName.HiddenForest },
					],
	doubleSeasonalLightEventStartDate: skyDate(2_025, 3, 17),
	doubleSeasonalLightEventEndDate: skyDate(2_025, 3, 24),
	patchNotesURL: String(new URL("p0280", LINK_REDIRECTOR_URL)),
});
