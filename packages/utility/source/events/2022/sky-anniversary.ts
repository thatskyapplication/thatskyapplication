import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyAnniversary2022,
	start: skyDate(2_022, 7, 18),
	end: skyDate(2_022, 8, 4),
	offer: [
		{
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory3,
			cost: { hearts: 3 },
		},
		{
			cosmetic: Cosmetic.HappyBirthdayMusicSheet,
			cost: { hearts: 10 },
		},
		{
			cosmetic: Cosmetic.Balloon,
			cost: { candles: 30 },
		},
		{
			cosmetic: Cosmetic.LightFence,
			cost: { candles: 20 },
		},
		{
			cosmetic: Cosmetic.ConfettiLauncher,
			cost: { hearts: 20 },
		},
	],
	patchNotesURL: String(new URL("p0180", LINK_REDIRECTOR_URL)),
});
