import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { HAIR_ACCESSORY_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfLove2022,
	start: skyDate(2_022, 2, 7),
	end: skyDate(2_022, 2, 23),
	offer: [
		{
			name: "Days of Love Flower Crown",
			cosmetic: Cosmetic.DaysOfLoveFlowerCrown,
			cost: { hearts: 15 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory17,
		},
		{
			name: "Days of Love Gondola Pack",
			cosmetic: Cosmetic.DaysOfLoveGondola,
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp14,
		},
	],
	patchNotesURL: String(new URL("p0160", LINK_REDIRECTOR_URL)),
});
