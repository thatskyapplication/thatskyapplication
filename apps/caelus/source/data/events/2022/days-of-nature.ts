import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfNature2022,
	start: skyDate(2_022, 4, 18),
	end: skyDate(2_022, 5, 2),
	offer: [
		{
			name: "Nature Coral Crown",
			cosmetic: Cosmetic.NatureCoralCrown,
			cost: { hearts: 20 },
		},
		{
			name: "Nature Turtle Cape",
			cosmetic: Cosmetic.NatureTurtleCape,
			cost: { money: 14.99 },
		},
		{
			name: "Nature Turtle Pack",
			cosmetic: Cosmetic.NatureShoulderTurtle,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0170", LINK_REDIRECTOR_URL)),
});
