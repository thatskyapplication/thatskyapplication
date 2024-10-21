import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HELD_PROPS_EMOJIS, MASK_EMOJIS, OUTFIT_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfFortune2023,
	start: skyDate(2_023, 1, 20),
	end: skyDate(2_023, 2, 3),
	offer: [
		{
			name: "Days of Fortune Rabbit Mask",
			cosmetic: Cosmetic.DaysOfFortuneRabbitMask,
			cost: { candles: 62 },
			emoji: MASK_EMOJIS.Mask75,
		},
		{
			name: "Days of Fortune Muralist's Smock",
			cosmetic: Cosmetic.DaysOfFortuneMuralistsSmock,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit43,
		},
		{
			name: "Days of Fortune Enchanted Umbrella",
			cosmetic: Cosmetic.DaysOfFortuneEnchantedUmbrella,
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp32,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1096",
});
