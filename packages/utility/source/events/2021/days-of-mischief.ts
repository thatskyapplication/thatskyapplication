import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMischief2021,
	start: skyDate(2_021, 10, 18),
	end: skyDate(2_021, 11, 8),
	offer: [
		{
			cosmetic: Cosmetic.MischiefWitchHair,
			cost: { candles: 66 },
		},
		{
			cosmetic: Cosmetic.MischiefWitheredCape,
			cost: { candles: 99 },
		},
		{
			cosmetic: Cosmetic.MischiefSpookyDiningSet,
			cost: { hearts: 33 },
		},
		{
			cosmetic: Cosmetic.MischiefWitchJumper,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.MischiefWitheredAntlers,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.MischiefSpiderQuiff,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.MischiefPumpkinProp,
			cost: { money: 1.99 },
		},
	],
	patchNotesURL: String(new URL("0150", LINK_REDIRECTOR_URL)),
});
