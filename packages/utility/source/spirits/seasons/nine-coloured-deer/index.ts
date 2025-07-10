import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import FeudalLord from "./feudal-lord.js";
import HerbGatherer from "./herb-gatherer.js";
import Hunter from "./hunter.js";
import Princess from "./princess.js";
import SpiritOfMural from "./spirit-of-mural.js";

export default new Season({
	id: SeasonId.NineColouredDeer,
	start: skyDate(2_024, 1, 15),
	end: skyDate(2_024, 4, 1),
	guide: SpiritOfMural,
	spirits: [HerbGatherer, Hunter, FeudalLord, Princess],
	items: [
		{
			cosmetic: Cosmetic.GiftOfTheNineColouredDeer,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.RadianceOfTheNineColouredDeer,
			cost: { money: 19.99 },
		},
	],
	seasonalCandlesRotation: [
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
	],
	patchNotesURL: String(new URL("p0240", LINK_REDIRECTOR_URL)),
});
