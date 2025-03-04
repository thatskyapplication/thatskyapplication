import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2022,
	start: skyDate(2_022, 12, 19),
	end: skyDate(2_023, 1, 9),
	offer: [
		{
			name: "Feast Goggles",
			cosmetic: Cosmetic.FeastGoggles,
			cost: { candles: 50 },
		},
		{
			name: "Snowkid Prop",
			cosmetic: Cosmetic.SnowkidProp,
			cost: { candles: 120 },
		},
		{
			name: "Tournament Skyball Set",
			cosmetic: Cosmetic.TournamentSkyballSet,
			cost: { money: 14.99 },
		},
		{
			name: "Cosy Hermit Cape",
			cosmetic: Cosmetic.CosyHermitCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0195", LINK_REDIRECTOR_URL)),
});
