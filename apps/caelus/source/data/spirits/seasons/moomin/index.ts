import { URL } from "node:url";
import { Cosmetic, RealmName, SeasonId, skyDate } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../utility/emojis.js";
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
		{
			name: "Moominmamma's Masterpiece",
			cosmetic: Cosmetic.MoominmammasMasterpiece,
			cost: { money: 24.99 },
			emoji: CAPE_EMOJIS.Cape140,
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
