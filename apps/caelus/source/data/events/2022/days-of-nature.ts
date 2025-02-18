import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, NECKLACE_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfNature2022,
	start: skyDate(2_022, 4, 18),
	end: skyDate(2_022, 5, 2),
	offer: [
		{
			name: "Nature Coral Crown",
			cosmetic: Cosmetic.NatureCoralCrown,
			cost: { hearts: 20 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory19,
		},
		{
			name: "Nature Turtle Cape",
			cosmetic: Cosmetic.NatureTurtleCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape81,
		},
		{
			name: "Nature Turtle Pack",
			cosmetic: Cosmetic.NatureShoulderTurtle,
			cost: { money: 19.99 },
			emoji: NECKLACE_EMOJIS.Necklace20,
		},
	],
	patchNotesURL: String(new URL("p0170", LINK_REDIRECTOR_URL)),
});
