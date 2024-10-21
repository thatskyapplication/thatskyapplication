import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS } from "../../../../Utility2/emojis.js";
import FeudalLord from "./FeudalLord.js";
import HerbGatherer from "./HerbGatherer.js";
import Hunter from "./Hunter.js";
import Princess from "./Princess.js";
import SpiritOfMural from "./SpiritOfMural.js";

export default new Season({
	id: SeasonId.NineColouredDeer,
	start: skyDate(2_024, 1, 15),
	end: skyDate(2_024, 4, 1),
	guide: SpiritOfMural,
	spirits: [HerbGatherer, Hunter, FeudalLord, Princess],
	items: [
		{
			name: "Gift of the Nine-Coloured Deer",
			cosmetic: Cosmetic.GiftOfTheNineColouredDeer,
			cost: { money: 14.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory34,
		},
		{
			name: "Radiance of the Nine-Coloured Deer",
			cosmetic: Cosmetic.RadianceOfTheNineColouredDeer,
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape125,
		},
	],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1264",
});
