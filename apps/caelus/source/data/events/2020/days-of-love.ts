import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfLove2020,
	start: skyDate(2_020, 2, 12, 12),
	end: skyDate(2_020, 2, 19, 12),
	offer: [
		{
			name: "Days of Love Pack",
			cosmetic: Cosmetic.DaysOfLoveSwing,
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp01,
		},
	],
	patchNotesURL: String(new URL("p082", LINK_REDIRECTOR_URL)),
});
