import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.SkyAnniversary2023,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 7, 31),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory4,
			cost: { eventCurrency: 8 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory28,
		},
		{
			name: "Anniversary Sonorous Seashell",
			cosmetic: Cosmetic.AnniversarySonorousSeashell,
			cost: { eventCurrency: 46 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp29,
		},
		{
			name: "Anniversary Party Lights",
			cosmetic: Cosmetic.AnniversaryPartyLights,
			cost: { eventCurrency: 46 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp33,
		},
		{
			name: "Anniversary Plush",
			cosmetic: Cosmetic.AnniversaryPlush,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp30,
		},
	],
	patchNotesURL: String(new URL("p0220", LINK_REDIRECTOR_URL)),
});
