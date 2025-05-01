import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
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
		now >= skyDate(2_025, 4, 1)
			? [
					{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
				]
			: now >= skyDate(2_025, 3, 3)
				? [
						{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
						{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
						{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
						{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
						{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
						{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
						{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
						{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
						{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
						{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
					]
				: now >= skyDate(2_025, 2, 4)
					? [
							{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
							{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
							{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
							{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
							{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
							{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
							{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
							{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
							{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
							{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
						]
					: [
							{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
							{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
							{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
							{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
							{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
							{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
							{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
							{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
							{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
							{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
						],
	doubleSeasonalLightEventStartDate: skyDate(2_025, 3, 17),
	doubleSeasonalLightEventEndDate: skyDate(2_025, 3, 24),
	patchNotesURL: String(new URL("p0280", LINK_REDIRECTOR_URL)),
});
