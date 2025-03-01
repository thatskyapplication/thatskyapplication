import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2024, 4, 27), end = skyDate(2024, 5, 18);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL(`events/${EventId.SkyXCinnamorollPopUpCafe2024}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.SkyXCinnamorollPopUpCafe2024,
	start: skyDate(2_024, 4, 27),
	end: skyDate(2_024, 5, 18),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Cosy Teacup Headband",
			cosmetic: Cosmetic.CosyTeacupHeadband,
			cost: { eventTickets: 22 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory41,
		},
		{
			name: "Cosy Cafe Table",
			cosmetic: Cosmetic.CosyCafeTable,
			cost: { eventTickets: 52 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp50,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Combo",
			cosmetic: [
				Cosmetic.CinnamorollPopUpCafeSwirledHair,
				Cosmetic.CinnamorollPopUpCafeCinnamarollEars,
			],
			cost: { money: 14.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory40,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Plushie",
			cosmetic: Cosmetic.CinnamorollPopUpCafePlushie,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp44,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Mini Companion",
			cosmetic: Cosmetic.CinnamorollPopUpCafeMiniCompanion,
			cost: { money: 6.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory39,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Bowtie and Cloud Cape",
			cosmetic: [Cosmetic.CinnamorollPopUpCafeBowtie, Cosmetic.CinnamorollPopUpCafeCloudCape],
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape130,
		},
	],
	patchNotesURL: String(new URL("p0250", LINK_REDIRECTOR_URL)),
});
