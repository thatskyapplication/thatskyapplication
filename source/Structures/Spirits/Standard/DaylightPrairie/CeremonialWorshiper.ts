/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { EMOTES_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.Teamwork;
const emoteEmoji = EMOTES_EMOJIS.Teamwork;

export default new StandardSpirit({
	name: SpiritName.CeremonialWorshiper,
	emote,
	realm: Realm.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: Emote.Teamwork, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 2, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 3, { item: "Wing buff", cost: { ascendedCandles: 1 } })
			.set(1 << 4, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 }),
	},
});
