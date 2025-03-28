import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
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
			name: "Hattifattener Shoulder Buddy",
			cosmetic: Cosmetic.HattifattenerShoulderBuddy,
			cost: { money: 2.99 },
		},
		{
			name: "Pointed Snufkin Hat",
			cosmetic: Cosmetic.PointedSnufkinHat,
			cost: { money: 4.99 },
		},
		{
			name: "Roving Snufkin Robe Set",
			cosmetic: [Cosmetic.RovingSnufkinRobe, Cosmetic.RovingSnufkinScarf],
			cosmeticDisplay: Cosmetic.RovingSnufkinRobe,
			cost: { money: 9.99 },
		},
		{
			name: "Moomintroll Accessory Set",
			cosmetic: [Cosmetic.MoomintrollEars, Cosmetic.MoomintrollTail],
			cosmeticDisplay: Cosmetic.MoomintrollTail,
			cost: { money: 11.99 },
		},
		{
			name: "Moominmamma's Masterpiece",
			cosmetic: Cosmetic.MoominmammasMasterpiece,
			cost: { money: 24.99 },
		},
	],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 1, realm: RealmName.GoldenWasteland },
	],
	patchNotesURL: String(new URL("p0270", LINK_REDIRECTOR_URL)),
});
