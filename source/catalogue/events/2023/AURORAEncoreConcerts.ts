import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { SHOE_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji } from "../../../Utility/spirits.js";

const emote = SpiritEmote.CureForMeDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new Event({
	nameUnique: EventNameUnique.AURORAEncoreConcerts2023,
	start: skyDate(2_023, 8, 23),
	end: skyDate(2_023, 9, 3),
	offer: [
		{ name: `${emote} 1`, bit: 1 << 0, cost: { eventCurrency: 12 }, emoji: emoteEmoji },
		{ name: `${emote} 2`, bit: 1 << 1, cost: { eventCurrency: 33 }, emoji: emoteEmoji },
		{ name: "Musical Voyage Sneakers", bit: 1 << 2, cost: { money: 6.99 }, emoji: SHOE_EMOJIS.Shoe05 },
	],
});
