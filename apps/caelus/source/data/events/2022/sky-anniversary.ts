import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.SkyAnniversary2022,
	start: skyDate(2_022, 7, 18),
	end: skyDate(2_022, 8, 4),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory3,
			cost: { hearts: 3 },
		},
		{
			name: "Happy Birthday Music Sheet",
			cosmetic: Cosmetic.HappyBirthdayMusicSheet,
			cost: { hearts: 10 },
		},
		{
			name: "Balloon",
			cosmetic: Cosmetic.Balloon,
			cost: { candles: 30 },
		},
		{
			name: "Light fence",
			cosmetic: Cosmetic.LightFence,
			cost: { candles: 20 },
		},
		{
			name: "Confetti launcher",
			cosmetic: Cosmetic.ConfettiLauncher,
			cost: { hearts: 20 },
		},
	],
	patchNotesURL: String(new URL("p0180", LINK_REDIRECTOR_URL)),
});
