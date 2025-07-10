import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFortune2023,
	start: skyDate(2_023, 1, 20),
	end: skyDate(2_023, 2, 3),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfFortuneRabbitMask,
			cost: { candles: 62 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneMuralistsSmock,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortuneEnchantedUmbrella,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0200", LINK_REDIRECTOR_URL)),
});
