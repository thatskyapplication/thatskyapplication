import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import ComfortOfKindness from "./comfort-of-kindness.js";
import InspirationOfInclusion from "./inspiration-of-inclusion.js";
import SenseOfSelf from "./sense-of-self.js";
import SpiritOfAdventure from "./spirit-of-adventure.js";
import TheMoominStorybook from "./the-moomin-storybook.js";

export default new Season({
	id: SeasonId.Moomin,
	start: skyDate(2_024, 10, 14),
	end: skyDate(2_024, 12, 30),
	guide: TheMoominStorybook,
	spirits: [ComfortOfKindness, SenseOfSelf, SpiritOfAdventure, InspirationOfInclusion],
	items: [
		{
			cosmetic: Cosmetic.HattifattenerShoulderBuddy,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.PointedSnufkinHat,
			cost: { money: 4.99 },
		},
		{
			cosmetic: [Cosmetic.RovingSnufkinRobe, Cosmetic.RovingSnufkinScarf],
			cosmeticDisplay: Cosmetic.RovingSnufkinRobe,
			cost: { money: 9.99 },
		},
		{
			cosmetic: [Cosmetic.MoomintrollEars, Cosmetic.MoomintrollTail],
			cosmeticDisplay: Cosmetic.MoomintrollTail,
			cost: { money: 11.99 },
		},
		{
			cosmetic: Cosmetic.MoominmammasMasterpiece,
			cost: { money: 24.99 },
		},
	],
	seasonalCandlesRotation: [
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
	],
	patchNotesURL: String(new URL("p0270", LINK_REDIRECTOR_URL)),
});
