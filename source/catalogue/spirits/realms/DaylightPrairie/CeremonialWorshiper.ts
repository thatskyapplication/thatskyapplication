import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Teamwork;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.CeremonialWorshiper,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: emote, emoji: emoteEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 2, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 3, { name: "Wing buff", cost: { ascendedCandles: 1 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 }),
	},
});
