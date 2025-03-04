import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { CDN_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfBloom2024,
	start: skyDate(2_024, 3, 25),
	end: skyDate(2_024, 4, 15),
	eventTickets: {
		amount: [
			{
				amount: 5,
				date: skyDate(2_024, 3, 25),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 3, 26),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 3, 27),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 3, 28),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 3, 29),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 3, 30),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 3, 31),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 1),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 2),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 3),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 4),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 5),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 6),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 7),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 8),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_3/day_1.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 9),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_3/day_2.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 10),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_3/day_3.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 11),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_3/day_4.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 12),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_3/day_5.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 13),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_3/day_6.webp`, CDN_URL),
				),
			},
			{
				amount: 5,
				date: skyDate(2_024, 4, 14),
				infographicURL: String(
					new URL(`events/${EventId.DaysOfBloom2024}/event_tickets/week_3/day_7.webp`, CDN_URL),
				),
			},
		],
	},
	offer: [
		{
			name: "Bloom Arum Petal Hair",
			cosmetic: Cosmetic.BloomArumPetalHair,
			cost: { hearts: 25 },
		},
		{
			name: "Bloom Spiky Sprig Hair",
			cosmetic: Cosmetic.BloomSpikySprigHair,
			cost: { eventTickets: 24 },
		},
		{
			name: "Bloom Arum Petal Cape",
			cosmetic: Cosmetic.BloomArumPetalCape,
			cost: { eventTickets: 48 },
		},
		{
			name: "Bloom Lilypad Umbrella",
			cosmetic: Cosmetic.BloomLilypadUmbrella,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0245", LINK_REDIRECTOR_URL)),
});
