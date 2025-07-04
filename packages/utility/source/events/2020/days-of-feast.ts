import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2020,
	start: skyDate(2_020, 12, 21),
	end: skyDate(2_021, 1, 4),
	offer: [
		{
			name: "Feast Neck Tie",
			cosmetic: Cosmetic.FeastNeckTie,
			cost: { hearts: 15 },
		},
		{
			name: "Days of Feast Cape",
			cosmetic: Cosmetic.DaysOfFeastCape,
			cost: { candles: 65 },
		},
		{
			name: "Days of Feast Table",
			cosmetic: Cosmetic.DaysOfFeastTable,
			cost: { candles: 150 },
		},
		{
			name: "Days of Feast Horns",
			cosmetic: Cosmetic.DaysOfFeastHorns,
			cost: { money: 14.99 },
		},
		{
			name: "Snowflake Cape",
			cosmetic: Cosmetic.SnowflakeCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0120", LINK_REDIRECTOR_URL)),
});
