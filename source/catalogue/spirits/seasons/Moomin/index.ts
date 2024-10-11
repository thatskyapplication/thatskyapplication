import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import TheMoominStorybook from "./TheMoominStorybook.js";

export default new Season({
	name: SeasonName.Moomin,
	start: skyDate(2_024, 10, 14),
	end: skyDate(2_024, 12, 30),
	guide: TheMoominStorybook,
	spirits: [],
	items: [
		{
			name: "Hattifattener Shoulder Buddy",
			cosmetic: Cosmetic.HattifattenerShoulderBuddy,
			cost: { money: 2.99 },
		},
		{
			name: "Pointed Snufkin Hat",
			cosmetic: Cosmetic.HattifattenerShoulderBuddy,
			cost: { money: 4.99 },
		},
		{
			name: "Roving Snufkin Robe Set",
			cosmetic: [Cosmetic.HattifattenerShoulderBuddy],
			cost: { money: 9.99 },
		},
		{
			name: "Moomintroll Accessory Set",
			cosmetic: [Cosmetic.HattifattenerShoulderBuddy],
			cost: { money: 11.99 },
		},
	],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
	],
	patchNotesURL:
		"https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1356",
});
