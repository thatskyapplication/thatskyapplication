import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { SHOE_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji } from "../../../Utility/spirits.js";

const emote = SpiritEmote.CureForMeDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new Event({
	nameUnique: EventNameUnique.AURORAEncoreConcerts2023,
	start: skyDate(2_023, 8, 23),
	end: skyDate(2_023, 9, 3),
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: `${emote} 1`, cost: { eventCurrency: 12 }, emoji: emoteEmoji })
		.set(1 << 1, { name: `${emote} 2`, cost: { eventCurrency: 33 }, emoji: emoteEmoji })
		.set(1 << 2, { name: "Musical Voyage Sneakers", cost: { money: 6.99 }, emoji: SHOE_EMOJIS.Shoe05 }),
});
