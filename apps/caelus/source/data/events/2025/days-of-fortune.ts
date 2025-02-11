import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../utility/emojis.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_025, 1, 27), end = skyDate(2_025, 2, 10);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfFortune2025,
	start: skyDate(2_025, 1, 27),
	end: skyDate(2_025, 2, 10),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 1, 27),
				end: skyDate(2_025, 2, 9),
			},
		],
	},
	offer: [
		{
			name: "Dragon Dance music sheet",
			cosmetic: Cosmetic.DragonDanceMusicSheet,
			cost: { eventTickets: 8 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Red dye",
			cosmetic: Cosmetic.FortuneRedDye,
			cost: { eventTickets: 10 },
			emoji: MISCELLANEOUS_EMOJIS.DyeRed,
		},
		{
			name: "Fortune Snake Mask",
			cosmetic: Cosmetic.FortuneSnakeMask,
			cost: { eventTickets: 14 },
			emoji: MASK_EMOJIS.Mask95,
		},
		{
			name: "Fortune Snake Outfit",
			cosmetic: Cosmetic.FortuneSnakeOutfit,
			cost: { eventTickets: 36 },
			emoji: OUTFIT_EMOJIS.Outfit78,
		},
		{
			name: "Fortune Vertical Poster",
			cosmetic: Cosmetic.FortuneVerticalPoster,
			cost: { candles: 5 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp80,
		},
		{
			name: "Fortune Candle Flags",
			cosmetic: Cosmetic.FortuneCandleFlags,
			cost: { candles: 10 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp81,
		},
		{
			name: "Fortune Plant",
			cosmetic: Cosmetic.FortunePlant,
			cost: { candles: 20 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp82,
		},
		{
			name: "Fortune Hand Fan",
			cosmetic: Cosmetic.FortuneHandFan,
			cost: { money: 4.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp51,
		},
		{
			name: "Fortune Snake Coif and Cloak",
			cosmetic: [Cosmetic.FortuneSnakeCoif, Cosmetic.FortuneSnakeCloak],
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape144,
		},
	],
	patchNotesURL: String(new URL("p0280", LINK_REDIRECTOR_URL)),
});
