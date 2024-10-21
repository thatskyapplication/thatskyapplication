import { Season } from "../../../../models/Season.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import { skyDate } from "../../../../utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS } from "../../../../utility/emojis.js";
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
