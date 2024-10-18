import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import ComfortOfKindness from "./ComfortOfKindness.js";
import InspirationOfInclusion from "./InspirationOfInclusion.js";
import SenseOfSelf from "./SenseOfSelf.js";
import SpiritOfAdventure from "./SpiritOfAdventure.js";
import TheMoominStorybook from "./TheMoominStorybook.js";

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
			emoji: NECKLACE_EMOJIS.Necklace39,
		},
		{
			name: "Pointed Snufkin Hat",
			cosmetic: Cosmetic.PointedSnufkinHat,
			cost: { money: 4.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory47,
		},
		{
			name: "Roving Snufkin Robe Set",
			cosmetic: [Cosmetic.RovingSnufkinRobe, Cosmetic.RovingSnufkinScarf],
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit69,
		},
		{
			name: "Moomintroll Accessory Set",
			cosmetic: [Cosmetic.MoomintrollEars, Cosmetic.MoomintrollTail],
			cost: { money: 11.99 },
			emoji: NECKLACE_EMOJIS.Necklace41,
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
