import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_024, 7, 12, 17), end = skyDate(2_024, 7, 27);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 4 });
}

export default new Event({
	id: EventId.SkyFest2024,
	start: skyDate(2_024, 7, 12, 17),
	end: skyDate(2_024, 7, 27),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "SkyFest Star Jar",
			cosmetic: Cosmetic.SkyFestStarJar,
			cost: { eventTickets: 15 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp70,
		},
		{
			name: "SkyFest 5th Anniversary T-shirt",
			cosmetic: Cosmetic.SkyFest5thAnniversaryTShirt,
			cost: { eventTickets: 10 },
			emoji: OUTFIT_EMOJIS.Outfit59,
		},
		{
			name: "SkyFest 5th Anniversary Headband",
			cosmetic: Cosmetic.SkyFest5thAnniversaryHeadband,
			cost: { eventTickets: 3 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory42,
		},
		{
			name: "SkyFest Jenova Fan",
			cosmetic: Cosmetic.SkyFestJenovaFan,
			cost: { eventTickets: 7 },
			emoji: HELD_PROPS_EMOJIS.HeldProp43,
		},
		{
			name: "SkyFest Oreo Headband",
			cosmetic: Cosmetic.SkyFestOreoHeadband,
			cost: { money: 4.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory43,
		},
		{
			name: "SkyFest Wireframe Cape",
			cosmetic: Cosmetic.SkyFestWireframeCape,
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape132,
		},
	],
	patchNotesURL: String(new URL("p0260", LINK_REDIRECTOR_URL)),
});
