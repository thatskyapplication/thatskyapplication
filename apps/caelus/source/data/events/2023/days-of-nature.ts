import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfNature2023,
	start: skyDate(2_023, 4, 20),
	end: skyDate(2_023, 5, 8),
	offer: [
		{
			name: "Nature School Cape",
			cosmetic: Cosmetic.NatureSchoolCape,
			cost: { candles: 180 },
			emoji: CAPE_EMOJIS.Cape105,
		},
		{
			name: "Nature Glasses Pack",
			cosmetic: Cosmetic.NatureGlasses,
			cost: { money: 19.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory25,
		},
		{
			name: "Nature Sonorous Seashell",
			cosmetic: Cosmetic.NatureSonorousSeashell,
			cost: { money: 4.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp27,
		},
	],
	patchNotesURL: String(new URL("p0210", LINK_REDIRECTOR_URL)),
});
