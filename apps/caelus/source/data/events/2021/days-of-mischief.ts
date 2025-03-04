import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfMischief2021,
	start: skyDate(2_021, 10, 18),
	end: skyDate(2_021, 11, 8),
	offer: [
		{
			name: "Mischief Witch Hair",
			cosmetic: Cosmetic.MischiefWitchHair,
			cost: { candles: 66 },
		},
		{
			name: "Mischief Withered Cape",
			cosmetic: Cosmetic.MischiefWitheredCape,
			cost: { candles: 99 },
		},
		{
			name: "Mischief Spooky Dining Set",
			cosmetic: Cosmetic.MischiefSpookyDiningSet,
			cost: { hearts: 33 },
		},
		{
			name: "Mischief Witch Jumper",
			cosmetic: Cosmetic.MischiefWitchJumper,
			cost: { money: 9.99 },
		},
		{
			name: "Mischief Withered Antlers",
			cosmetic: Cosmetic.MischiefWitheredAntlers,
			cost: { money: 9.99 },
		},
		{
			name: "Mischief Spider Quiff",
			cosmetic: Cosmetic.MischiefSpiderQuiff,
			cost: { money: 4.99 },
		},
		{
			name: "Mischief Pumpkin Prop",
			cosmetic: Cosmetic.MischiefPumpkinProp,
			cost: { money: 1.99 },
		},
	],
	patchNotesURL: String(new URL("0150", LINK_REDIRECTOR_URL)),
});
