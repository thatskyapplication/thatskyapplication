import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyAnniversary2022,
	start: skyDate(2_022, 7, 18),
	end: skyDate(2_022, 8, 4),
	offer: [
		{
			translation: CosmeticCommon.HairAccessory,
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
	patchNotesURL: patchNotesRoute("0180"),
});
